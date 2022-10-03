const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'message'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        required: [true, 'A message is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('message', messageSchema);
