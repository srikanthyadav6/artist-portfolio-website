import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';

const About = () => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.fetch('*[_type == "artist"][0]')
            .then(data => {
                setArtist(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) {
        return (
            <div style={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid var(--border-color)',
                    borderTopColor: 'var(--accent-color)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
            <section style={{ padding: '4rem 0' }}>
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
                                marginBottom: '2rem'
                            }}>
                                {artist.name}
                            </h1>

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
