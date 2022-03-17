import React, {useState} from 'react';
import styles from './App.module.css';
import Login from "./components/Login/Login";

function App() {

  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  }
  
  return (
    <div className={styles.mainContainer}>
      {!login ? <Login setLogin={handleLogin}/> : <h1>Login Successful</h1>}
    </div>
  );
}

export default App;
