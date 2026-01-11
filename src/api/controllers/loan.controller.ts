import Client from "../models/client.model";
import Loan from "../models/loan.model";
import Payment from "../models/payment.model";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/api.response";
import mongoose from "mongoose";
import PaymentService from "../services/payment.service";

class LoanController {
  constructor() {}

  
  createAction() {

    return async (req: Request, res: Response, next: any) => {
      try {
        const { clientId, amount, payment_interval,interest_rate,
            installments, disbursement_date, first_payment_date } = req.body;
 
        const cliente = await Client.findById(clientId);

        if (!cliente) throw new Error("Client not found");

            
        const interest_amount =Math.floor((amount*interest_rate)/100)
           
        const total_amount = amount +  interest_amount
             
        const loan = {
            label: "Prestamo " +( Number(cliente.statics.loans.total) + 1),
            interest_amount,
            left_amount:total_amount,
            total_amount,
              disbursement_date,
               first_payments_date:first_payment_date 
          
        }

        

        const _prestamo = new Loan({
            ...loan,
            amount,
            interest_rate,
          installment_number: installments,
          payment_interval: payment_interval,
          client: cliente._id,
          gain: loan.interest_amount,
          
        });


        const savedPrestamo = await _prestamo.save();
          
        //loans
        cliente.loans.push(savedPrestamo._id);
        cliente.statics.loans.total =cliente.statics.loans.total+1
        cliente.statics.loans.active =cliente.statics.loans.active+1
        //payments
        cliente.statics.payments.total =cliente.statics.payments.total+installments
        cliente.statics.payments.pending =cliente.statics.payments.pending+installments
        //amounts
        cliente.statics.amounts.total_lent =cliente.statics.amounts.total_lent+amount 
        cliente.statics.amounts.client_debt =cliente.statics.amounts.client_debt+loan.total_amount 



        await cliente.save()


        console.log(payment_interval)

        let savedPayments 
        if(payment_interval !== "custom"){
           
            savedPayments = await  PaymentService.generatePayments(_prestamo) 

        }
       

        ApiResponse.success(res,{
            loan:savedPrestamo,
            payments:savedPayments
        }, "Prestamo otorgado exitosamente")
      } catch (error) {
        console.error("Error al crear préstamo:", error);
        next(error);
      }
    };
  }

  updateAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { prestamoId } = req.params;
        const { amount, disbursementDate, proposito } = req.body;
        // Buscar el préstamo
        const prestamo = await Loan.findById(prestamoId);
        if (!prestamo) {
          return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }
        if (prestamo.status !== "pending") {
          return res
            .status(400)
            .json({ mensaje: "Solo se pueden editar préstamos pendientes" });
        }
        // Actualizar campos permitidos
        if (amount) prestamo.amount = amount;
        if (disbursementDate) prestamo.loan_date = disbursementDate;
        // if (proposito !== undefined) prestamo.proposito = proposito;
        prestamo.total_amount = prestamo.amount;
        await prestamo.save();
        const cliente = await Client.findById(prestamo.client).select(
          "_id name lastname email nickname sqlite_id phone loans"
        );

        ApiResponse.success(res, {
          prestamo,
          cliente,
        });
      } catch (error) {
        console.error("Error al actualizar préstamo pendiente:", error);
        next(error);
      }
    };
  }

  deleteAction() {


    return async (req: Request, res: Response, next: any) => {
      try {
        const { prestamoId } = req.params;
        console.log("prestamoId", req.params);

        const prestamo = await Loan.findById(prestamoId);

        if (!prestamo) {
          return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        if(prestamo.status != "active") throw new Error("No se peude eliminar prestamos que no sean activos");

        
        if(prestamo.paid_amount != 0) throw new Error("No se peude eliminar prestamos que tenga pagos pagados");
        
       
        // Eliminar pagos asociados al préstamo
        await Payment.deleteMany({ loan_id: prestamo._id });

    const cliente = await Client.findById(
      prestamo.client,
      
    ); // { new: true } asegura que el documento actualizado se devuelva

    if (!cliente) throw new Error("Cliente no encontrado");

    //cliente.loans = cliente.loans.filter((l)=>l==prestamo._id)
    // Actualizamos los valores dentro del objeto 'static'
    cliente.statics.loans.total -= 1; // Decrementamos el total de préstamos
    cliente.statics.loans.active -= 1; // Decrementamos los préstamos activos

    console.log(prestamo,"pprestamo")
    cliente.statics.payments.total -= prestamo.installment_number; // Sumamos el número de cuotas pagadas
    cliente.statics.payments.pending -= prestamo.installment_number; // Sumamos cuotas pendientes

    cliente.statics.amounts.total_lent -= prestamo.amount; // Incrementamos el total prestado
    cliente.statics.amounts.client_debt -= prestamo.total_amount; // Incrementamos la deuda total del cliente

    await cliente.save();
        // Eliminar el préstamo
        await Loan.findByIdAndDelete(prestamo._id);

        ApiResponse.success(res, {}, "Loan deleted successfully");
      } catch (error) {
        console.error("Error al eliminar préstamo:", error);
        next(error);
      }
    };
  }
}

