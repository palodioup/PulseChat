import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function AddContact() {
  const [email, setEmail] = useState('');
  const { addContact, allContacts } = useChatStore();
  const socket = useAuthStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    socket.on('contact_added_successfully', (userData) => {
      addContact(userData);
      toast.success(`Added ${userData.fullName}`);
    });

    socket.on('error_message', (msg) => toast.error(msg));

    return () => {
      socket.off('contact_added_successfully');
      socket.off('error_message');
    };
  }, [socket, addContact]);

  const handleAdd = () => {
  console.log("Add button clicked. Socket connected:", socket?.connected);
  
  if (!socket || !socket.connected) {
    return toast.error("Wait for connection...");
  }

  if (email.includes("@")) {
    // Send the request
    socket.emit("send_friend_request", email.trim().toLowerCase());
    setEmail("");
  } else {
    toast.error("Invalid email");
  }
};

  return (
    <div className="p-4">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Friend's email"
        className="border p-2 rounded mr-2"
      />
      <button onClick={handleAdd} className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-300">
        Add by Email
      </button>

      <ul className="mt-4">
        {allContacts.map(user => (
          <li key={user._id} className="border-b py-2">{user.fullName} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
