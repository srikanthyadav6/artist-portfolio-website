import { useState, useEffect } from 'react';
import { client } from '../sanityClient';

const Footer = () => {
    const [siteName, setSiteName] = useState('Elara Vance');

    useEffect(() => {
        client.fetch('*[_type == "siteSettings"][0]')
            .then(data => {
                if (data?.siteName) setSiteName(data.siteName);
            })
            .catch((err) => {
                if (import.meta.env.DEV) {
                    console.error('Failed to fetch site settings:', err.message);
                }
            });
    }, []);

    return (
        <footer style={{
            padding: '3rem 0',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.05em'
                    }}>
                        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
