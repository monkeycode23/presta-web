import { Request, Response } from "express";
import Payment from "../../../../../api/models/payment.model";
import Loan from "../../../../../api/models/loan.model";
import Client from "../../../../../api/models/client.model";
import { PaymentStatus } from "../../../../../api/models/payment.model";
import { ApiResponse } from "../../../../../application/utils/api.response";
import PaymentService from "../../../../../api/services/payment.service";

class PayAction {
  private client: any;
  private loan: any;
  private payment: any;
  private status: string;
  private onDate: boolean;
  private SUCCESS_MESSAGE = "user registerd successfully";

  constructor() {
    this.payment = null;
    this.loan = null;
    this.client = null;
    this.onDate = false;
    this.status = "";
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const { paymentId } = req.params;
      const { amount, payment_method, onDate } = req.body;

      const { userId } = req;

      await this.validate(paymentId);

      this.setPaymentValues(amount, payment_method, String(userId));

      await this.setLoanValues(amount);

      await this.setClientValues(amount);

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

  setPaymentValues(paidAmount: number, payment_method: string, userId: string) {
    //guardamos el stado actual del pago
    this.status = this.payment.status;

    if (this.payment.status == "incomplete") {
      const left_amount = this.payment.left_amount - paidAmount;

      this.payment.status =
        left_amount == 0 ? PaymentStatus.PAID : PaymentStatus.INCOMPLETE;

      this.payment.paid_amount = this.payment.paid_amount + paidAmount;
      this.payment.left_amount = left_amount as number;
    }

    if (this.payment.status == "pending") {
      const left_amount = this.payment.total_amount - paidAmount;

      this.payment.status = left_amount == 0 ? "paid" : "incomplete";

      this.payment.paid_amount = paidAmount;
      this.payment.left_amount = left_amount as number;

      console.log(left_amount, paidAmount);
    }

    this.payment.payment_method = payment_method;
    this.payment.paid_date = new Date().toISOString();
    this.payment.processed_by = userId;

    PaymentService.calculateLateDays(this.payment);

    console.log(this.payment, "pagoooooooooooooooooooooooooooooooooooooooo");
  }

  async setLoanValues(paidAmount: number) {
    const left = Number(this.loan.left_amount) - paidAmount;

    console.log(this.loan.left_amount, left);

    this.loan.left_amount = left < 0 ? 0 : left;

    this.loan.paid_amount =
      this.loan.paid_amount + paidAmount <= this.loan.total_amount
        ? this.loan.paid_amount + paidAmount
        : this.loan.paid_amount;

    if (this.loan.left_amount == 0) this.loan.status = "completed";

    this.loan.progress = Math.floor(
      (this.loan.paid_amount / this.loan.total_amount) * 100
    );

    if (this.payment.status == "paid") this.loan.paid_installments += 1;

    //  console.log(this.loan, "prestamooooooooooooooooooooooooooooooo");
  }

  async setClientValues(paidAmount: number) {
    const today = new Date();
    const payment_date = this.payment.payment_date;

    console.log(payment_date);

    const onDate =
      today.toISOString().split("T")[0] ==
      payment_date.toISOString().split("T")[0]
        ? true
        : today > new Date(payment_date);

    if (this.payment.status == "paid") {
      if (this.status == "pending") this.client.statics.payments.pending -= 1;
      if (this.status == "incomplete")
        this.client.statics.payments.incomplete -= 1;
      this.client.statics.payments.paid += 1;
    } else if (
      this.payment.status == "incomplete" &&
      this.status == "pending"
    ) {
      this.client.statics.payments.pending -= 1;
      this.client.statics.payments.incomplete += 1;
    }

    if (this.loan.status == "completed") {
      this.client.statics.loans.completed += 1;
      this.client.statics.loans.active -= 1;
    }

    this.client.statics.amounts.client_debt -= paidAmount;
    this.client.statics.amounts.total_paid += paidAmount;

    if (onDate) {
      this.client.statics.reputation.on_time_payments += 1;
    } else {
      this.client.statics.reputation.late_payments += 1;
    }

    //    console.log(this.client, "clienteeeeeeeeeeeeeeeeeeeeeee");
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

export default PayAction;
