

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalSign.css';

export default function ModalSign({ issign, setissign }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        phone: '',
        email: '',
        address: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle Sign In (Save to localStorage)
    const handleSignIn = () => {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        alert('Sign Up successful! Please proceed to login.');
        setissign(false);
    };

    return createPortal(
        <div onClick={() => setissign(false)} className={`modal-overlay ${issign ? '' : 'hidden'}`}>
            <div onClick={(e) => e.stopPropagation()} className="modal-box">
                <div className="modal-heading">Sign In</div>
                <div className="modal-form">
                    <input
                        placeholder="Username"
                        className="modal-input"
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        className="modal-input"
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Phone no"
                        className="modal-input"
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Email"
                        className="modal-input"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <textarea
                        placeholder="Address"
                        className="modal-input"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={() => setissign(false)} className="cancel-button">Cancel</button>
                    <button onClick={handleSignIn} className="signin-button">Sign In</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}




