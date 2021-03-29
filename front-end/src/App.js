import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect , useState} from 'react';
import Pusher from "pusher-js"
import axios from "./axios"
import Login from './Login';

function App() {

  const [messages, setmessages] = useState([])
  const [user, setuser] = useState("")

  useEffect(()=>{
    axios.get("/messages/sync")
      .then(res => {
        console.log(res.data);
        setmessages(res.data)
      })
  }, []) 

  useEffect(()=>{
    const pusher = new Pusher('81548ec2bc6346f1b1d2', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=>{
      setmessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messages])

  console.log(messages);

  return (
    <div className="app">
      {/* {!user ? (
        <Login setuser={setuser} />
      )
      :
      ( */}
      <div className="app__body">
        <Sidebar />
        <Chat user={user} messages={messages}/>
      </div>
      {/* )} */}
    </div>
  );
}

export default App;
