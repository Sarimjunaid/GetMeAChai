"use client"
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, fetchuser, initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"
// import useractions from  '/actions'

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
     
    }, [])
    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // Get the order id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='cover w-full relative'>
                <img className='object-cover w-full ' src={currentUser.coverpic} alt="cover" />
                <div className='absolute right-[32%] md:right-[45.3%] -bottom-14 border border-white overflow-hidden rounded-full size-30'>
                    <img width={120} height={120} className='rounded-full object-cover size-30' src={currentUser.profilepic} alt="profile" />
                </div>
            </div>
            <div className='info flex my-17 justify-center items-center flex-col gap-1'>
                <div className='text-lg font-bold'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Creating Animated art for VTT's
                </div>
                <div className='text-slate-400'>
                    18,957 members . 100 posts . $18,350/release
                </div>
                <div className='payment flex flex-col md:flex-row gap-3 w-[80%] mt-8'>
                    <div className='supporters w-full md:w-1/2 bg-slate-900 p-10 rounded-lg '>
                        {/* show list of all supporters as a leaderboard */}
                        <h2 className='text-2xl my-5 font-bold'>Supporters</h2>
                        <ul className='mx-5'>
                        </ul>
                        <li className='my-2 flex items-center gap-2 '>
                            <img className='rounded-full' width={25} src='user.png' />
                            <span>Supporter dontated <span className='font-bold'>₹1000</span> "I support you . " </span>
                        </li>
                        <li className='my-2 flex items-center gap-2 '>
                            <img className='rounded-full' width={25} src='user.png' />
                            <span>Supporter dontated <span className='font-bold'>₹1000</span> "Because I now  " </span>
                        </li>
                        <li className='my-2 flex items-center gap-2 '>
                            <img className='rounded-full' width={25} src='user.png' />
                            <span>Supporter dontated <span className='font-bold'>₹1000</span>" you will do it " </span>
                        </li>
                    </div>
                    <div className='makePayment w-full md:w-1/2 bg-slate-900 p-10 rounded-lg'>
                        <h2 className='text-2xl my-5 font-bold'>Make a Payment</h2>
                        <form className='flex flex-col gap-2'>
                            <input onChange={handleChange} value={paymentform.name} name='name' type='text' placeholder='Enter Name' className='p-2 w-full rounded-lg bg-slate-800' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type='text' placeholder='Enter Message' className='p-2 w-full rounded-lg bg-slate-800' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type='text' placeholder='Enter Amount' className='p-2 w-full rounded-lg bg-slate-800' />
                            <button onClick={() => pay(paymentform.amount)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </form>

                        {/* or choose from there amounts */}
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-2 rounded-lg' onClick={() => pay(1000)}>₹100</button>
                            <button className='bg-slate-800 p-2 rounded-lg' onClick={() => pay(2000)}>₹500</button>
                            <button className='bg-slate-800 p-2 rounded-lg' onClick={() => pay(3000)}>₹1000</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage