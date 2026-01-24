

import mongoose from 'mongoose';



const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // 'crear_prestamo', 'ver_clientes', etc.
});
const Permission = mongoose.model('Permission', PermissionSchema);



export default Permission