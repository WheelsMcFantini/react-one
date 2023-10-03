import React, { useState, useEffect } from 'react';

const App = () => {
    // State to hold the text input value
    const [text, setText] = useState('');
    const token = localStorage.getItem('access_token');
    // Simulated fetching of saved text from a database on component mount
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/message', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }) // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setText(data.message));
    }, [token]);

    // Handler for the button click
    const handleSave = () => {
        console.log(text)
        // Sending the text to a database (simulated with a placeholder URL)
        fetch('http://127.0.0.1:5000/api/message', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log(data.message);
            });
    };


    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                cols="50"
            />
            <button onClick={handleSave}>Save Text</button>
        </div>
    );
};

export default App;
