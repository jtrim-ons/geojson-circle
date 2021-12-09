import * as turf from '@turf/turf'

let lng1 = +process.argv[2];
let lat1 = +process.argv[3];
let lng2 = +process.argv[4];
let lat2 = +process.argv[5];

let centrePoint = turf.point([lng1, lat1]);
let edgePoint = turf.point([lng2, lat2]);

let options = {units: 'miles'};
let dist = turf.distance(centrePoint, edgePoint, options);

let edgePoints = [];
for (let i=0; i<=360; i++) {
    let bearing = i % 360 - 180;
    let point = turf.destination(centrePoint, dist, bearing, options).geometry.coordinates;
    edgePoints.push(point);
}

var circle = turf.polygon([edgePoints]);
console.log(JSON.stringify(circle));
