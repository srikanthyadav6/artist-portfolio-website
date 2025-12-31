import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../sanityClient';
import { DEFAULTS } from '../constants';

const SiteSettingsContext = createContext({
    siteName: DEFAULTS.SITE_NAME,
    loading: true,
    error: null,
});

export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider = ({ children }) => {
    const [siteName, setSiteName] = useState(DEFAULTS.SITE_NAME);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await client.fetch('*[_type == "siteSettings"][0]{ siteName, socialLinks }');

                if (data?.siteName) {
                    setSiteName(data.siteName);
                    document.title = `${data.siteName} | Fine Art Portfolio`;
                }
            } catch (err) {
                console.error('Failed to fetch site settings:', err);
                setError(err);
                if (import.meta.env.DEV) {
                    console.error('Failed to fetch site settings:', err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const value = {
        siteName,
        loading,
        error
    };

    return (
        <SiteSettingsContext.Provider value={value}>
            {children}
        </SiteSettingsContext.Provider>
    );
};
