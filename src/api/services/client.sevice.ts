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

    const { skip, limit: _limit } = pagination;
    //const userService = new UserService()

    const classrooms = await Client.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      { $skip: skip },
      { $limit: _limit },

      
      
      // Assignments

      // 🔹 Stats
     
    ]);

    return {
      pagination,
      data: classrooms,
    };
  }

  static generateAccessCode() {
    const codigoAcceso = Math.floor(10000 + Math.random() * 90000).toString();

    return codigoAcceso;
  }
}

export default ClientService;
