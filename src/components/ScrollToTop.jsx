import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // "smooth" behavior can sometimes interfere with immediate top placement on refresh
        // using "instant" or default (auto) for more reliability on page load
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
