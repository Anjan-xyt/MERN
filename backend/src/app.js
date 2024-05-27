import express from "express";


const app = express();

// app.get('/api/users/register', (req,res)=>{
//     res.send('Hiii')
// })

//importing routes
import userRoute from "./routes/user.register.route.js";


//applying routes

app.use('/api/users',userRoute);

console.log(process.env.PORT)

export default app;