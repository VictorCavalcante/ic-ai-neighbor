'use strict';
const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');
const Promise = require("bluebird");

const csvFilePath = 'num_car_evaluation.csv'; // Data
const names = ['buying', 'maint', 'doors', 'persons', 'lug_boot', 'safety', 'type']; // For header
let knnClassifier;

/*
   buying       low, med, high, vhigh
   maint        low, med, high, vhigh
   doors        2, 3, 4, 5more
   persons      2, 4, more
   lug_boot     small, med, big
   safety       low, med, high
----------------------------------------
   buying       0, 5, 10, 15
   maint        0, 5, 10, 15
   doors        2, 3, 4, 5
   persons      2, 4, 5
   lug_boot     0, 5, 10
   safety       0, 5, 10
*/

export const testClassifierAccuracy = () => {
    return new Promise(function(resolve, reject) {
        // Importing Dataset
        let completeDataset = [];
        let $importDataset = csv({ noheader: true, headers: names })
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => { completeDataset.push(jsonObj); }); // Push each object to data Array

        $importDataset
            .on('done', (error) => {
                // Prepare datasets: X_DATA  and  Y_DATA
                let partitionedData = getFeaturesAndLabels(completeDataset, 6); //todo replace '6'

                // Split up datasets into "training_data" & "testing_data"
                let trainSize = 0.7 * completeDataset.length; // 70% of the dataset
                let datasets = splitDatasets(partitionedData.X_DATA, partitionedData.Y_DATA, trainSize);

                // Create decision tree classifier & train it
                knnClassifier = new KNN(datasets.training_set.X, datasets.training_set.Y, {k: 7});

                // Use tree to classify testing data
                const predictionResults = knnClassifier.predict(datasets.test_set.X);

                // Compare test_set with predictions & calculate success rate
                resolve(testDataset(datasets.test_set, predictionResults));
            });

        $importDataset
            .on("error", function(e) {
                // If it failed connecting, mark it
                // as rejected.
                reject(e); //  e is preferably an `Error`
            });
    });
};

export const predictWithClassifier = (paramList) => {
    return new Promise(function(resolve, reject) {
        // Importing Dataset
        let completeDataset = [];
        let $importDataset = csv({ noheader: true, headers: names })
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => { completeDataset.push(jsonObj); }); // Push each object to data Array

        let parsedList = paramList.map(val => parseFloat(val));

        $importDataset
            .on('done', (error) => {
                // Prepare datasets: X_DATA  and  Y_DATA  and typesList
                let partitionedData = getFeaturesAndLabels(completeDataset, 6); //todo replace '6'

                // Create decision tree classifier & train it
                knnClassifier = new KNN(partitionedData.X_DATA, partitionedData.Y_DATA, {k: 7});

                // Predict custom entry
                const predictionResult = knnClassifier.predict(parsedList);

                console.log(`With ${parsedList} -- type =  ${predictionResult}`);
                resolve({ result: predictionResult, types: partitionedData.typesList });
            });

        $importDataset
            .on("error", function(e) {
                // If it failed connecting, mark it
                // as rejected.
                reject(e); //  e is preferably an `Error`
            });
    });
};

function getFeaturesAndLabels(dataset, numOfAttrs) {
    let typesList, typesSet = new Set();
    let X_DATA = [], Y_DATA = [];

    // Shuffling dataset
    dataset = shuffleArray(dataset);

    // Gathering unique classes & purging as an array
    dataset.forEach(row => typesSet.add(row.type));
    typesList = [ ...typesSet ];
    console.log(`0 - ${typesList[0]} | 1 - ${typesList[1]} | 2 - ${typesList[2]} | 3 - ${typesList[3]}`);

    // Turning string values to floats & converting headers to identifiers
    dataset.forEach(row => {
        let rowArray, typeNumber;

        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, numOfAttrs);
        typeNumber = typesList.indexOf(row.type);
        X_DATA.push(rowArray);
        Y_DATA.push(typeNumber);
    });

    return { X_DATA, Y_DATA, typesList }
}

function splitDatasets(X_DATA, Y_DATA, trainingSetSize) {
    return {
        training_set: {
            X: X_DATA.slice(0, trainingSetSize),
            Y: Y_DATA.slice(0, trainingSetSize)
        },
        test_set: {
            X: X_DATA.slice(trainingSetSize),
            Y: Y_DATA.slice(trainingSetSize)
        }
    };
}

function testDataset(test_set, result) {
    const testSetSize = test_set.X.length;
    const wrongPredictions = error(result, test_set.Y);
    const errorRate = (wrongPredictions*100) / testSetSize;
    const successRate = Math.abs(Number((errorRate-100).toFixed(2)));

    console.log(`Test Set Size = ${testSetSize}`);
    console.log(`Wrong predictions = ${wrongPredictions}`);
    console.log(`${successRate}% of accuracy`);

    return {testSetSize, wrongPredictions, successRate};
}

function error(predicted, expected) {
    let misclassifications = 0;
    for (let index = 0; index < predicted.length; index++) {
        if (predicted[index] !== expected[index]) {
            misclassifications++;
        }
    }
    return misclassifications;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}