import { useState, useEffect } from "react";

interface ChatProps {
    userId: number;
    otherUserId: number;
}

export function Chat({ userId, otherUserId }: ChatProps) {
    interface Message {
        sender_id: number;
        receiver_id: number;
        message: string;
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/messages/${userId}/${otherUserId}`)
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error("Error fetching messages:", error));
    }, [userId, otherUserId]);

    const sendMessage = async () => {
        const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: userId, receiverId: otherUserId, message: newMessage }),
        });
        if (response.ok) {
            setMessages((prev) => [...prev, { sender_id: userId, receiver_id: otherUserId, message: newMessage }]);
            setNewMessage("");
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, idx) => (
                    <p key={idx} className={msg.sender_id === userId ? "text-right" : "text-left"}>
                        {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
