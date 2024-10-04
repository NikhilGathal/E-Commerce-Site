
import React from 'react'
import { createPortal } from 'react-dom'
import './ModalLogin.css'

export default function ModalLogin({islog, setislog}) {
    return ( 
        createPortal(
            <div 
                onClick={() => setislog(false)} 
                className={`modal-overlay-log ${islog ? '' : 'hidden '}`}
            >
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="modal-box-log"
                >
                    <div className="modal-heading">LogIn</div>
                    <div className="modal-form">
                        <input
                            placeholder="Username"
                            className="modal-input"
                            type="text"
                        />
                        <input
                            placeholder="Password"
                            className="modal-input"
                            type="password"
                        />
                    </div>
                    <div className="modal-buttons">
                        <button 
                            onClick={() => setislog(false)} 
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => setislog(false)} 
                            className="login-button"
                        >
                            LogIn
                        </button>
                    </div>
                </div>
            </div>, 
            document.getElementById('portal')
        )
    )
}
