const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Room name is required'],
        unique: [true, 'Room with that name already exists']
    },
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('room', roomSchema);
