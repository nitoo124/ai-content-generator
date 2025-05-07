import mongoose from "mongoose";


type ConnectionObj = {
    isConnected?:number
}

const connection:ConnectionObj={}

async function dbConnect():Promise<void> {

    if (connection.isConnected) {
        console.log("Already connected to DB")
        return
    
    }
    try {
       const db =  await mongoose.connect(process.env.MONGO_URI||"",{
        dbName:"AI-content-db"
       })
       connection.isConnected = db.connections[0].readyState
       console.log("DB connectedSuccessfully ")

        
    } catch (error) {
        console.log("DataBase connection failed",error)
        process.exit(1)
        
    }
    
}
export default dbConnect
 