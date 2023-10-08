const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    date: { type: Number, required: true },
    author: { type: String, required: true },
    src: { type: String, required: true },
    label: { type: String },
    isDeleted: { type: Boolean, required: true, default:false },
    ipAddress: { type: String, required: true },
});

module.exports = model('Image', ImageSchema);