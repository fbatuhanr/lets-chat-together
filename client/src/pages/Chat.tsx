import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'

import io from 'socket.io-client';
import Message from '../components/Message';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

const socket = io('http://localhost:3001');

const Chat = () => {

  const user = useAppSelector((state) => state.user)

  const [users, setUsers] = useState<Array<any>>([])

  useEffect(() => {

    axios.get(`${process.env.USER_API_URL}`)
      .then((response) => {
        console.log(response)

        const result = response.data.filter((i: any) => i._id != user.id)
        setUsers(result)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  const [messages, setMessages] = useState<Array<any>>([]);
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('sendMessage', { text: messageText });
    setMessageText("");
  };

  return (

    <div className="py-8 flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
      <div>
        <h1 className="text-5xl font-bold">Chat</h1>
      </div>
      <div className="flex w-full max-w-3xl min-h-[400px] rounded-xl bg-gradient-to-br from-[#0D0D0D] to-[#472DA6] border-[#472DA6] border-2">

        <div className="basis-3/4 p-12">

          <div className="border-2 border-[#6841F2] w-full h-full rounded-  xl">
            {messages.map((message, index) => (
              <Message key={index} username={user.username} text={message.text} />
            ))}
          </div>
          <div className="border-2 border-[#6841F2]">
            <input
              type="text"
              value={messageText}
              className="text-black"
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="bg-teal-500">Send</button>
          </div>

        </div>
        <div className="basis-1/4 bg-[#472DA6] py-4">

          <h3 className="text-3xl font-bold text-center">Users</h3>
          <div className="mt-2 text-slate-800 font-medium">

            {
              users.map((user: any) =>
                <div className="bg-[#BCA9FF] flex items-center cursor-pointer gap-x-2 ps-4 mt-1">
                  <FaUserCircle />
                  <span>{user.username}</span>
                </div>
              )
            }

          </div>

        </div>

      </div>
    </div>
  )
}

export default Chat