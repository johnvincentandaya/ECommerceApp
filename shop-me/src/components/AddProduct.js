import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stocks, setStocks] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if all fields are filled
        if (!name || !price || !stocks) {
            setError('All fields must be filled out.');
            return; // Prevent form submission if fields are missing
        }

        const newProduct = { name, price, stocks };

        axios.post('http://localhost:8000/api/products', newProduct)
            .then(response => {
                console.log('Product added:', response.data);
                setName('');
                setPrice('');
                setStocks('');
                setError('');
                navigate('/'); // Redirect to product list after successful submission
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError('An error occurred while adding the product. Please try again.');
            });
    };

    return (
        <Container>
            <h1><center>Add Product</center></h1>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>} {/* Display error message */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter product name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group controlId="formStocks" className="mt-3">
                    <Form.Label>Stocks</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter number of stocks" 
                        value={stocks} 
                        onChange={(e) => setStocks(e.target.value)} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Add Product
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;
