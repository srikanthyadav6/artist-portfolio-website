import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { Instagram, Twitter, Mail } from 'lucide-react';
import Spinner from '../components/ui/Spinner';

const About = () => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "artist"][0]')
            .then(data => {
                setArtist(data);
                setLoading(false);
            })
            .catch((err) => {
                if (import.meta.env.DEV) {
                    console.error('Failed to fetch artist:', err.message);
                }
                setError('Failed to load artist profile.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spinner size={40} />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="container"
                role="alert"
                style={{ padding: '10rem 0', textAlign: 'center' }}
            >
                <h2 className="text-serif" style={{ marginBottom: '1rem' }}>Unable to Load Profile</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error}</p>
                <button className="btn-primary" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No artist profile found.</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '6rem' }}>
            <section aria-label="About the artist" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '6rem',
                        alignItems: 'center'
                    }}>
                        {/* Image */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                right: '20px',
                                bottom: '20px',
                                border: '1px solid var(--accent-color)',
                                borderRadius: '8px',
                                opacity: 0.3
                            }} />
                            {artist.photo ? (
                                <img
                                    src={urlFor(artist.photo).width(600).height(800).url()}
                                    alt={artist.name}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                />
                            ) : (
                                <img
                                    src="https://placehold.co/600x800/1A1A1A/C4A777?text=Artist"
                                    alt="Artist"
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <p style={{
                                color: 'var(--accent-color)',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                marginBottom: '1rem'
                            }}>
                                The Artist
                            </p>
                            <h1 className="text-serif" style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                marginBottom: '1rem'
                            }}>
                                {artist.name}
                            </h1>

                            {/* Social Icons */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '2rem'
                            }}>
                                <a
                                    href={artist.instagram || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = 'var(--accent-color)';
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                >
                                    <Instagram size={20} />
                                </a>
                                <a
                                    href={artist.twitter || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = 'var(--accent-color)';
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href={`mailto:${artist.email || 'contact@example.com'}`}
                                    aria-label="Email"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = 'var(--accent-color)';
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                >
                                    <Mail size={20} />
                                </a>
                            </div>

                            <div style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.9,
                                fontSize: '1.05rem',
                                marginBottom: '2rem'
                            }}>
                                <PortableText value={artist.bio} />
                            </div>

                            {artist.quote && (
                                <blockquote style={{
                                    padding: '2rem',
                                    borderLeft: '2px solid var(--accent-color)',
                                    background: 'var(--bg-card)',
                                    borderRadius: '0 8px 8px 0',
                                    marginTop: '2rem'
                                }}>
                                    <p style={{
                                        fontStyle: 'italic',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        fontFamily: 'var(--font-serif)'
                                    }}>
                                        "{artist.quote}"
                                    </p>
                                </blockquote>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
