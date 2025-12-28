import PropTypes from 'prop-types';
import { urlFor } from '../sanityClient';

const PaintingCard = ({
    painting,
    onClick,
    imageHeight = '350px',
    className = ''
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`View ${painting.title}`}
            className={`glow-on-hover featured-card ${className}`}
            style={{
                overflow: 'hidden',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '12px',
                background: 'var(--bg-secondary)'
            }}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <div className="image-zoom" style={{ height: imageHeight }}>
                {painting.image && (
                    <img
                        src={urlFor(painting.image).width(700).height(500).url()}
                        alt={painting.title}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                )}
            </div>
            <div style={{
                padding: '1.5rem 2rem',
                marginTop: '-40px',
                position: 'relative',
                background: 'var(--card-glass-bg)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderTop: '1px solid var(--card-glass-border)',
                borderRadius: '12px 12px 0 0'
            }}>
                <h3 className="card-title" style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
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
    );
};

PaintingCard.propTypes = {
    painting: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
        image: PropTypes.object
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    imageHeight: PropTypes.string,
    className: PropTypes.string
};

export default PaintingCard;
