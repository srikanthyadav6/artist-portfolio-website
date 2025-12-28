import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Layout;
