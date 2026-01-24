import { Router } from 'express';
import ClienteController from '../controllers/client.controller';

import { authRequired, } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator.middleware';
//import { verificarToken, verificarPropietario } from '../middleware/authMiddleware.js';
import { requirePermissionRole } from '../middlewares/role.middleware';
import { createClientValidationRules } from '../../../api/validations/client.validations';

const router = Router();

const clientController = new ClienteController()


router.put('/:clienteId', 
    [authRequired,requirePermissionRole("edit_client")], 
    clientController.updateAction()
);



router.post('/',
    authRequired,
    requirePermissionRole("client:create"),
    createClientValidationRules,validateRequest , 
    clientController.createAction()
);


router.delete('/:clientId', 
    [authRequired,requirePermissionRole("delete_client")], 
    clientController.deleteAction()
);










// Rutas protegidas
//router.put('/profile', verificarToken, updateClienteProfile);
//router.get('/:clienteId', [verificarToken, verificarPropietario], getClienteById);

//router.get('/:clienteId/loans', [verificarToken, verificarPropietario], getPrestamosCliente);
//router.get('/:clienteId/payments', [verificarToken, verificarPropietario], getPagosCliente);
//router.get('/:clienteId/resumen', [verificarToken, verificarPropietario], getResumenCliente);



// Ruta para obtener cliente por documento de identidad (solo para autenticación)
//router.get('/documento/:documento', getClienteByDocumento);

export default router; 