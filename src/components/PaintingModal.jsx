import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { urlFor } from '../sanityClient';
import PropTypes from 'prop-types';

const PaintingModal = ({ painting, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Focus management
    useEffect(() => {
        // Store the previously focused element
        previousActiveElement.current = document.activeElement;

        // Focus the modal
        if (modalRef.current) {
            modalRef.current.focus();
        }

        // Return focus on cleanup
        return () => {
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, []);

    if (!painting) return null;

    // Close on escape key and navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && hasNext) onNext();
        if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    return (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                background: 'var(--modal-overlay)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease'
            }}
        >
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
                    color: '#FAFAFA',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                onMouseOut={(e) => e.currentTarget.style.color = '#FAFAFA'}
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
                        background: 'var(--modal-btn-bg)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FAFAFA',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--accent-color)';
                        e.currentTarget.style.color = '#0A0A0A';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'var(--modal-btn-bg)';
                        e.currentTarget.style.color = '#FAFAFA';
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
                        background: 'var(--modal-btn-bg)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FAFAFA',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--accent-color)';
                        e.currentTarget.style.color = '#0A0A0A';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'var(--modal-btn-bg)';
                        e.currentTarget.style.color = '#FAFAFA';
                    }}
                >
                    <ArrowRight size={24} />
                </button>
            )}

            {/* Modal Content - Outer wrapper with transparency */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    animation: 'slideUp 0.4s ease',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
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

                {/* Details - with semi-transparent card */}
                <div style={{
                    width: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.01)',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.01)'
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
                    <h2 id="modal-title" className="text-serif" style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                        color: '#FAFAFA'
                    }}>
                        {painting.title}
                    </h2>

                    {painting.dimensions && (
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
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

                    <Link
                        to="/contact"
                        className="btn-primary"
                        style={{ textAlign: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Inquire About This Piece
                    </Link>
                </div>
            </div>
        </div>
    );
};

PaintingModal.propTypes = {
    painting: PropTypes.shape({
        title: PropTypes.string,
        category: PropTypes.string,
        image: PropTypes.object,
        dimensions: PropTypes.string,
        price: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired
};

export default PaintingModal;
