'use strict';
const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');

const csvFilePath = 'num_car_evaluation.csv'; // Data
const names = ['buying', 'maint', 'doors', 'persons', 'lug_boot', 'safety', 'type']; // For header
let knn;

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

export const trainAndExecute = (paramList) => {
    let rawDataset = [];
    let $getData = csv({ noheader: true, headers: names })
        .fromFile(csvFilePath)
        .on('json', (jsonObj) => { rawDataset.push(jsonObj); }); // Push each object to data Array

    $getData.on('done', (error) => {
        // Prepare datasets (training_set & test_set)
        let trainSize = 0.7 * rawDataset.length; // 70% of the dataset
        let datasets = divideDatasets(rawDataset, trainSize, 6);

        // Train & Predict
        const dataResult = trainAndPredict(datasets);

        testDataset(datasets, dataResult);
        return predict(paramList);
    });
};

function predict(paramList) {
    let parsedList =  paramList.map(val => parseFloat(val));
    console.log(`With ${parsedList} -- type =  ${knn.predict(parsedList)}`);
}

function divideDatasets(dataset, trainingSetSize, numOfAttrs) {
    let typesList, typesSet = new Set();
    let X_DATA = [], Y_DATA = [];

    // Shuffling dataset
    dataset = shuffleArray(dataset);

    // Gathering unique classes & purging as an array
    dataset.forEach(row => typesSet.add(row.type));
    typesList = [ ...typesSet ];
    console.log(`0 - ${typesList[0]} | 1 - ${typesList[1]} | 2 - ${typesList[2]} | 3 - ${typesList[3]} | `);

    // Turning string values to floats & converting headers to identifiers
    dataset.forEach(row => {
        let rowArray, typeNumber;

        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, numOfAttrs);
        typeNumber = typesList.indexOf(row.type);
        X_DATA.push(rowArray);
        Y_DATA.push(typeNumber);
    });

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

function trainAndPredict(datasets) {
    knn = new KNN(datasets.training_set.X, datasets.training_set.Y, {k: 7});
    return knn.predict(datasets.test_set.X);
}

function testDataset(datasets, result) {
    const testSetLength = datasets.test_set.X.length;
    const predictionError = error(result, datasets.test_set.Y);
    const outputMsg = `>>> Test Set Size = ${testSetLength}\n>>> Number of Misclassifications = ${predictionError}`;
    console.log(outputMsg);
    return outputMsg
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