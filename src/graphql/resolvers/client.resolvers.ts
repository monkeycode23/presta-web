

import UserService from "../../api/services/user.service";
import ClientService from "../../api/services/client.sevice";

export  const userResolvers = {

    getFilterClients:async(_: any, args: any)=>{
       try {
        const { userId } = args;

        const clientService = new ClientService();

        const client = await clientService.get(args);

        return client;
      } catch (error: any) {
        return { error: error.message };
      } 
    },

  
}

 


    
   