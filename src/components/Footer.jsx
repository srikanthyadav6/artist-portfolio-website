import { useSiteSettings } from '../context/SiteSettingsContext';

const Footer = () => {
    const { siteName } = useSiteSettings();

    return (
        <footer style={{
            padding: '3rem 0',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.05em'
                    }}>
                        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
