import { useState, useEffect } from 'react';
import { client } from '../sanityClient';

const Footer = () => {
    const [settings, setSettings] = useState({ siteName: 'Elara Vance', socialLinks: [] });

    useEffect(() => {
        client.fetch('*[_type == "siteSettings"][0]')
            .then(data => {
                if (data) setSettings(data);
            })
            .catch(console.error);
    }, []);

    return (
        <footer style={{
            padding: '5rem 0',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    {/* Logo/Name */}
                    <div>
                        <p className="text-serif" style={{
                            fontSize: '1.2rem',
                            letterSpacing: '0.1em',
                            marginBottom: '0.5rem'
                        }}>
                            {settings.siteName}
                        </p>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem'
                        }}>
                            Fine Art & Oil Paintings
                        </p>
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {settings.socialLinks && settings.socialLinks.length > 0 ? (
                            settings.socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        transition: 'color var(--transition-fast)'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    {link.platform}
                                </a>
                            ))
                        ) : (
                            <>
                                <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Instagram</a>
                                <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Twitter</a>
                            </>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    marginTop: '3rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border-color)',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em'
                    }}>
                        &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
