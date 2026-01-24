// types/tenant.permissions.ts

export const USER_PERMISSIONS = [
  
  {
    group: "Clientes",
    permissions: [
      { key: "client:create", label: "Crear clientes" },
      { key: "client:view", label: "Ver clientes" },
      { key: "client:edit", label: "Editar clientes" },
      { key: "client:delete", label: "Eliminar clientes" },
    ],
  },

 
  {
    group: "Préstamos",
    permissions: [
      { key: "loan:create", label: "Crear préstamos" },
      { key: "loan:view", label: "Ver préstamos" },
      { key: "loan:edit", label: "Editar préstamos" },
      { key: "loan:delete", label: "Eliminar préstamos" },
      { key: "loan:approve", label: "Aprobar préstamos" },
    ],
  },

 
  {
    group: "Pagos",
    permissions: [
        { key: "payment:pay", label: "Registrar pagos" },
      { key: "payment:create", label: "Registrar pagos" },
      { key: "payment:view", label: "Ver pagos" },
      { key: "payment:edit", label: "Editar pagos" },
      { key: "payment:delete", label: "Eliminar pagos" },
    ],
  },

  {
    group: "Empleados",
    permissions: [
      { key: "employee:create", label: "Crear empleados" },
      { key: "employee:view", label: "Ver empleados" },
      { key: "employee:edit", label: "Editar empleados" },
      { key: "employee:delete", label: "Eliminar empleados" },
      { key: "employee:assign_role", label: "Asignar roles a empleados" },
    ],
  },


  {
    group: "Reportes",
    permissions: [
      { key: "report:view", label: "Ver reportes" },
      { key: "report:export", label: "Exportar reportes" },
    ],
  },
] as const;
