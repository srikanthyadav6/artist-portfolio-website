import { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <Check size={20} />,
        error: <AlertCircle size={20} />
    };

    const colors = {
        success: 'var(--accent-color)',
        error: '#E57373'
    };

    return (
        <div
            role="alert"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                background: 'var(--bg-tertiary)',
                border: `1px solid ${colors[type]}`,
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                color: 'var(--text-primary)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease'
            }}
        >
            <span style={{ color: colors[type] }}>{icons[type]}</span>
            <span style={{ fontSize: '0.9rem' }}>{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    marginLeft: '0.5rem'
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
