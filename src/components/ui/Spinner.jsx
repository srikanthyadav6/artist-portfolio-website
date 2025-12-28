import PropTypes from 'prop-types';

const Spinner = ({ size = 40, className = '' }) => {
    return (
        <div className={`spinner-container ${className}`} style={{ textAlign: 'center' }}>
            <div
                className="spinner"
                role="status"
                aria-label="Loading"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    border: '2px solid var(--border-color)',
                    borderTopColor: 'var(--accent-color)',
                    borderRadius: '50%',
                    margin: '0 auto',
                    animation: 'spin 1s linear infinite'
                }}
            />
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string
};

export default Spinner;
