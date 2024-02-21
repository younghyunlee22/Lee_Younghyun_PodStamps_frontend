import { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:8000'
// Form component
const QuickSaveForm = () => {
    // State variables to store form data
    const [formData, setFormData] = useState({
        username: '',
        link: '',
        tags: '',
        description: '',
    });

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request using Axios
            await axios.post(`${BASE_URL}/api/quicksave`, formData);
            // Clear form after successful submission
            setFormData({
                username: '',
                link: '',
                tags: '',
                description: '',
            });
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="link">Link:</label>
                <input
                    type="text"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="tags">Tags:</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <button className="btn" type="submit">Submit</button>
        </form>
    );
};

export default QuickSaveForm;