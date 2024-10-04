

import React from 'react'
import { createPortal } from 'react-dom'
import './ModalSign.css'

export default function ModalSign({ issign, setissign }) {
    return createPortal(
        <div
            onClick={() => setissign(false)}
            className={`modal-overlay ${issign ? '' : 'hidden'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="modal-box"
            >
                <div className="modal-heading">Sign In</div>
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
                    <input
                        placeholder="Phone no"
                        className="modal-input"
                        type="text"
                    />
                    <input
                        placeholder="Email"
                        className="modal-input"
                        type="email"
                    />
                    <textarea
                        placeholder="Address"
                        className="modal-input"
                    />
                </div>
                <div className="modal-buttons">
                    <button
                        onClick={() => setissign(false)}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setissign(false)}
                        className="signin-button"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}




