class Paper {
    title: string;
    abstract: string;
    year: number;
    authors: string[];
    affiliation: string;
    citations: number;
    minCitations: number;
    maxCitations: number;

    x: number;
    y: number;

    constructor(
        title: string,
        abstract: string,
        year: number,
        authors: string[],
        affiliation: string,
        citations: number) {

        this.title = title;
        this.abstract = abstract;
        this.year = year;
        this.authors = authors;
        this.affiliation = affiliation;
        this.citations = citations;
        if (this.citations == null || isNaN(this.citations))
            this.citations = 0;
    }




}