
import mongoose from "mongoose";




export const connectToDatabase = ()=> {


    mongoose
  .connect(
     process.env.ENVIROMENT == "dev" ? 
     String(process.env.MONGODB_URI) : "mongodb+srv://pepelepu23:79AZ7W7D5VYlcW36@cluster0.pv1rna4.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("Conexión a MongoDB establecida con éxito");
  })
  .catch((err: any) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });


}