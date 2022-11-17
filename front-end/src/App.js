import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // const [name, setName] = useState("");
  // const [problem, setProblem] = useState("");

  const fetchTickets = async() => {
    try {      
      const response = await axios.get("/api/events");
      setTickets(response.data);
    } catch(error) {
      setError("error retrieving tickets: " + error);
    }
  }
  const createTicket = async() => {
    try {
      await axios.post("/api/events", {text: text, start: start, end: end});
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  // const deleteOneTicket = async(ticket) => {
  //   try {
  //     await axios.delete("/api/tickets/" + ticket.id);
  //   } catch(error) {
  //     setError("error deleting a ticket" + error);
  //   }
  // }

  // fetch ticket data
  useEffect(() => {
    fetchTickets();
  },[]);

  const addTicket = async(e) => {
    e.preventDefault();
    await createTicket();
    fetchTickets();
    setText("");
    setStart("");
    setEnd("");
  }

  // const deleteTicket = async(ticket) => {
  //   await deleteOneTicket(ticket);
  //   fetchTickets();
  // }

  // render results
  return (
    <div className="App">
      {error}
      <h1>Create a Ticket</h1>
      <form onSubmit={addTicket}>
        <div>
          <label>
            Name:
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Start:
            <textarea value={start} onChange={e=>setStart(e.target.value)}></textarea>
            End:
            <textarea value={start} onChange={e=>setStart(e.target.value)}></textarea>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Tickets</h1>
      {tickets.map( ticket => (
        <div key={ticket.id} className="ticket">
          <div className="problem">
            <p>{ticket.text}</p>
            <p>{ticket.start}</p>
            <p>{ticket.end}</p>
          </div>
          {/* <button onClick={e => deleteTicket(ticket)}>Delete</button> */}
        </div>
      ))}     
    </div>
  );
}

export default App;
