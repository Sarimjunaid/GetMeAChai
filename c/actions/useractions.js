"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import User from "@/models/User"
import username from "@/app/[username]/page"

export const initiate = async (amount, to_username,
    paymentform) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })
    
    let options = {
        amount : Number.parseInt(amount),
        currency : "INR" , 
    }

    let x  = await instance.orders.create(options)

    // Create a payment object which shows the pending payment in the database
    await Payment.create({oid: x.id, amount: amount, to_user: to_username, name : paymentform.name, message:paymentform.message})

    return x
}

export const fetchuser = async (username) =>{
    await connectDB()
    let u = await User.findOne({username: username})
    let user = u.toObject({flattenObjectIds: true})
    return user
}

export const fetchpayments = async (username) =>{
    await connectDB()
    let p = await Payment.find({to_user: username, done:true}).sort({amount : -1}).lean()
    return p
}

export const updateProfile = async (data,oldusername) =>{
    await connectDB()
    let ndata = Object.fromEntries(data)
    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{        
        await User.updateOne({email: ndata.email}, ndata)
    }
}