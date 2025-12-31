import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { DEFAULTS } from '../constants';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { siteName } = useSiteSettings();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > DEFAULTS.SCROLL_THRESHOLD);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={scrolled ? 'navbar-blur' : ''}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1.5rem 0',
                transition: 'all var(--transition-medium)',
            }}
        >
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link
                    to="/"
                    className="text-serif"
                    style={{
                        fontSize: '1.3rem',
                        letterSpacing: '0.15em',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        transition: 'color var(--transition-fast)'
                    }}
                >
                    {siteName}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '3rem' }}>
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    position: 'relative',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    color: location.pathname === link.path ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    transition: 'color var(--transition-fast)',
                                    paddingBottom: '4px'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = location.pathname === link.path
                                        ? 'var(--accent-color)'
                                        : 'var(--text-secondary)';
                                }}
                            >
                                {link.name}
                                {/* Animated underline */}
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: location.pathname === link.path ? '100%' : '0%',
                                    height: '1px',
                                    background: 'var(--accent-color)',
                                    transition: 'width var(--transition-medium)'
                                }} />
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggle (Desktop) */}
                    <div className="desktop-menu">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="mobile-menu-icon"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    style={{
                        cursor: 'pointer',
                        display: 'none',
                        color: 'var(--text-primary)',
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem'
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <nav
                    id="mobile-menu"
                    className="mobile-menu"
                    aria-label="Mobile navigation"
                    style={{
                        position: 'fixed',
                        top: '70px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'var(--bg-primary)',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        zIndex: 999
                    }}
                >
                    <ThemeToggle />
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '1.5rem',
                                fontFamily: 'var(--font-serif)',
                                color: location.pathname === link.path ? 'var(--accent-color)' : 'var(--text-primary)',
                                transition: 'color var(--transition-fast)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            )}
        </nav>
    );
};

export default Navbar;
