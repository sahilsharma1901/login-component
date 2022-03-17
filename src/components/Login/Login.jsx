import React, {useState} from 'react';
import styles from './Login.module.css';

let regexForSpecialCharacters = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
let regexForOnlyNumbers = /^[0-9]*$/;

const Login = ({setLogin}) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        username: '',
        password: ''
    });

    const handleUsername = (username) => {
        setUser({
            ...user,
            username
        })
    }

    const handlePassword = (password) => {
        setUser({
            ...user,
            password
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(user.username && user.username.length > 8){
            setErrorMessages({
                ...errorMessages,
                username: 'Invalid username'
            });
            return;
        }
        if(user.password && user.password.length > 12){
            setErrorMessages({
                ...errorMessages,
                password: 'Invalid password'
            });
            return;
        }
        
        let usernameInPassword = user.password.slice(0, user.username.length);
        let specialCharInPassword = user.password.slice(user.username.length)[0];
        let numbersInPassword = user.password.slice(user.username.length + 1);

        //password should contain username as a start, followed by one special character and 3 numbers
        if(usernameInPassword === user.username && regexForSpecialCharacters.test(specialCharInPassword) && numbersInPassword.length === 3 && regexForOnlyNumbers.test(numbersInPassword)){
            setErrorMessages({
                uname: '',
                password: ''
            });
            setLogin();
        } else {
            setErrorMessages({
                ...errorMessages,
                password: 'Invalid password'
            });
            return;
        }

    }

  return (
    <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h1 className={styles.loginHeading}>Login</h1>
            <div className={styles.inputContainer}>
                <label htmlFor='username' className={styles.inputLabel}>Username</label>
                <input type="text" name="username" value={user.username} onChange={(event) => handleUsername(event.target.value)} id="username" className={styles.input}/>
                <p className={errorMessages.username ? `${styles.errorMessage} ${styles.show}` : styles.errorMessage}>{errorMessages.username}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor='password' className={styles.inputLabel}>Password</label>
                <input type="password" name="password" value={user.password} onChange={(event) => handlePassword(event.target.value)} id="password" className={styles.input}/>
                <p className={errorMessages.password ? `${styles.errorMessage} ${styles.show}` : styles.errorMessage}>{errorMessages.password}</p>
            </div>
            <button type="submit" className={styles.submit}>Login</button>
        </form>
    </div>
  );
}

export default Login;