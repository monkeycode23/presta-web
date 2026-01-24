import { Router } from 'express';
import ClienteController from '../controllers/client.controller';

import { authRequired, } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator.middleware';
//import { verificarToken, verificarPropietario } from '../middleware/authMiddleware.js';
import { requirePermissionRole } from '../middlewares/role.middleware';
import { createClientValidationRules } from '../../../api/validations/client.validations';
import LenderController from '../controllers/lender.controller';

const router = Router();

const lenderController = new LenderController()


router.put('/:clienteId', 
    [authRequired,requirePermissionRole("edit_client")], 
    lenderController.updateAction()
);



router.post('/',
    authRequired,
    requirePermissionRole("lender:create"),
    createClientValidationRules,validateRequest , 
    lenderController.createAction()
);


router.delete('/:clientId', 
    [authRequired,requirePermissionRole("delete_client")], 
    lenderController.deleteAction()
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