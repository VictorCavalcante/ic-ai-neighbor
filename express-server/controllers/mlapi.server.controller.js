import mongoose from 'mongoose';

//import models
import Variable from '../models/variable.server.model';
import * as MlTrainer from './ml-trainer.controller.js';

export const testAccuracy = (req,res) => {

    MlTrainer.testClassifierAccuracy()
        .then(function(result) {
            return res.status(200).send(
                JSON.stringify({success:true, response: result})
            );
        });

};

export const predictType = (req,res) => {
    let predValues = [];

    console.log(req.query);

    // todo get this correctly
    predValues.push(req.query.buying);
    predValues.push(req.query.maint);
    predValues.push(req.query.doors);
    predValues.push(req.query.persons);
    predValues.push(req.query.lug_boot);
    predValues.push(req.query.safety);

    console.log(predValues);

    MlTrainer.predictWithClassifier(predValues)
        .then(function(result) {
            return res.status(200).send(
                JSON.stringify({success:true, response: result})
            );
        });
};


