import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';

import { authRequired } from '../middlewares/auth.middleware';

import { requirePermissionRole } from '../middlewares/role.middleware';
import LoanController from '../controllers/loan.controller';

/* import {verificarDuenoPrestamo} from '../middleware/loan.middleware.js'; */
const router = Router();

const loanController = new LoanController()

/* router.get('/for-filter', verificarToken, getLoansForFilter);
router.get('/:prestamoId/detalle', verificarToken, getDetallePrestamoConPagos);
router.get('/:prestamoId/pagos', verificarToken, getPagosPrestamo);
router.get('/:prestamoId', verificarToken, getPrestamoById);
router.get('/pendientes', verificarToken, getPendingLoans);
 */





router.post('/',  [authRequired,requirePermissionRole("create_loan")],loanController.createAction());

router.put('/:prestamoId',  [authRequired,requirePermissionRole("edit_loan")],loanController.updateAction());

router.delete('/:prestamoId',  [authRequired,requirePermissionRole("delete_loan")],loanController.deleteAction());


//router.post('/request', verificarToken, createLoanRequest);

/* router.put('/:prestamoId/pending', verificarToken, updatePendingLoan); */


export default router; 