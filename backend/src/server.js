import dotenv from "dotenv";
import connectDB from "./databases/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});


try{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server running successfully at ${process.env.PORT}`)
    })
    connectDB();

}catch(error){
    console.error('Some problem occurred to start the server');
}