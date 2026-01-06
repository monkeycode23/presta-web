import Role from "../api/models/role.model";
import { USER_PERMISSIONS } from "../api/utils/permissions";

export async function initializeRoles() {
  const defaultRoles = [
    { name: 'admin', permissions: ['*'] }, // '*' = todos los permisos
    { name: 'moderador', permissions: ['ver_clientes', 'crear_prestamo'] },
    { name: 'client', permissions: ['view_loans', 'view_payments',] },
    { name: 'user', permissions: [
       ... USER_PERMISSIONS.map((per)=>{
            return  per.permissions.map((p)=>p.key)
       }).flat()
    ] },

    { name: 'employee', permissions: [
       ... USER_PERMISSIONS.map((per)=>{
            return  per.permissions.map((p)=>p.key)
       }).flat()
    ]},

  ];

  for (const roleData of defaultRoles) {
    const roleExists = await Role.findOne({ name: roleData.name });
    if (!roleExists) {
      await Role.create(roleData);
      console.log(`Rol creado: ${roleData.name}`);
    }
  }
}

 