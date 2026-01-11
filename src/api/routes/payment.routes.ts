import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';
import { authRequired } from '../middlewares/auth.middleware';

import { requirePermissionRole } from '../middlewares/role.middleware';


const router = Router();

const paymentController = new PaymentController()


router.post('/',
     [authRequired,requirePermissionRole("create_payment")], 
     paymentController.createAction()
    );


router.post('/pay/:paymentId',
     [authRequired,requirePermissionRole("payment:pay")], 
     paymentController.payAction()
    );

router.put('/:id', 
    [authRequired,requirePermissionRole("edit_payment")], 
    paymentController.createAction());

router.delete('/:paymentId', 
    [authRequired,requirePermissionRole("delete_payment")], 
    paymentController.createAction()
);



// Nueva ruta para subir comprobante de pago
/* router.post(
  '/:pagoId/upload-proof',
  verificarToken, 
  upload.single('comprobanteFile'), // 'comprobanteFile' será el nombre del campo en FormData
  uploadComprobantePago
); */

// Nueva ruta para borrar un comprobante de pago específico
/* router.delete(
  '/comprobantes/:pagoId',
  verificarToken,
  deleteComprobantePago
);
 */

export default router; 


// Middleware para verificar que el cliente es dueño del pago
/*

/*

const verificarDuenoPago = async (req, res, next) => {
  try {
    const pagoId = req.params.id;
    const clienteId = req.clienteId.toString();
    
    // Importar modelo de Pago
    const Pago = (await import('../models/pago.js')).default;
    
    // Buscar el pago
    const pago = await Pago.findById(pagoId);
    
    if (!pago) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }
    
    // Verificar que el cliente es dueño del pago
    if (pago.cliente.toString() !== clienteId) {
      return res.status(403).json({ 
        mensaje: 'No tienes permiso para acceder a este pago' 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar dueño del pago:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
 */