import { useEffect, useRef, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const isDomCleaned = useRef(false);

  useEffect(() => {
    fetch("/api/values")
      .then((value) => {
        console.log({value})
        if(!isDomCleaned){
          setLists(value);
        }
      })

    return () => {
      isDomCleaned = true;
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.value;
    fetch("/api/value",{
      method: "POST",
      body: {
        value,
      }
    })
    .then((response) => {
      // return response.json()
      // setLists(prev => [...prev, response]);
    })
    .then(json => {
      console.log({json})
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="list_input" placeholder="입력해주세요..."/>
          <button type="submit">입력</button>
        </form>
        <ul>
        {
          lists.map((list,idx) => <li key={`$::${idx}${list}`}>{list}</li>)
        }
        </ul>
      </header>
    </div>
  );
}

export default App;
