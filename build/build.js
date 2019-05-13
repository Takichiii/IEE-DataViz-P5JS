class Author {
    constructor(name) {
        this.name = name;
        this.papers = new Array();
    }
}
class Paper {
    constructor(title, abstract, keywords, year, authors, affiliation, citations) {
        this.title = title;
        this.abstract = abstract;
        this.keywords = keywords;
        this.year = year;
        this.authors = authors;
        this.affiliation = affiliation;
        this.citations = citations;
        if (this.citations == null || isNaN(this.citations))
            this.citations = 0;
    }
}
let table;
let author = "Alex T. Pang";
let authorPapers;
var allAuthors;
var authorPertinentPapers;
var keywords = ['flow', 'systems', 'data'];
let allAuthorsPertinentPapers;
function preload() {
    table = loadTable("data/IEEE VIS papers 1990-2018 - Main dataset.csv", 'csv', 'header');
}
function setup() {
<<<<<<< HEAD
=======
    barCharts(keywords, 50);
>>>>>>> 7fd6e8415c7fa76133269219470a02009b1d898d
}
function barCharts(keywords, N) {
    let allAuthors = getUniqueAuthors();
    var data = getTopAuthorsScores(allAuthors, N, keywords);
    var width = 800, height = 1500, margin = 60, w = width - 2 * margin, h = height - 2 * margin;
    var barWidth = (h / data.length) * 0.3;
    var barMargin = (h / data.length) * 0.2;
    createCanvas(width, height);
    textSize(10);
    push();
    translate(margin, margin);
    for (var i = 0; i < data.length; i++) {
        push();
        fill(0, 80, 0, (data[i][2] * 255) / data[0][2]);
        translate(0, i * (barWidth + barMargin));
        rect(140, 0, data[i][1], barWidth);
        fill('#000');
        text(data[i][0], 5, barWidth / 2 + 5);
        text(data[i][1], 200, barWidth / 2 + 5);
        pop();
    }
    pop();
}
function getTopAuthorsScores(allAuthors, N, keywords) {
    let top = [];
    for (let index = 0; index < allAuthors.length; index++) {
        let author = allAuthors[index];
        let papers = getAuthorPapers(author, table);
        let pertinentPapers = getPertinentPapersOfAuthor(papers, keywords);
        top.push([author, pertinentPapers.length, getAuthorScore(pertinentPapers)]);
    }
    top.sort((a, b) => b[1] - a[1]);
    return top.slice(0, N);
}
function getAuthorScore(pertinentPapers) {
    if (pertinentPapers.length == 0)
        return 0;
    let experienceYears = pertinentPapers[pertinentPapers.length - 1].year - pertinentPapers[0].year;
    let inActivityYears = 2019 - pertinentPapers[pertinentPapers.length - 1].year;
    return experienceYears - inActivityYears;
}
function getPertinentPapersOfAuthor(authorPapers, keywords) {
    let pertinentPapers = [];
    for (let index = 0; index < authorPapers.length; index++) {
        for (let i = 0; i < keywords.length; i++) {
            if (authorPapers[index].keywords.indexOf(keywords[i]) >= 0) {
                pertinentPapers.push(authorPapers[index]);
            }
            else if (authorPapers[index].title.indexOf(keywords[i]) >= 0) {
                pertinentPapers.push(authorPapers[index]);
            }
            else if (authorPapers[index].abstract.indexOf(keywords[i]) >= 0) {
                pertinentPapers.push(authorPapers[index]);
            }
        }
    }
    return pertinentPapers;
}
function getUniqueAuthors() {
    let authorsRows = table.getColumn("AuthorNames-Deduped");
    allAuthors = Array();
    for (let index = 0; index < authorsRows.length; index++) {
        let el = authorsRows[index];
        let elSplit = split(el, ";");
        for (let a = 0; a < elSplit.length; a++) {
            if (allAuthors.indexOf(elSplit[a]) < 0)
                allAuthors.push(elSplit[a]);
        }
    }
    return allAuthors;
}
function getAuthorPapers(author, table) {
    var papers = Array();
    for (let i = 0; i < table.getRowCount(); i++) {
        const row = table.getRow(i);
        const authorsStr = row.get('AuthorNames-Deduped').toString();
        if (authorsStr.indexOf(author) >= 0) {
            var authors = Array();
            authorsStr.split(';').forEach(author => {
                authors.push(author);
            });
            var title = row.get('Title').toString();
            var keywords = row.get('AuthorKeywords').toString();
            var abstract = row.get('Abstract').toString();
            var year = parseInt(row.get('Year').toString());
            var authors = authors;
            var affiliation = row.get('AuthorAffiliation').toString();
            var citations = parseInt(row.get('AminerCitationCount_02-2019').toString());
            papers.push(new Paper(title, abstract, keywords, year, authors, affiliation, citations));
        }
    }
    return papers.sort((a, b) => a.year - b.year);
}
//# sourceMappingURL=build.js.map