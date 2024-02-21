
import { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyPlayer from './SpotifyPlayer';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:8000'
const EmbedLinks = () => {
    const [embedLinks, setEmbedLinks] = useState([]);

    useEffect(() => {
        const fetchEmbedLinks = async () => {
            try {
                // Make GET request to fetch embed links from backend
                const response = await axios.get(`${BASE_URL}/api/quicksave`);
                const { embedLinks } = response.data;

                // Set the embedLinks state with the received data
                setEmbedLinks(embedLinks);
            } catch (error) {
                console.error('Error fetching embed links:', error);
            }
        };

        // Call the fetchEmbedLinks function when the component mounts
        fetchEmbedLinks();
    }, []);

    return (
        <div>
            <h2>Embed Links</h2>
            {embedLinks.map((link, index) => (
                <SpotifyPlayer key={index} link={link} />
            ))}
        </div>
    );
};

export default EmbedLinks;
