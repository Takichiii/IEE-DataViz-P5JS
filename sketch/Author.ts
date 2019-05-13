class Author {
    name: string;
    citations: number;
    papers: Paper[];
    pertinentPapers: Paper[];
    score : number;

    constructor(name: string) {
        this.name = name;
        this.papers = new Array<Paper>();
    }

}