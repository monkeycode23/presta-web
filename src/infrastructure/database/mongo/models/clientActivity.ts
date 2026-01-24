import mongoose from 'mongoose';

const clientActivitySchema = new mongoose.Schema({

  action: {
    type: String,
    required: true,
        enum: [
            'profile_update',
            'loan_request',
            'password_change',
            'email_verification',
            'phone_verification',
            'pending_loan_deleted',
            'pending_loan_request',
            'pending_loan_update'
        ] 
  },    
  details: {
    type: String,
    required: false
  },
  data: {
    type: Object,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
 /*  toObject: {
    virtuals: true, // incluye virtuals si tienes definidos
    versionKey: false, // elimina __v
    transform: (doc, ret) => {
      delete ret.password; // oculta la contraseña
      ret.id = ret._id;     // opcional: renombra _id a id
      delete ret._id;
      return ret;
    }
  }, */
  timestamps: true
});



const ClientActivity = mongoose.model('ClientActivity', clientActivitySchema);

export default ClientActivity;  