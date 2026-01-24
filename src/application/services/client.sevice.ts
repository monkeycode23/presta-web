import User from "../models/User.model";
import Client from "../models/client.model";
import PaginationService from "./pagination.service";
import mongoose from "mongoose";

class ClientService {
  constructor() {}

  async get(filter: any) {
    const { filters, pagination, userId } = filter;


    const total = await Client.countDocuments();

    const _pagination = PaginationService.getPagination({
      page: pagination.page,
      limit: pagination.limit,
      total,
    });

    const { skip, limit } = _pagination;
    //const userService = new UserService()

    const classrooms = await Client.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      { $skip: skip },
      { $limit: limit },

      
      
      // Assignments

      // 🔹 Stats
     
    ]);

    
    return {
      pagination:_pagination,
      data: classrooms,
    };
  }

 async getClient(clientId: string) {

    const client = await Client.findById(clientId);

    if(!client) throw new Error("Client Not found");

    return  client
  }



  static generateAccessCode() {
    const codigoAcceso = Math.floor(10000 + Math.random() * 90000).toString();

    return codigoAcceso;
  }
}

export default ClientService;
