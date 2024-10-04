
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import './ItemDetail.css';
const ItemDetail = () => {
    const { itemId } = useParams(); // Get the itemId from the URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dark] = useOutletContext()
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
                // Check if the response is ok (status 200-299)
                if (!response.ok) {
                    throw new Error(`Failed to fetch item. Status: `);
                }
                // Ensure the response has content before parsing
                const data = await response.json();
                if (!data) {
                    throw new Error('No data received');
                }
                setItem(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);
    if (loading) return <div className='error-msg'>Loading...</div>;
    if (error) return <div className='error-msg' > Error : Product Not Found</div>;
    return (
        <div className={`item-detail-container ${ dark ? 'dark' : ''}`}>
            <div className="item-image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-info">
                <h1>{item.title}</h1>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-category">Category: {item.category}</p>
                <div className="item-rating">
                    <span>Rating: {item.rating.rate} / 5 ({item.rating.count} reviews)</span>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;

