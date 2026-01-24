

import PaymentService from "../../../api/services/payment.service";
import UserService from "../../../api/services/user.service";


export  const paymentsResolvers = {


    paymentsStatus:async(_: any, args: any) => {
      try {

        //console.log(args,"asdasudjhaskjdhaskdhaksd111")

        const paymentsService = new PaymentService()

       // console.log(paymentsService.getClientPayments)

        const payments = await  paymentsService.getPaymentsStatus(args);


        return payments 
      } catch (error: any) {
        return { error: error.message };
      }
    },

    getPayments: async(_: any, args: any) => {
      try {

        //console.log(args,"asdasudjhaskjdhaskdhaksd111")

        const paymentsService = new PaymentService()

       // console.log(paymentsService.getClientPayments)

        const payments = await  paymentsService.getPayments(args);


        return payments 
      } catch (error: any) {
        return { error: error.message };
      }
    },

     getClientPayments: async(_: any, args: any) => {
      try {

        //console.log(args,"asdasudjhaskjdhaskdhaksd111")

        const paymentsService = new PaymentService()

       // console.log(paymentsService.getClientPayments)

        const payments = await  paymentsService.getClientPayments(args);


        return payments 
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


    
   