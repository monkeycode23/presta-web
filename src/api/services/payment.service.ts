import { totalmem } from "os";
import User from "../models/User.model";
import Client from "../models/client.model";
import Payment from "../models/payment.model";
import PaginationService from "./pagination.service";
import mongoose from "mongoose";

class PaymentService {
  constructor() {}

  async getPaymentsStatus(args: any) {
    const { filter, pagination } = args;

    const { loanId, status, payment_date, clientId } = filter;

    const match: any = {};

    if (clientId?.length) match.client = clientId;
    if (loanId?.length) match.loan = loanId;
    if (status?.length) match.status = { $in: status };

    if (payment_date) {
      if (payment_date.from || payment_date.to) {
        match.payment_date = {
          ...(payment_date.from && { $gte: new Date(payment_date.from) }),
          ...(payment_date.to && { $lte: new Date(payment_date.to) }),
        };
      }

      if (payment_date.exact) {
        match.payment_date = new Date(payment_date.exact);
      }
    }

    const payments = await Payment.aggregate([
      { $match: match },

      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$payment_date",
              },
            },
            status: "$status",
          },
          count: { $sum: 1 },
          amountSum: { $sum: "$amount" },
        },
      },

      {
        $group: {
          _id: "$_id.day",
          total: { $sum: "$count" },

          paid: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "paid"] }, "$count", 0],
            },
          },

          pending: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "pending"] }, "$count", 0],
            },
          },

          incomplete: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "incomplete"] }, "$count", 0],
            },
          },

          expired: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "expired"] }, "$count", 0],
            },
          },
         
          paidAmount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$_id.status", "paid"] },
                    { $eq: ["$_id.status", "incomplete"] },
                  ],
                },
                {
                  $cond: [
                    { $eq: ["$_id.status", "paid"] },
                    "$amountSum", // monto total del pago
                    "$paid_amount", // si es incomplete, sumar solo lo pagado
                  ],
                },
                0,
              ],
            },
          },

          totalAmount: {
            $sum: "$amountSum", // 👈 todo lo que se debe ese día
          },
        },
      },

      { $sort: { _id: 1 } },
    ]);

    console.log(payments);

    // console.log(query,payments,pagination,"payments")
    return payments;
  }
  
  
  async getPayments(args: any) {
    const { filter, pagination } = args;

    const { loanId, status, payment_date, clientId,client } = filter;

    //const total = await Payment.countDocuments();

    //const client = await Client.findById(clientId).select("_id statics");

    //  console.log(client,"cliente")
    //if (!client) throw new Error("client not found");

    const query: any = {};

  const escapeRegex = (text:string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let clientIds: any[] = [];

if (client?.length) {
  clientIds = await Client.find({
    nickname: { $regex: "^" + escapeRegex(client), $options: "i" }
  }).distinct("_id");


}

if (clientIds.length) {
  query.client = { $in: clientIds };
}
    if (clientId.length) query.client = clientId;

    if (loanId.length) query.loan = loanId;

    if (status.length) query.status = { $in: status };

    if (payment_date) {
      if (payment_date.from.length || payment_date.to.length)
        query.payment_date = {
          $gte: new Date(payment_date.from),
          $lte: new Date(payment_date.to),
        };

      if (payment_date.exact) query.payment_date = new Date(payment_date.exact);
    }

    const total = await Payment.countDocuments(query);

    const _pagination = PaginationService.getPagination({
      page: pagination.page,
      limit: pagination.limit,
      total,
    });

    const { skip, limit } = _pagination;

    const payments = await Payment.find(query)
      .populate({
        path: "loan",
        select: "_id total_amount amount payment_interval",
      })
      .populate({ path: "client", select: "_id nickname" })
      .populate({ path: "processed_by", select: "_id username avatar" })

      .skip(skip)
      .limit(limit);
    /* 
    console.log(
      _pagination,
      " paginationnnnnnnnnnnnnnnnnnnnnnnnnnnn",
      payments
    ); */

    // console.log(query,payments,pagination,"payments")
    return {
      data: payments,
      pagination: _pagination,
    };
  }

  async getClientPayments(args: any) {
    const { filter, pagination, clientId } = args;

    const { loanId, status } = filter;

    //const total = await Payment.countDocuments();

    const client = await Client.findById(clientId).select("_id statics");

    //  console.log(client,"cliente")
    if (!client) throw new Error("client not found");

    const query: any = {};

    query.client = clientId;

    if (loanId.length) query.loan = loanId;

    if (status.length) query.status = { $in: status };

    // console.log("asdddddddddddddddddddddddddddddddddddddddddddddddddd")

    const total = await Payment.countDocuments(query);

    const _pagination = PaginationService.getPagination({
      page: pagination.page,
      limit: pagination.limit,
      total,
    });

    const { skip, limit } = _pagination;

    console.log(_pagination, " paginationnnnnnnnnnnnnnnnnnnnnnnnnnnn");

    const payments = await Payment.find(query)
      .populate({
        path: "loan",
        select: "_id total_amount amount payment_interval",
      })
      .populate({ path: "client", select: "_id nickname" })
      .populate({ path: "processed_by", select: "_id username avatar" })

      .skip(skip)
      .limit(limit);

    // console.log(query,payments,pagination,"payments")
    return {
      data: payments,
      pagination: _pagination,
    };
  }

  static async generatePayments(loan: any) {
    const { installment_number, amount, _id, payment_interval } = loan;

    let date = new Date(loan.first_payments_date);
    let sum = 0;
    const payments = [];
    // console.log(date);

    for (let index = 0; index < Number(installment_number); index++) {
      console.log("asdaskdj");
      const total = Math.floor(loan.total_amount / installment_number);
      const net = Math.floor(amount / installment_number);
      const interest = total - net;

      date =
        payment_interval != "unique"
          ? this.calculateIntervalDate(
              date.toISOString().split("T")[0],
              loan.payment_interval
            )
          : date;

      const nuevoPago = {
        label: "Pago " + (Number(index) + 1),
        payment_date: date,
        net_amount: net,
        amount: total,
        total_amount: total,
        gain: interest,
        interest_amount: interest,
        installment_number: index + 1,
        loan: loan._id,
        client: loan.client,
      };
      payments.push(nuevoPago);
      sum += nuevoPago.total_amount;
    }

    //console.log(payments);

    if (loan.total_amount > sum) {
      const p = payments[payments.length - 1];

      payments[payments.length - 1] = {
        ...payments[payments.length - 1],
        total_amount: p.total_amount + loan.total_amount - sum,
      };
    }
    const savedPayments = await Payment.insertMany(payments);

    return savedPayments.slice(0, 5);
  }

  static calculateIntervalDate(date: string, interval: string): Date {
    const newDate = new Date(date);

    switch (interval) {
      case "daily":
        newDate.setDate(newDate.getDate() + 1);
        break;

      case "weekly":
        newDate.setDate(newDate.getDate() + 7);
        break;

      case "fortnightly":
        newDate.setDate(newDate.getDate() + 15);
        break;

      case "monthly":
        newDate.setMonth(newDate.getMonth() + 1);
        break;

      default:
        throw new Error("Invalid interval");
    }

    return newDate;
  }
}

export default PaymentService;
