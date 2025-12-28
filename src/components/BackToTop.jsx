import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1500,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--accent-color)',
                border: 'none',
                color: 'var(--bg-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(196, 167, 119, 0.4)',
                transition: 'all var(--transition-fast)',
                opacity: 0.9
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <ArrowUp size={22} />
        </button>
    );
};

export default BackToTop;
