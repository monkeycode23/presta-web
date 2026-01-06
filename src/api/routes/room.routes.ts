import { Router } from 'express';
import {
    getClienteById,
    getPrestamosCliente,
    getPagosCliente,
    getResumenCliente,
    getClienteByDocumento,
    createCliente,
    updateCliente,
    deleteCliente,
    updateClienteProfile
} from '../controllers/clienteController';
import { verificarToken, verificarPropietario } from '../middleware/authMiddleware';
import Room from '../models/room';
const router = Router();
import User from '../models/user';
import Message from '../models/message';





router.post('/create', verificarToken, createRoom);
router.post('/update/:id', verificarToken, updateRoom);
router.post('/delete/:id', [verificarToken], deleteRoom);
router.post('/join/:id', verificarToken, joinRoom);
// Ruta para obtener cliente por documento de identidad (solo para autenticación)
router.get('/', verificarToken, getRooms);
router.get('/:id', verificarToken, getRoomById);
router.post('/:id/messages', verificarToken, getRoomMessages);
router.put('/markasread', verificarToken, markAsRead);

export default router; 