import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;


    useEffect(() =>{
        if(!userId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId, 
            targetUserId,
        });

        socket.on("MessageReceived", ({ firstName, text, photoUrl}) =>{
            console.log(firstName + " :  " + text);
            setMessages((messages) =>[...messages, { firstName, text, photoUrl }]);
        });

        return () =>{
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () =>{
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName, 
            userId, 
            targetUserId, 
            text:newMessage,
            photoUrl: user.photoUrl
        });
        setNewMessage("");
    };

    return (
        <div className='w-1/2 mx-auto border-4 border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className="text-3xl font-extrabold border-b">
            Chat
            </h1>

            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) =>{
                    return (
                        <div key={index} className="chat chat-start ">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={msg.photoUrl}
                            />
                            </div>
                        </div>
                        <div className="chat-header">
                            {msg.firstName}
                            <time className="text-xs opacity-50">12:45</time>
                        </div>
                        <div className="chat-bubble bg-primary">{msg.text}</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    );
                })}
            </div>

            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} 
                    className='flex-1 border border-gray-500 rounded p-2'/>
                <button
                    onClick={sendMessage}
                    className='btn btn-primary'> 
                    Send 
                </button>
            </div>
        </div>
    );
};

export default Chat
