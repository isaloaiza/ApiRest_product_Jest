const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    destination: { type: String, required: true, maxlength: 15 },
    category: { type: String, enum: ['maquillaje', 'aseo', 'comida'] },
    start_date: { type: Date, required: true },
    end_date: { type: Date }
}, {
    timestamps: true,
});

module.exports = mongoose.model('product', productSchema);