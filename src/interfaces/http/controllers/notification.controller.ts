import Notification from "../../../api/models/notification.model";
import Client from "../../../api/models/client.model";
import User from "../../../api/models/User.model";
import { Response, Request } from "express";

class NotificationController {
  constructor() {}

  createAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const {
          to_user,

          to_client,
          type,
          message,
          link,
        } = req.body;

        const notification = {};

        // Enviar notificación por socket si el destinatario está conectado
        let targetSocketId;
        let savedNotification;

        const users: any = await User.find();

        users.forEach(async (user: any) => {
          const newNotification = new Notification({
            ...notification,
            to_user: user._id,
            type,
            message,
            link,
          });

          savedNotification = await newNotification.save();
          user.notifications.push(newNotification._id);
          user.save();
          // Asumimos que los User (admins/staff) también pueden tener sockets. Necesitaríamos una lógica similar a connectedUsers para ellos.
          // Por ahora, esto es un placeholder. Deberías extender socketHandler.js para manejar User sessions.
        });

        res.status(201).json(savedNotification);
      } catch (error: any) {
        console.error("Error al crear notificación:", error);
        res.status(500).json({
          message: "Error del servidor al crear notificación",
          error: error.message,
        });
      }
    };
  }

  /*  getUserNotifications() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const userId = req.userId; // ID del usuario autenticado
        const user = await User.findById(userId).populate({
          path: "notification",
          sort: { created_at: -1 },
          match: { read: false },
          populate: { path: "from_client", select: "name" },
        });

        //console.log(notifications)
        res.json(user.notifications);
      } catch (error:any) {
        res
          .status(500)
          .json({
            message: "Error al obtener notificaciones del usuario",
            error: error.message,
          });
      }
    };
  } */

  markAsReadAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { notificationIds } = req.body;

        if (Array.isArray(notificationIds)) {
          const errors: any[] = [];
          notificationIds.forEach(async (notificationId) => {
            const notification = await Notification.findByIdAndUpdate(
              notificationId,
              { read: true },
              { new: true }
            );
            if (!notification) {
              console.log("Notificación no encontrada");
              errors.push({
                notificationId,
                message: "Notificación no encontrada",
              });
            }
          });

          return res.status(200).json({
            message: "Notificaciones marcadas como leídas",
            errors: errors,
          });
        } else {
          const notification = await Notification.findByIdAndUpdate(
            notificationIds,
            { read: true },
            { new: true }
          );
          if (!notification) {
            return res
              .status(404)
              .json({ message: "Notificación no encontrada" });
          }
          res.json(notification);
        }
      } catch (error: any) {
        res.status(500).json({
          message: "Error al marcar notificación como leída",
          error: error.message,
        });
      }
    };
  }

  deleteAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { notificationId } = req.params;
        // Aquí deberías verificar que la notificación pertenece al usuario/cliente autenticado antes de eliminarla
        const notification = await Notification.findByIdAndDelete(
          notificationId
        );
        if (!notification) {
          return res
            .status(404)
            .json({ message: "Notificación no encontrada" });
        }
        res.json({ message: "Notificación eliminada exitosamente" });
      } catch (error: any) {
        res.status(500).json({
          message: "Error al eliminar notificación",
          error: error.message,
        });
      }
    };
  }

  updateAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { notificationId } = req.params;
        // Aquí deberías verificar que la notificación pertenece al usuario/cliente autenticado antes de eliminarla
        const notification = await Notification.findByIdAndDelete(
          notificationId
        );
        if (!notification) {
          return res
            .status(404)
            .json({ message: "Notificación no encontrada" });
        }
        res.json({ message: "Notificación eliminada exitosamente" });
      } catch (error: any) {
        res.status(500).json({
          message: "Error al eliminar notificación",
          error: error.message,
        });
      }
    };
  }
}

/* 
  
  // Obtener notificaciones para un cliente
export const getNotificationsForClient = async (req, res) => {
  try {
    const clientId = req.clienteId; // ID del cliente autenticado (asumiendo que authMiddleware lo añade)

    //console.log(clientId,"iddddddddddddddddddddddd")
    
    const client = await Cliente.findOne({_id:clientId})
    .populate("notification")
   
   // console.log(client.notification,"asdaskdlajsdajskdhaskjhaskd")
    
    res.json(client.notification);


  } catch (error) {
    res.status(500).json({ message: 'Error al obtener notificaciones del cliente', error: error.message });
  }
};
  
  // Crear una notificación desde la app
  export const createNotificationFromApp = async (req, res) => {
    try {
      const { user_id, client_id, type, message, link,data } = req.body;

      if(!user_id && !client_id){
        return res.status(400).json({ message: 'Se requiere user_id o client_id' });
      } 

      const user = await User.findOne({sqlite_id:user_id.toString()})
      const client = await Cliente.findOne({sqlite_id:client_id.toString()})

      if(!user && !client){
        return res.status(400).json({ message: 'Usuario o cliente no encontrado' });
      }
      console.log(user,"user")
      console.log(client,"client")


      const notification = new Notification({ 
        user_id:user._id, 
        client_id:client._id, 
        type, message, link ,
        message, 
        link,
        data
      });
      await notification.save();

      user.notification.push(notification._id)
      user.save()

      client.notification.push(notification._id)
      client.save()

      const targetSocketId = getReceiverSocketId("client",client._id.toString());
      //const targetSocketIdUser = getReceiverSocketId("user",user._id.toString());

      if(targetSocketId && io){
        io.to(targetSocketId).emit('new_notification', notification);
        console.log(`Notificación enviada por socket a cliente ${client_id}`);
      }

      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear notificación desde la app', error: error.message });
    }
  }; */

export default NotificationController;
