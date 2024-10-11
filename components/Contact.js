import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';

const ContactUs = () => {
    const [, dark] = useOutletContext()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Form submitted:', formData);
    //     // Reset form
    //     setFormData({ name: '', email: '', message: '' });
    // };
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // Reset form
        setFormData({ name: '', email: '', message: '' });

        // After form submission, navigate to /contact/form
        navigate('feedback'); // Programmatically navigate to /contact/form
    };


    const isFormRoute = location.pathname === '/contact/feedback';

    return (
        <>
            {!isFormRoute && (
               <main className='contact-main'>  
                 <div className={`contact-us-container ${dark ? 'dark' : ''}`}>
                    <h1>Contact Us</h1>
                    <p style={{ textAlign: 'center' }}>If you have any questions or feedback, please reach out to us!</p>

                    <form onSubmit={handleSubmit}>
                        <div className='form'>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className='contact-button' type="submit">Submit</button>
                    </form>
                </div>

               </main>
            )}
            <Outlet />
            {/* Always render the outlet to allow for nested routes */}


        </>


    );
};

export default ContactUs;
