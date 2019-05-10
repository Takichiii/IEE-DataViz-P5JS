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

function setup() {
    allAuthors = getUniqueAuthors();
    authorPapers = getAuthorPapers(author, table);
    authorPertinentPapers = getPertinentPapersOfAuthor (authorPapers, keywords);
    console.log("number of pertinent papers "+authorPertinentPapers.length);
    console.log("alex's score "+getAuthorScore(authorPertinentPapers));
}

function getAuthorOpacity(){

}

//TODO the code only deal with top 100 pertinent authors
function getTopAuthorsScores(allAuthors : any[]){
    let scores = [];
    for (let index = 0; index < allAuthors.length; index++) {
        let pertinentPapers = getPertinentPapersOfAuthor(allAuthors[index], keywords);
        scores.push(getAuthorScore(pertinentPapers));
    }
    return scores.sort((a, b) => a - b);
    return scores;
}

//papers are already sorted
function getAuthorScore(pertinentPapers : Paper[]){
    let experienceYears = pertinentPapers[pertinentPapers.length-1].year - pertinentPapers[0].year ;
    let inActivityYears = 2019 - pertinentPapers[pertinentPapers.length-1].year;
    let score = experienceYears - inActivityYears;
    return score;
}

//count number of papers of an author which contain a keyword in its abstract
function getPertinentPapersOfAuthor(authorPapers : Paper[], keywords : string[]) {
    let pertinentPapers = [];
    for (let index = 0; index < authorPapers.length; index++) {
        for(let i =0;i < keywords.length; i++) {
            if (authorPapers[index].title.indexOf(keywords[i]) >= 0) { //TODO should be papers[index].abstract
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
            var abstract = row.get('Abstract').toString(); //TODO DONNE NULL, IL FAUT BIEN LES RECUPERER
            var year = parseInt(row.get('Year').toString());
            var authors = authors;
            var affiliation = row.get('AuthorAffiliation').toString();
            var citations = parseInt(row.get('AminerCitationCount_02-2019').toString());
            papers.push(new Paper(title, abstract, year, authors, affiliation, citations));
        }
    }
    return papers.sort((a, b) => a.year - b.year);
}



