import * as ClassifierTrainer from './classifier.controller.js';

export const testAccuracy = (req,res) => {

    ClassifierTrainer.testClassifierAccuracy()
        .then(function(result) {
            return res.status(200).send(
                JSON.stringify({success:true, response: result})
            );
        });

};

export const predictType = (req,res) => {
    let predValues = [];
    predValues.push(req.query.buying);
    predValues.push(req.query.maint);
    predValues.push(req.query.doors);
    predValues.push(req.query.persons);
    predValues.push(req.query.lug_boot);
    predValues.push(req.query.safety);

    console.log(predValues);

    ClassifierTrainer.predictWithClassifier(predValues)
        .then(function(result) {
            return res.status(200).send(
                JSON.stringify({success:true, response: result})
            );
        });
};


