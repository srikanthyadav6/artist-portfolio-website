import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { urlFor } from '../sanityClient';

const PaintingModal = ({ painting, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    if (!painting) return null;

    // Close on escape key
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && hasNext) onNext();
        if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                background: 'rgba(0, 0, 0, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease'
            }}
        >
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* Close Button */}
            <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
                <X size={28} />
            </button>

            {/* Navigation Arrows */}
            {hasPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Previous painting"
                    style={{
                        position: 'absolute',
                        left: '2rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--accent-color)';
                        e.currentTarget.style.color = 'var(--bg-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            {hasNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Next painting"
                    style={{
                        position: 'absolute',
                        right: '2rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--accent-color)';
                        e.currentTarget.style.color = 'var(--bg-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                >
                    <ArrowRight size={24} />
                </button>
            )}

            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    display: 'flex',
                    gap: '3rem',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    animation: 'slideUp 0.4s ease'
                }}
            >
                {/* Image */}
                <div style={{ flex: 1, maxHeight: '80vh' }}>
                    {painting.image && (
                        <img
                            src={urlFor(painting.image).width(1200).quality(90).url()}
                            alt={painting.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                            }}
                        />
                    )}
                </div>

                {/* Details */}
                <div style={{
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <p style={{
                        color: 'var(--accent-color)',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '0.75rem'
                    }}>
                        {painting.category}
                    </p>
                    <h2 className="text-serif" style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        lineHeight: 1.2
                    }}>
                        {painting.title}
                    </h2>

                    {painting.dimensions && (
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                        }}>
                            {painting.dimensions}
                        </p>
                    )}

                    {painting.price && (
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--accent-color)',
                            marginBottom: '2rem'
                        }}>
                            {painting.price}
                        </p>
                    )}

                    <a
                        href="/contact"
                        className="btn-primary"
                        style={{ textAlign: 'center' }}
                    >
                        Inquire About This Piece
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaintingModal;
