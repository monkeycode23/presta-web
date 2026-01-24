import { Request, Response } from "express";
import Payment from "../../../../../api/models/payment.model";
import Loan from "../../../../../api/models/loan.model";
import Client from "../../../../../api/models/client.model";
import { PaymentStatus } from "../../../../../api/models/payment.model";
import { ApiResponse } from "../../../../../application/utils/api.response";

class UpdateAction {
  private client: any;
  private loan: any;
  private payment: any;
  private onDate: boolean;
  private SUCCESS_MESSAGE = "user registerd successfully";

  constructor() {
    this.payment = null;
    this.loan = null;
    this.client = null;
    this.onDate = false;
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const { paymentId } = req.params;
      const { status } = req.body;

      const { userId } = req;

      await this.validate(paymentId);

      this.setPaymentStatus(status);

      //await this.setLoanValues(amount)

      //  await this.setClientValues(amount)

       await this.payment.save();

       await this.loan.save();

       await this.client.save();

       
      ApiResponse.success(res, {
        payment: this.payment,
        client: this.client,
        loan: this.loan,
      });
    } catch (error) {
      console.error("Error al obtener pago:", error);
      next(error);
    }
  }

  setPaymentStatus(status: string) {
    if (!status) return;

    if (status == "pending") this.pendingStatus();
  }

  pendingStatus() {
    this.payment.paid_date = null;
    this.payment.processed_by = null;
    this.payment.late_days = 0;

    //loan
    this.loan.left_amount += this.payment.paid_amount;
      this.loan.paid_amount -= this.payment.paid_amount;


      //client

      this.client.statics.payments.pending += 1;

      this.client.statics.amounts.total_paid -= this.payment.paid_amount;
      this.client.statics.amounts.client_debt += this.payment.paid_amount;



    if (this.payment.status == "incomplete") {

              this.client.statics.payments.incomplete -= 1;
      this.payment.incomplete_amount = 0;
    }

    if (this.payment.status == "paid") {
      this.loan.paid_installments! -= 1;
      if (this.loan.status == "completed") {
        this.loan.status = "active";

         this.client.statics.loans.active += 1;
          this.client.statics.loans.completed -= 1;
      }

        this.client.statics.payments.paid -= 1;
      
    }


    //nuevo progreso
    this.loan.progress = Math.floor(
      (this.loan.paid_amount / this.loan.total_amount) * 100
    );


    //mntos nuevos payment
    this.payment.left_amount = this.payment.total_amount;
    this.payment.paid_amount = 0;

    //this.setLoanValues(status)

    this.payment.status = "pending"

    console.log(this.payment, this.loan,this.client.statics);
  }

  

  async validate(paymentId: string) {
    this.payment = await Payment.findById(paymentId);

    if (!this.payment) throw new Error("Payment not found");

    this.loan = await Loan.findById(this.payment.loan);

    if (!this.loan) throw new Error("Loan not found");

    this.client = await Client.findById(this.loan.client); // { new: true } asegura que el documento actualizado se devuelva

    if (!this.client) throw new Error("Client not found");
  }
}

export default UpdateAction;
