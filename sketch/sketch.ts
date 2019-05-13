let table: p5.Table;
let author = "Alex T. Pang";
let authorPapers: Paper[];
var allAuthors;
var authorPertinentPapers;
var keywords = ['flow', 'systems', 'data'];
let allAuthorsPertinentPapers : any[];

function preload() {
    table = loadTable('data/IEEE VIS papers 1990-2018 - Main dataset.csv', 'csv', 'header');
}
function setup(){
    const input = document.querySelector('input[type="search"]');
    input.addEventListener('search', () => {
        keywords = split(input.value, " ");
        barCharts(keywords, 50);
    })
}

function barCharts(keywords : string[], N : number) {
    let allAuthors = getUniqueAuthors();
    var data = getTopAuthorsScores(allAuthors, N, keywords);

    var width = 800, // canvas width and height
        height = 1500,
        margin = 60,
        w = width - 2 * margin, // chart area width and height
        //h = height - 2 * margin;
        h = height - 2 * margin;

    var barWidth =  (h / data.length) * 0.3; // width of bar
    var barMargin = (h / data.length) * 0.2; // margin between two bars

    createCanvas(width, height);

    textSize(10);

    push();
    translate(margin, margin); // ignore margin area

    for(var i=0; i<data.length; i++) {
        push();
        fill(0,80, 0,(data[i][2]*255)/data[0][2]);
        //noStroke();
        translate(0, i* (barWidth + barMargin)); // jump to the top right corner of the bar
        rect(140, 0, data[i][1], barWidth); // draw rect

        fill('#000');
        text(data[i][0], 5, barWidth/2 + 5); // write data
        text(data[i][1], 200, barWidth/2 + 5); // write data

        pop();
    }

    pop();
}

//top N pertinent authors
function getTopAuthorsScores(allAuthors : any[],N : number, keywords : string[]){
    let top = [];
    for (let index = 0; index < allAuthors.length; index++) {
        let author = allAuthors[index];
        let papers = getAuthorPapers(author, table);
        let pertinentPapers = getPertinentPapersOfAuthor(papers, keywords);
        top.push([author, pertinentPapers.length, getAuthorScore(pertinentPapers)]);
    }
    top.sort((a, b) => b[1] - a[1]);
    return top.slice(0,N);
}

//papers are already sorted
function getAuthorScore(pertinentPapers : Paper[]){
    if (pertinentPapers.length == 0)
        return 0;
    let experienceYears = pertinentPapers[pertinentPapers.length-1].year - pertinentPapers[0].year ;
    let inActivityYears = 2019 - pertinentPapers[pertinentPapers.length-1].year;
    return experienceYears - inActivityYears;
}

//count number of papers of an author which contain a keyword in its abstract
function getPertinentPapersOfAuthor(authorPapers : Paper[], keywords : string[]) {
    let pertinentPapers = [];
    for (let index = 0; index < authorPapers.length; index++) {
        for(let i =0;i < keywords.length; i++) {
            if (authorPapers[index].keywords.indexOf(keywords[i]) >= 0) { //TODO should be papers[index].abstract
                pertinentPapers.push(authorPapers[index]);
            }
            else if (authorPapers[index].title.indexOf(keywords[i]) >= 0) { //TODO should be papers[index].abstract
                pertinentPapers.push(authorPapers[index]);
            }
            else if (authorPapers[index].abstract.indexOf(keywords[i]) >= 0) { //TODO should be papers[index].abstract
                pertinentPapers.push(authorPapers[index]);
            }
        }
    }
    return pertinentPapers;
}

function getUniqueAuthors(){
    let authorsRows =  table.getColumn("AuthorNames-Deduped");
    allAuthors = Array<any>();
    for (let index = 0; index < authorsRows.length; index++) {
        let el = authorsRows[index];
        let elSplit = split(el,";");
        for(let a = 0 ; a < elSplit.length; a++ ){
            if (allAuthors.indexOf(elSplit[a]) <0) allAuthors.push(elSplit[a]);
        }
    }

    return allAuthors;
}

function getAuthorPapers(author: string, table: p5.Table): Paper[] {
    var papers = Array<Paper>();
    for (let i = 0; i < table.getRowCount(); i++) {
        const row = table.getRow(i);
        const authorsStr = row.get('AuthorNames-Deduped').toString();
        if (authorsStr.indexOf(author) >= 0) {
            var authors = Array<string>();
            authorsStr.split(';').forEach(author => {
                authors.push(author);
            });
            var title = row.get('Title').toString();
            var keywords = row.get('AuthorKeywords').toString();
            var abstract = row.get('Abstract').toString(); //TODO DONNE NULL, IL FAUT BIEN LES RECUPERER
            var year = parseInt(row.get('Year').toString());
            var authors = authors;
            var affiliation = row.get('AuthorAffiliation').toString();
            var citations = parseInt(row.get('AminerCitationCount_02-2019').toString());
            papers.push(new Paper(title, abstract, keywords, year, authors, affiliation, citations));
        }
    }
    return papers.sort((a, b) => a.year - b.year);
}

