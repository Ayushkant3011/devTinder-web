import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const fetchRequest = async()=>{
        const dispatch = useDispatch()
        try{
            const res = await axios.get(
                BASE_URL + "/user/requests/received",
                {withCredentials: true}
            );

            dispatch(addRequests(res.data.data));
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        fetchRequest();
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default Requests
