

import UserService from "../../api/services/user.service";
import ClientService from "../../api/services/client.sevice";

export  const clientResolvers = {

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

    getClient:async(_: any, args: any)=>{
       try {
        const { clientId } = args;

        const clientService = new ClientService();

        const client = await clientService.getClient(clientId);

      
        return client;
      } catch (error: any) {
        return { error: error.message };
      } 
    },

  
}

 


    
   