import { useState, useEffect, useCallback } from 'react';
import { client, urlFor } from '../sanityClient';
import PaintingModal from '../components/PaintingModal';

const Gallery = () => {
    const [paintings, setPaintings] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "painting"]')
            .then(data => {
                setPaintings(data);
                setLoading(false);
            })
            .catch(console.error);
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
                {/* Skeleton Loader */}
                <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
                    <div style={{
                        height: '60px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem'
                    }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                height: '300px',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '12px',
                                animation: 'pulse 1.5s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`
                            }} />
                        ))}
                    </div>
                </div>
                <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
        `}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            {/* Header */}
            <section style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
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
            <section style={{ padding: '2rem 0 6rem' }}>
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
                                    className="gallery-item"
                                    onClick={() => handleOpenModal(index)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleOpenModal(index)}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        aspectRatio: '4/5',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-color)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {painting.image && (
                                        <img
                                            src={urlFor(painting.image).width(700).height(875).url()}
                                            alt={painting.title}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                            className="gallery-img"
                                        />
                                    )}
                                    {/* Overlay */}
                                    <div
                                        className="overlay"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                                            opacity: 0,
                                            transition: 'opacity 0.4s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            padding: '2rem'
                                        }}
                                    >
                                        <p style={{
                                            color: 'var(--accent-color)',
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {painting.category}
                                        </p>
                                        <h3 className="text-serif" style={{
                                            fontSize: '1.5rem',
                                            color: '#fff',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {painting.title}
                                        </h3>
                                        {painting.price && (
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                                {painting.price}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal */}
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

            <style>{`
        .gallery-item:hover .gallery-img,
        .gallery-item:focus .gallery-img {
          transform: scale(1.1);
        }
        .gallery-item:hover .overlay,
        .gallery-item:focus .overlay {
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default Gallery;
