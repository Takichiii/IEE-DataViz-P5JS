// For displaying a radar chart when hovering a name
// Unimplemented, so I commented it out to avoid issues

// let popupWidth: number = 800;
// let popupHeight: number = 400;

// let graphicLabels: string[] = ["Publication / years of work", "Related fields of expertises",
//     "Related publications", "Years of work", "Total publications"];
// let authorData: number[] = [100, 60, 10, 1, 30];
// let authorsData: number[] = [54, 74, 13, 4, 11];

// function drawRadar(authorDataPoints: number[], rangeMin: number, rangeMax: number) {
//     let angle = TWO_PI / authorDataPoints.length;
//     beginShape();
//     let i = 0;
//     for (let a = 0; a < TWO_PI; a += angle) {
//         let r = map(authorDataPoints[i], 0, 100, rangeMin, rangeMax);
//         let sx = cos(a - .315) * r;
//         let sy = sin(a - .315) * r;
//         vertex(sx, sy);
//         i++;
//     }
//     endShape(CLOSE);
// }

// function drawRadarLabels(labels: string[], rangeMin: number, rangeMax: number) {
//     let angle = TWO_PI / labels.length;
//     beginShape();
//     let i = 0;
//     for (let a = 0; a < TWO_PI; a += angle) {
//         let r = map(101, 0, 100, rangeMin, rangeMax);
//         let sx = cos(a - .315) * r;
//         let sy = sin(a - .315) * r;
//         if (cos(a) < 0) {
//             sx -= labels[i].length * 4;
//         }
//         text(labels[i], sx, sy);
//         i++;
//     }
//     endShape(CLOSE);
// }

// function drawRadarAxes(axesCount: number, rangeMin: number, rangeMax: number) {
//     let angle = TWO_PI / axesCount;
//     let i = 0;
//     for (let a = 0; a < TWO_PI; a += angle) {
//         let r = map(90, 0, 100, rangeMin, rangeMax);
//         let sx = cos(a - .315) * r;
//         let sy = sin(a - .315) * r;
//         line(0, 0, sx, sy);
//         i++;
//     }
// }

// function drawLabels() {
//     noStroke();
//     fill(0);
//     translate(popupWidth / 2, popupHeight / 2);
//     drawRadarLabels(graphicLabels, 0, popupHeight / 2 - 20);
// }

// function drawSelectedAuthorStats(authorData: number[]) {
//     noStroke();
//     fill(50, 50, 255);
//     drawRadar(authorData, 0, popupHeight / 2 - 20);
// }

// function drawAverageAuthorsStats(authorsData: number[]) {
//     stroke(255, 150, 150);
//     noFill();
//     drawRadar(authorsData, 0, popupHeight / 2 - 20);
// }

// function drawBackgroundAndAxes() {
//     stroke(0);
//     noFill();
//     for (let i = 4; i < 10; i += 5) {
//         drawRadar(Array(graphicLabels.length).fill(10 * i), 0, popupHeight / 2 - 20);
//     }
//     drawRadarAxes(graphicLabels.length, 0, popupHeight / 2 - 20);
// }

// function draw() {
//     background(255);
//     drawLabels();
//     drawSelectedAuthorStats(authorData);
//     drawAverageAuthorsStats(authorsData);
//     drawBackgroundAndAxes();
// }