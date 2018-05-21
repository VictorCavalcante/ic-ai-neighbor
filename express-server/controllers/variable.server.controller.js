import mongoose from 'mongoose';

//import models
import Variable from '../models/variable.server.model';

export const getVariables = (req,res) => {
  Variable.find().exec((err,variables) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }

    return res.json({'success':true,'message':'Variables fetched successfully',variables});
  });
};

export const addVariable = (req,res) => {
  console.log(req.body);
  const newVariable = new Variable(req.body);
  newVariable.save((err,variable) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }

    return res.json({'success':true,'message':'Variable added successfully',variable});
  })
};

export const updateVariable = (req,res) => {
  Variable.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,variable) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(variable);
    return res.json({'success':true,'message':'Variable Updated Successfully',variable});
  })
};

export const getVariable = (req,res) => {
  Variable.find({_id:req.params.id}).exec((err,variable) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(variable.length){
      return res.json({'success':true,'message':'Variable fetched by id successfully',variable});
    }
    else{
      return res.json({'success':false,'message':'Variable with the given id not found'});
    }
  })
};

export const deleteVariable = (req,res) => {
  Variable.findByIdAndRemove(req.params.id, (err,variable) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }

    return res.json({'success':true,'message':'Variable Deleted Successfully',variable});
  })
};
