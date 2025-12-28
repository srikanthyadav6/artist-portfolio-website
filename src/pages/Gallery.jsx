import { useState, useEffect, useCallback } from 'react';
import { client, urlFor } from '../sanityClient';
import PaintingModal from '../components/PaintingModal';
import Spinner from '../components/ui/Spinner';

const Gallery = () => {
    const [paintings, setPaintings] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "painting"]')
            .then(data => {
                setPaintings(data);
                setLoading(false);
            })
            .catch((err) => {
                if (import.meta.env.DEV) {
                    console.error('Failed to fetch paintings:', err.message);
                }
                setError('Failed to load gallery. Please try again.');
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...new Set(paintings.map(p => p.category).filter(Boolean))];

    const filteredPaintings = filter === 'All'
        ? paintings
        : paintings.filter(p => p.category === filter);

    const handleOpenModal = useCallback((index) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedIndex(null);
        document.body.style.overflow = '';
    }, []);

    const handleNext = useCallback(() => {
        if (selectedIndex < filteredPaintings.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    }, [selectedIndex, filteredPaintings.length]);

    const handlePrev = useCallback(() => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    }, [selectedIndex]);

    if (loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <h2 className="text-serif" style={{ marginBottom: '1rem' }}>Unable to Load Gallery</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error}</p>
                <button className="btn-primary" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            {/* Header */}
            <section aria-label="Gallery header" style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
                <div className="container">
                    <p style={{
                        color: 'var(--accent-color)',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        marginBottom: '1rem'
                    }}>
                        Collection
                    </p>
                    <h1 className="text-serif" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        marginBottom: '1rem'
                    }}>
                        The Gallery
                    </h1>
                    <p style={{
                        color: 'var(--text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        A curated collection of original oil paintings, each telling its own story.
                    </p>
                    <div className="divider" />

                    {/* Filters */}
                    <div
                        role="tablist"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            marginTop: '2rem'
                        }}
                    >
                        {categories.map(cat => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={filter === cat}
                                tabIndex={0}
                                onClick={() => setFilter(cat)}
                                onKeyDown={(e) => e.key === 'Enter' && setFilter(cat)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    color: filter === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                    background: filter === cat ? 'var(--accent-color)' : 'transparent',
                                    border: `1px solid ${filter === cat ? 'var(--accent-color)' : 'var(--border-color)'}`,
                                    borderRadius: '4px',
                                    transition: 'all var(--transition-fast)',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-glow)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section aria-label="Artwork gallery" style={{ padding: '2rem 0 6rem' }}>
                <div className="container">
                    {filteredPaintings.length === 0 ? (
                        /* Empty State */
                        <div style={{
                            textAlign: 'center',
                            padding: '6rem 2rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '12px'
                        }}>
                            <p style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '1.5rem'
                            }}>
                                No paintings found in <strong>"{filter}"</strong> category.
                            </p>
                            <button
                                onClick={() => setFilter('All')}
                                className="btn-primary"
                            >
                                View All Works
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '2rem'
                        }}>
                            {filteredPaintings.map((painting, index) => (
                                <div
                                    key={painting._id}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${painting.title}`}
                                    className="gallery-item glass-card glow-on-hover"
                                    onClick={() => handleOpenModal(index)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleOpenModal(index)}
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        transition: 'transform var(--transition-medium)'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-color)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div className="image-zoom" style={{ height: '350px' }}>
                                        {painting.image && (
                                            <img
                                                src={urlFor(painting.image).width(700).height(875).url()}
                                                alt={painting.title}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                className="gallery-img"
                                            />
                                        )}
                                    </div>
                                    {/* Title section below image */}
                                    <div style={{ padding: '1.5rem 2rem' }}>
                                        <h3 style={{
                                            fontSize: '1.4rem',
                                            marginBottom: '0.5rem',
                                            fontWeight: 500,
                                            color: 'var(--text-primary)'
                                        }}>
                                            {painting.title}
                                        </h3>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontSize: '0.85rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}>
                                            {painting.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {selectedIndex !== null && (
                <PaintingModal
                    painting={filteredPaintings[selectedIndex]}
                    onClose={handleCloseModal}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    hasNext={selectedIndex < filteredPaintings.length - 1}
                    hasPrev={selectedIndex > 0}
                />
            )}
        </div>
    );
};

export default Gallery;
