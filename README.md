# Data Viz Project 

## Demo

Open `index.html`

##  Description
Supporting Peer-Review (module : Graphisme & Visualisation)

#### Author
SBAYTTI Jihane
NGUYEN Pascal

#### Technologies
`Typescript`
`p5.js`
`HTML`
`CSS`

#### Dataset
IEE Vis Papers : 
https://docs.google.com/spreadsheets/d/1xgoOPu28dQSSGPIp_HHQs0uvvcyLNdkMF9XtRajhhxU/edit#gid=1463660718


#### Subject

Every paper in the dataset (of type "J" and "C") has undergone a process called peer-review (read the following wikipedia article for more details). This means that in order to get accepted at the IEEE VIS conference, the paper has been assigned to four reviewers all of which read the paper, gave comments, and gave it an accept or reject recommendation. The process of peer-review, however, is not without problems (see this Nature article or this JRSM paper). One of the challenges with peer-review is finding the right experts for a paper with a given topic. These experts have to have two main properties:

* they need to be (very) knowledgeable about the topic of the paper. Knowledge about a topic, can, for example be established by looking at the past work of a reviewer -- their past papers and the topics of these papers. A knowledgeable reviewer is also typically one who has been active in the community by publishing papers for a few years (although it does sometimes happen that a PhD student with only 1-2 published papers can become a reviewer if they are sufficiently specialized).
* they are not allowed to be in conflict with any of the authors of the paper. A conflict arises if a reviewer has co-authored a publications (with any of the authors of the paper subjected to peer review) within the last five years (there are also other sources of conflict such as joint grants, friendships, or supervisor-student relationships - that we will not consider here). 

Our task is to build a system that would help someone find a good peer-reviewer for a given paper. This project can be tackled as follows:

* Build an interface that allows finding researchers with expertise in a given topic:
    * allows entering or selecting a few starting keywords (or if you'd like to do something more sophisticated, the abstract of a paper)
    * from those keywords find authors who have written papers with similar key terms
    * build a graphical representation of authors you found and their level of expertise in the topics entered. You need to find a metric that calculates level of expertise - or find a way to visualize several metrics. For example, the number of papers published on a topic can establish expertise but also the author order - that is, the first author is usually the most knowledgeable about a topic. The last author is usually an advisor and is also pretty knowledgeable (but not as knowledgeable as the first author) and the people in the middle usually helped out - the order of expertise should give the first author the highest score, the last the second highest and the middle people a bit of a lower score (feel free to come up with something more sophisticated). An important part of the score should also how long it has been since someone published on a given topic. You'd like reviewers who have worked on a topic within the last few years rather than someone who hasn't published on a paper for a number of years. 
* it would also be nice to see the relationships between the topics entered - has someone published at the intersection of key terms before or just papers about parts of the keywords?
* To improve the project:
    add to the interface the option to add the authors of the paper you are searching reviewers for
    visually highlight conflicts of interest among the suggested peer reviewers (there was a joint publication within the past three years)
    add a visualization of the co-authorship connections between the suggested reviewers 
    
## Getting Started

### Installing

```
npm install
```

### Usage

```
npm start
```
A local version will now be running on [localhost:3000](http://localhost:3000)
