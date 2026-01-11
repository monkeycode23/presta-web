import User from "../models/User.model";
import Client from "../models/client.model";
import Loan from "../models/loan.model";
import PaginationService from "./pagination.service";
import mongoose, { Query } from "mongoose";

class LoanService {
  constructor() {}

  async get(filter: any) {
    const { filters, pagination, userId } = filter;

   // console.log(filter)

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

 async getClientLoans(args:any) {

    const {clientId,filter} = args;
    const {order,status} = filter

    const  query:any = {
client:clientId
    }

    if(status.length){

        query.status = {
            $in: status
        }
    }

    
    const loans = await Loan.find(query)
    .sort({"created_at": order=="newest" ? -1 : 1});


  
    return  {data:loans,pagination:{
        page:1
    }}
  }



 
}

export default LoanService;
