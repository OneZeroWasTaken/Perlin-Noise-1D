
var outputLength = 100;
var gridSize = 100;
const variation = 10;

var gradientVectors = [];
var distanceVectors = [];
var gridCoordinates = [];
var output = [];
var vectorRange = [-Math.SQRT2, Math.SQRT2];

var length = outputLength / (gridSize - 1);

function setup() {
    createCanvas(600, 400);
    background(50);

    for (var i = 0; i < outputLength; i++) {   // Gradient Vectors
        gradientVectors[i] = rand(vectorRange[0], vectorRange[1]);
    }

    for (var i = 0; i < gridSize; i++) {   // Grid Coordinates
        gridCoordinates[i] = length * i;
    }

    calcDistanceVectors();
}


function calcDistanceVectors() {
    for (var i = 0; i < outputLength; i++) {
        // Finds the gridCoordinate above the current outputCoordinate
        for (var j = 0; j < gridCoordinates.length; j++) {
            if (i < gridCoordinates[j]) {
                break;
            }
        }

        var x1 = -(i % length / length);
        var x2 = 1 + x1;

        distanceVectors[i] = x1 + x2;
        
        output[i] = calcInterpolation(x1, x2, j);
    }
    drawOutput();
}


function calcInterpolation(x1, x2, j) {
    return fade(x1 + x2 + gradientVectors[j] + gradientVectors[j - 1] + gradientVectors[j - 2] + gradientVectors[j + 1] + gradientVectors[j - 3] + gradientVectors[j + 2]);
}

function fade(value) {
    return value//6 * Math.pow(value, 5) - 15 * Math.pow(value, 4) + 10 * Math.pow(value, 3);
}


function drawOutput() {
    fill(255, 255, 255);
    for (var i = 0; i < output.length; i++) {
        x = i * (600 / outputLength);
        y = output[i] * variation;

        ellipse(x, y + 200, 600 / outputLength, 600 / outputLength);
    }
}

function rand(min, max) {
	return Math.random() * (max - min) + min;
}