export default LoanController;
// Crear solicitud de préstamo pendiente

/* 


// Función para generar un cronograma de cuotas restantes
const generarCuotasRestantes = (prestamo, pagos) => {
  const cuotas = prestamo.installment_number - prestamo.payments.filter(pago => pago.status === 'paid').length;
  if (prestamo.status === 'paid' || cuotas <= 0) {
    return [];
  }
  
  const cuotasRestantes = [];
  const ultimoPago = pagos.length > 0 ? new Date(pagos[0].payment_date) : new Date(prestamo.loan_date);
  //const proximaFecha = new Date(ultimoPago);
  //proximaFecha.setMonth(proximaFecha.getMonth() + 1);
  
  // Generar las cuotas restantes
  for (let i = 0; i < cuotas; i++) {
    //const fechaCuota = new Date(proximaFecha);
    //fechaCuota.setMonth(fechaCuota.getMonth() + i);
    
    cuotasRestantes.push({
      numeroCuota: prestamo.payments.filter(pago => pago.status === 'paid').length + i + 1,
      fechaEstimada: ultimoPago.payment_date,
      monto: prestamo.amount,
      pagada: false
    });
  }
  
  return cuotasRestantes;
};





// Actualizar préstamo
export const updatePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const {prestamo,payments} = req.body;
    
    // No permitir actualizar ciertos campos
    delete prestamo.client_id;
    delete prestamo.created_at;
    delete prestamo.updated_at;
    
    const _prestamo = await Prestamo.findOneAndUpdate(
      {sqlite_id:id.toString()},
      prestamo,
      { new: true, runValidators: true }
    );

 
    if (!_prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }


    if(payments.length > 0){

      const _payments = payments.map(payment =>{

        const sqlite_id = payment.id
  
        delete payment.id
        return {...payment, loan_id:savedPrestamo._id,sqlite_id:sqlite_id}
      });

      const savedPayments = await Pago.insertMany(_payments);
    }
    
    res.json(_prestamo);
  } catch (error) {
    console.error('Error al actualizar préstamo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Nuevo: Obtener préstamos para el filtro de la página de pagos
export const getLoansForFilter = async (req, res) => {
    try {
      // console.log(req) // Comentado para limpiar logs
      // console.log("getLoansForFilter") // Comentado para limpiar logs
        const clienteIdFromAuth = req.user?._id || req.clienteId; // Usar req.clienteId como fallback
        console.log( "clienteIdFromAuth", clienteIdFromAuth)
        if (!clienteIdFromAuth) {
            return res.status(400).json({ message: "No se pudo determinar el ID del cliente desde el token." });
        }
        
        // Corregir el campo de búsqueda a 'cliente' según el modelo Prestamo.js (que usa 'cliente' y no 'client_id')
        const loans = await Prestamo.find({ client_id: clienteIdFromAuth }) 
                                .select('_id label') 
                                .lean(); 
        
        console.log( "loans", loans)
        const processedLoans = loans.map(loan => ({
            _id: loan._id.toString(),
            label: loan.label || `Préstamo ${loan._id.toString().substring(0,6)}` 
        }));

        console.log( "processedLoans", processedLoans)
        // console.log(processedLoans) // Comentado para limpiar logs
        res.json(processedLoans); 

    } catch (error) {
        console.error("Error fetching loans for filter:", error);
        res.status(500).json({ message: "Error al obtener los préstamos para el filtro: " + error.message });
    }
};  

export const createLoanRequest = async (req, res) => {
  try {
    const { amount, disbursementDate, proposito } = req.body;
    const clienteId = req.clienteId;

    // Validar datos de entrada
    if (!amount || amount < 10000 || amount > 10000000) {
      return res.status(400).json({ 
        mensaje: 'El monto debe estar entre $10,000 y $10,000,000' 
      });
    }
    if (!disbursementDate) {
      return res.status(400).json({ 
        mensaje: 'La fecha de desembolso es requerida' 
      });
    }

    // Validar que el cliente existe
    const cliente = await Cliente.findById(clienteId).populate('loans');
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const prestamoPendiente = cliente.loans.find(prestamo => prestamo.status === 'pending');
    if(prestamoPendiente){
      return res.status(400).json({ mensaje: 'El cliente ya tiene un préstamo pendiente' });
    }

    // Crear el préstamo pendiente
    const nuevoPrestamo = new Prestamo({
      client_id: clienteId,
      amount: amount,
      total_amount: amount,
      interest_rate: 0, // Se establecerá cuando se apruebe
      payment_interval: 'monthly',
      installment_number: 1, // Solo una cuota por defecto
      loan_date: disbursementDate,
      status: 'pending',
      label: `Solicitud - $${amount.toLocaleString()}`,
      total_paid: 0,
      remaining_amount: amount,
      gain: 0,
      proposito: proposito || '',
      term: 1
    });

    const prestamoGuardado = await nuevoPrestamo.save();

    // Actualizar el cliente con la referencia al préstamo
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      clienteId,
      { $push: { loans: prestamoGuardado._id } }
    ).select('_id name lastname email nickname sqlite_id phone loans');

    // Emitir evento de socket para notificar a administradores
   /*  const { getConnectedUsers} = await import('../socketHandler.js');
    const {io} = await import('../index.js'); 
    const users = await User.find();


   

    res.status(201).json({
      mensaje: 'Solicitud de préstamo creada exitosamente',
      prestamo: prestamoGuardado,
      cliente: clienteActualizado
    });

  } catch (error) {
    console.error('Error al crear solicitud de préstamo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};  


// Obtener pagos de un préstamo
export const getPagosPrestamo = async (req, res) => {
  try {
    const { prestamoId } = req.params;
    
    const prestamo = await Prestamo.findById(prestamoId);
    
    if (!prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }
    
    const pagos = await Pago.find({ prestamo: prestamoId }).sort({ fechaPago: -1 });
    
    res.json(pagos);
  } catch (error) {
    console.error('Error al obtener pagos del préstamo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const getPendingLoans = async (req, res) => {
  try {
    const prestamos = await Prestamo.find({ status: 'pending' }).populate('client_id');
    res.json(prestamos);
  } catch (error) {
    console.error('Error al obtener préstamos pendientes:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Obtener préstamo por ID
export const getPrestamoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const prestamo = await Prestamo.findById(id).populate('cliente');
    
    if (!prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }
    
    res.json(prestamo);
  } catch (error) {
    console.error('Error al obtener préstamo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Obtener detalle de un préstamo con sus pagos
export const getDetallePrestamoConPagos = async (req, res) => {
  try {
    const { prestamoId } = req.params;
    
    const prestamo = await Prestamo.findById(prestamoId).populate('client_id').populate('payments');
    
    if (!prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }
    
    // Obtener todos los pagos relacionados con este préstamo
    const pagos = prestamo.payments;
    
    // Calcular información adicional
    const proximaFechaPago = calcularProximaFechaPago(prestamo, prestamo.payments);
    const cuotasRestantesProgramadas = pagos.filter(pago => pago.status === 'pending' || pago.status === 'incomplete').map(pago => ({
      numeroCuota: pago.label,
      fechaEstimada: pago.payment_date,
      monto: pago.amount,
      status: pago.status,
      pagada: pago.status === 'paid'
    }));
    //generarCuotasRestantes(prestamo, prestamo.payments);
    /* console.log(cuotasRestantesProgramadas);
    console.log(proximaFechaPago); 
    const paid_amount=prestamo.payments.reduce((acc, pago) => pago.status === 'paid' || pago.status === 'incomplete' ? 
    pago.status === 'incomplete' ? acc+pago.incomplete_amount : acc + pago.total_amount : acc, 0)
    
    //const porcentage =
    // Crear el objeto de respuesta
    const detallePrestamo = {
      prestamo,
      pagos,
      resumen: {
        cuotasPagadas: prestamo.payments.filter(pago => pago.status === 'paid').length,
        cuotasRestantes: prestamo.installment_number - prestamo.payments.filter(pago => pago.status === 'paid' || pago.status === 'incomplete').length,
        totalPagado: prestamo.payments.reduce((acc, pago) => pago.status === 'paid' || pago.status === 'incomplete' ? pago.status === 'incomplete' ?
         acc+pago.incomplete_amount : acc + pago.amount : acc, 0),
        montoRestante: prestamo.total_amount - prestamo.payments.reduce((acc, pago) => pago.status === 'paid' || pago.status === 'incomplete' ? acc + pago.amount : acc, 0),
        proximaFechaPago,
        porcentajePagado: ( paid_amount/ prestamo.total_amount * 100).toFixed(2)
      },
      cuotasRestantesProgramadas
    };
    
    res.json(detallePrestamo);
  } catch (error) {
    console.error('Error al obtener detalle del préstamo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Función para calcular la próxima fecha de pago
const calcularProximaFechaPago = (prestamo, pagos) => {

  const cuotasRestantes = prestamo.installment_number - prestamo.payments.filter(pago => pago.status === 'paid').length;

  console.log(cuotasRestantes);
 /*  if (prestamo.status === 'Pendiente' || cuotasRestantes <= 0) {
    return null;
  } 
 console.log("pagos",pagos);
  
  const fechaDesembolso = new Date(prestamo.loan_date);
  const ultimoPago =  pagos.filter(pago => pago.status === 'pending')[0]
  console.log("ultimoPago",ultimoPago);
  // Si no hay pagos, la próxima fecha es un mes después del desembolso
 /*  if (!ultimoPago) {
    const proximaFecha = new Date(fechaDesembolso);
    proximaFecha.setMonth(proximaFecha.getMonth() + 1);
    return proximaFecha;
  } 
  
  // Si hay pagos, la próxima fecha es un mes después del último pago
  const proximaFecha = ultimoPago ? new Date(ultimoPago.payment_date) : null
  //proximaFecha.setMonth(proximaFecha.getMonth() + 1);
  return proximaFecha;
};
*/
