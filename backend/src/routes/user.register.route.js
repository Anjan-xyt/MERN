import { Router } from "express";
const router = Router();
import userRegisterConotroller from "../controllers/user.register.controller.js";


router.route('/register').get((req,res)=>{
    res.status(200).json({
        name:'Nilanjan Nath'
    })
})

export default router