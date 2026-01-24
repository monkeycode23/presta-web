import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admin_name: {
    type: String,
    required: true
  },
  admin_role: {
    type: String,
    enum: ['admin', 'collector'],
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['payment_marked_paid', 'payment_marked_pending', 'payment_marked_incomplete', 'payment_updated']
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pago',
    required: true
  },
  payment_sqlite_id: {
    type: Number,
    required: true
  },
  client_sqlite_id: {
    type: Number,
    required: true
  },
  client_name: {
    type: String,
    required: true
  },
  loan_label: {
    type: String,
    required: true
  },
  payment_amount: {
    type: Number,
    required: true
  },
  previous_status: {
    type: String,
    required: true
  },
  new_status: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    required: false
  },
  incomplete_amount: {
    type: Number,
    required: false
  },
  details: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  /* toObject: {
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

// Ín
// dices para mejorar el rendimiento de consultas
activitySchema.index({ admin_id: 1, timestamp: -1 });
activitySchema.index({ payment_id: 1 });
activitySchema.index({ client_sqlite_id: 1 });
activitySchema.index({ timestamp: -1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;  