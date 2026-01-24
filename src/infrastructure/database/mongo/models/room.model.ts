import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    //required: true,
    enum: ['group', 'private'],
    default: 'group', 
  },
  description: {
    type: String,
  },
  is_private: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, {

  toObject: {
    virtuals: true, // incluye virtuals si tienes definidos
    versionKey: false, // elimina __v
    transform: (doc, ret:any) => {
      delete ret.password; // oculta la contraseña
      ret.id = ret._id;     // opcional: renombra _id a id
      delete ret._id;
      return ret;
    }
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});



const Room = mongoose.model('Room', roomSchema);

export default Room; 