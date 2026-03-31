import React, { useState,useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUserName, setTargetUserName] = useState("");
  
  const {targetUserId} = useParams();
  const user = useSelector((store)=> store.user)
  const userId = user?._id;

  const fetchTargetUser = async ()=>{

    const res = await axios.get(BASE_URL+"/profile/"+targetUserId,{withCredentials:true});
    setTargetUserName(res.data.data.firstName);
    
  }

  const fetchChatMessage = async ()=>{

    const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true});
    console.log(chat);
    
    const chatMessage = chat?.data?.message?.map((msg)=>{
      return {
        firstName : msg?.senderId?.firstName,
        text : msg?.text
      }
    });

    setMessage(chatMessage)
    
  }

  useEffect(()=>{
    fetchChatMessage()
    fetchTargetUser()
  },[])

  useEffect(()=>{

    const socket = createSocketConnection();
    socket.emit("joinChat",{
      firstName:user?.firstName, 
      userId,
      targetUserId
    });

    socket.on("messageRecived",({firstName,text})=>{

      setMessage((message)=>[...message,{firstName,text}]);
      setNewMessage("");
    })

    return ()=>{
      socket.disconnect();
    }

  },[userId,targetUserId])

  const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      console.log("calling");
      
      sendMessage();
    }
  }

  const sendMessage = ()=>{

    const socket = createSocketConnection();
    socket.emit("sendMsg",{
      firstName:user?.firstName, 
      userId,
      targetUserId,
      text : newMessage
    })
  }

  return (
    <div className="flex flex-col  border rounded-sm h-120 w-160 mx-auto">
      <h1 className="border-b p-2">{"Chat with " +"- "+ targetUserName}</h1>

      <div className="flex-1 overflow-y-scroll">
        {message.map((msg, index) => {
          return (
            <>
              <div key={index} 
              className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
              
            </>
          );
        })}
      </div>

      <div className="flex p-2 gap-5 border-t items-center">
        <input
        value={newMessage}
        onChange={(e)=> setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
          className="border flex-1 border-white rounded-sm p-1 px-2"
          placeholder="Enter Something..."
        />
        <button onClick={sendMessage}  className="btn btn-secondary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
