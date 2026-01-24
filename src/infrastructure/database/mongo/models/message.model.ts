import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true,
    },
  
  
},{
    timestamps:true
});

const Message = mongoose.model('Message', messageSchema);

export default Message;