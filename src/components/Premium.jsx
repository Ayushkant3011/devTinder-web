import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {

  const verifyPremiumUser = async () =>{
    try{
      const [isUserPremium, setIsUserPremium] = useState(false);
      const res = axios.get(
        BASE_URL + "/premium/verify" ,
        { withCredentials : true},
      );

      if(res.data.isPremium) setIsUserPremium(true);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleBuyClick = async (type) =>{
    try{
      const order = await axios.post(
        BASE_URL + "/payment/create", 
        {
          membershipType: type,
        },
        {withCredentials : true}
      );

      const { amount, keyId, currency, notes, orderId } = order.data;
    
      // It should open the Razorpay Dailog box
      const options = {
          key: keyId, 
          amount, 
          currency,
          name: 'Dev-Tinder',
          order_id: orderId,
          prefill: {
            name: notes.firstName + " " + notes.lastName,
            email: notes.emailId,
            contact: '9999999999'
          },
          theme: {
            color: '#F37254'
          },
          handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch(err){
      console.log(err);
    }
  };


  return isUserPremium ? (
    <h1 className='text-3xl font-extrabold text-center '>You're Already a Premium User</h1>
  ) : (
    <div className='min-h-screen flex items-start justify-center px-6 py-16 bg-base-200'>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch gap-8">
        <div className="card w-full bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h1 className='text-3xl font-bold text-primary mb-5'>Silver Membership</h1>
          <ul className="text-base-content/80 space-y-2 text-left mb-7">
            <li> - Chat with other people</li>
            <li> - 100 Connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 Months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("silver")} 
            className="btn btn-primary btn-wide rounded-full shadow-md hover:shadow-lg">
            Buy Silver
          </button>
        </div>

        <div className="divider lg:divider-horizontaldivider lg:divider-horizontal font-semibold text-base-content/50">OR</div>

        <div className="card w-full bg-base-100 rounded-2xl shadow-xl border border-warning/40 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h1 className='text-3xl font-bold text-warning mb-5'>Gold Membership</h1>
          <ul className="text-base-content/80 space-y-2 text-left mb-7">
            <li> - Chat with other people</li>
            <li> - Infinite Connection Requests per day</li>
            <li> - Gold Tick</li>
            <li> - 6 Months</li>
          </ul>

          <button 
            onClick={() => handleBuyClick("gold")} 
            className="btn btn-warning btn-wide rounded-full shadow-md hover:shadow-lg">
            Buy Gold
          </button>
        </div>
    </div>
    </div>
  )
}

export default Premium
