import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";
import NavBar from "../NavBar/NavBar";

const url = "https://orbital-nusrate.onrender.com";
const socket = io(url);
const Chat = () => {
    const { chatCode } = useParams();
    console.log(chatCode);
    const [text, setText] = useState("");
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const endRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add("chat-page");
        return () => {
          document.body.classList.remove("chat-page");
        };
    }, []);
    
    useEffect(async () => {
        const user = await JSON.parse(localStorage.getItem("loginInfo"));
        setCurrentUser(user);
        if (!user) {
          navigate("/login");
        }
    }, [navigate]);

    const fetchChat = async () => {
        try {
          const token = JSON.parse(localStorage.getItem("loginInfo")).loginToken;
          const response = await axios.get(`${url}/api/chats/?chatCode=${chatCode}`, {
            headers: { 'x-access-token': token },
          });
          setChat(response.data);
          setMessages(response.data.messages);
    
        } catch (err) {
          console.error('Error fetching chat', err);
        }
    };
    
    useEffect(() => {
        if (chatCode) {
          socket.emit('join', chatCode);
          fetchChat();
        }
    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          socket.emit('updateChatList');
        });
        return () => {
          socket.off('message');
        };
    }, [messages]);

    const handleSendMessage = async () => {
        if (text.trim() === "") return;
    
        try {
            const token = JSON.parse(localStorage.getItem("loginInfo")).loginToken;
            const response = await axios.post(
                `${url}/api/messages`,
                {
                    text,
                    sender: currentUser.userID,
                    chatId: chat._id,
                },
                {
                    headers: { 'x-access-token': token },
                }
          );
          const message = response.data;
          socket.emit('sendMessage', { chatId: chat._id, message });
          setText("");
        } catch (err) {
          console.error("Failed to send message:", err);
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    const handleEnter = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSendMessage();
        }
    };

    const renderMessages = (messages) => (
        messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender._id === currentUser?.userID ? "own" : ""}`}>
            <div className="texts">
              <span className="sender-name">{msg.sender.username}</span>
              <p>{msg.text}</p>
              <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))
    );

    return (
        <div className="chat custom-chat-background">
          <NavBar/>
          <div className="top">
            <div className="user">
              <div className="texts">
                <span className="chat-code">{chat?.chatCode}</span>
              </div>
            </div>
          </div>
          <div className="mid">
            {renderMessages(messages)}
            <div ref={endRef}></div>
          </div>
          <div className="bot">
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleEnter}
            />
            <button className="sendButton" onClick={handleSendMessage}>Send</button>
          </div>
    
        </div>
    );
};

export default Chat;