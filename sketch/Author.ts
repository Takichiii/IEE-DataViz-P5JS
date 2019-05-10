class Author {
    name: string;
    citations: number;
    papers: Paper[];
    pertinentPapers: Paper[];
    score : number;

    constructor(name: string, citations: number) {
        this.name = name;
        this.citations = citations;
        this.papers = new Array<Paper>();
    }

}