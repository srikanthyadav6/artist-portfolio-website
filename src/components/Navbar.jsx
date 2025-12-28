import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { client } from '../sanityClient';
import '../index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [siteName, setSiteName] = useState('ELARA VANCE');
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        client.fetch('*[_type == "siteSettings"][0]')
            .then(data => {
                if (data?.siteName) setSiteName(data.siteName);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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
                borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
                transition: 'all var(--transition-medium)',
                background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent'
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

                {/* Mobile Menu Icon */}
                <div
                    className="mobile-menu-icon"
                    onClick={toggleMenu}
                    style={{
                        cursor: 'pointer',
                        display: 'none',
                        color: 'var(--text-primary)'
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="mobile-menu"
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
                </div>
            )}

            <style>{`
        .desktop-menu a:hover span {
          width: 100% !important;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
