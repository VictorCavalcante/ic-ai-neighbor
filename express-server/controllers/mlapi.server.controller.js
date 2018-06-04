import mongoose from 'mongoose';

//import models
import Variable from '../models/variable.server.model';
import * as MlTrainer from './ml-trainer.controller.js';

export const trainDataset = (req,res) => {
    console.log(req.query);

    // let message = MlTrainer.trainAndExecute();
    // console.log(message);

    return res.status(200).send(JSON.stringify({success:true, message:'yeeeha'}));
};


