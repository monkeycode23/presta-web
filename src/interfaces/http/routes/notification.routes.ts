import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware';

import { requirePermissionRole } from '../middlewares/role.middleware';

import NotificationController from '../controllers/notification.controller';





const router = Router();

const notificationController = new NotificationController()

// Crear una notificación (probablemente una acción interna del sistema o admin)
router.post('/', 
    [authRequired,requirePermissionRole("create_payment")], 
     notificationController.createAction()
); // Proteger según quién puede crear notificaciones

// Obtener notificaciones para el usuario autenticado (admin/staff)
router.get('/user',

     [authRequired,requirePermissionRole("create_payment")], 
     notificationController.createAction()
);

// Obtener notificaciones para el cliente autenticado
// Se podría usar un endpoint específico o el mismo que /user y diferenciar por rol en el controlador
/* router.get('/client', 
     [authRequired,requirePermissionRole("create_payment")], 
     notificationController.createAction()
);
 */
// Marcar una notificación como leída
router.post('/',
     [authRequired,requirePermissionRole("create_notification")], 
     notificationController.createAction()
)

router.post('/mark-read', 
     [authRequired,requirePermissionRole("mark_read_notification")], 
     notificationController.createAction()
);

router.put('/:notificationId', 
     [authRequired,requirePermissionRole("edit_notification")], 
     notificationController.updateAction()
);

// Eliminar una notificación
router.delete('/:notificationId',
     [authRequired,requirePermissionRole("delete_notification")], 
     notificationController.createAction()
);

/* router.post('/createfromapp',
     [authRequired,requirePermissionRole("create_payment")], 
     notificationController.createAction()
);
 */


export default router; 