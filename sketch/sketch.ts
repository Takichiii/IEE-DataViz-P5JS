let table: p5.Table;
let author = "Alex T. Pang";
let authorPapers: Paper[];
var allAuthors;
var numberOfPertinentPublications;

function preload() {
    table = loadTable('data/IEEE VIS papers 1990-2018 - Main dataset.csv', 'csv', 'header');
}

function setup() {
    allAuthors = getUniqueAuthors();
    authorPapers = getAuthorPapers(author, table);
    numberOfPertinentPublications = getnumberOfPertinentPapersOfAuthor (authorPapers, "flow");
    console.log("Distinct papers count for Alex: "+authorPapers.length);
    console.log("Distinct Authors count: "+allAuthors.length);
    console.log("number of pertinent papers "+numberOfPertinentPublications);
}

function getnumberOfPertinentPapersOfAuthor(papers : Paper[], keyword : string) {
    let count = 0;
    for (let index = 0; index < papers.length; index++) {
        if (papers[index].title.indexOf(keyword)>=0){ //TODO should be papers[index].abstract
            count +=1;
        }
    }
    return count;
}

//trouver la liste des auteurs
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
//trouver la liste des publications d'un auteur
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



