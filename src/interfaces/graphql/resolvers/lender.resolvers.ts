

import UserService from "../../../api/services/user.service";

import lenderModel from "../../../api/models/lender.model";

export  const lenderResolvers = {

     getLender: async(_: any, args: any) => {
      try {
        const { userId } = args;

       const  lender = await lenderModel.findOne({user:userId})

       if(!lender) throw new Error("Not user lender found");
       
        
       console.log(lender)
        return {
            data:lender
        }
        
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


    
   