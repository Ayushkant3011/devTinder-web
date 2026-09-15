import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
    const {targetUserId} = useParams();
    console.log(targetUserId);
    return (
        <div className='w-1/2 mx-auto border-4 border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className="text-3xl font-extrabold border-b">
            Chat
            </h1>

            <div className='flex-1 overflow-scroll p-5'>{/*Display messages */}</div>

            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input className='flex-1 border border-gray-500 rounded p-2'/>
                <button className='btn btn-primary'> Send </button>
            </div>
        </div>
    );
};

export default Chat
