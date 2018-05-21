import mongoose from 'mongoose';

let Schema = mongoose.Schema({
    name: String,
    type: String, // NUMERIC, MULTIVALUE, UNIVALUE
    valueList: Array
});

export default mongoose.model('Variable', Schema);
