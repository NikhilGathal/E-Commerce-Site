
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalLogin.css';

export default function ModalLogin({ islog, setislog  ,setusername}) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle Log In (Validate with localStorage)
    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
    
        // Check if stored user exists and credentials match
        if (
            storedUser &&
            storedUser.username === loginData.username &&
            storedUser.password === loginData.password
        ) {
            alert('Successfully logged in!');
            setusername(storedUser.username);
            localStorage.setItem('username', storedUser.username); // Store username in localStorage
            setislog(false);
        } else {
            alert('Login failed. Username or password is incorrect.');
        }
    
        setLoginData({
            username: '',
            password: ''
        });
    };
    return createPortal(
        <div onClick={() => setislog(false)} className={`modal-overlay-log ${islog ? '' : 'hidden'}`}>
            <div onClick={(e) => e.stopPropagation()} className="modal-box-log">
                <div className="modal-heading">LogIn</div>
                <div className="modal-form">
                    <input
                        placeholder="Username"
                        className="modal-input"
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        className="modal-input"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={() => setislog(false)} className="cancel-button">Cancel</button>
                    <button onClick={handleLogin} className="login-button">LogIn</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}
