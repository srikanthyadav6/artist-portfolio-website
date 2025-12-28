import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { client, urlFor } from '../sanityClient';
import Spinner from '../components/ui/Spinner';
import PaintingModal from '../components/PaintingModal';
import PaintingCard from '../components/PaintingCard';

const Home = () => {
  const [featuredPaintings, setFeaturedPaintings] = useState([]);
  const [homePage, setHomePage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    Promise.all([
      client.fetch('*[_type == "painting" && featured == true]'),
      client.fetch('*[_type == "homePage"][0]')
    ])
      .then(([paintings, page]) => {
        setFeaturedPaintings(paintings);
        setHomePage(page);
        setLoading(false);
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.error('Failed to fetch home data:', err.message);
        }
        setError('Failed to load content. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleOpenModal = useCallback((index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex < featuredPaintings.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, featuredPaintings.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <Spinner size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container"
        role="alert"
        style={{ padding: '10rem 0', textAlign: 'center' }}
      >
        <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>
          Oops! Something went wrong
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {error}
        </p>
        <button
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (featuredPaintings.length === 0) {
    return (
      <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h2 className="gradient-text">Welcome to your Portfolio</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          No paintings found. Add your first work in Sanity Studio.
        </p>
      </div>
    );
  }

  const taglineParts = (homePage?.tagline || 'Capturing light, preserving moments.').split(',');
  const taglineMain = taglineParts[0];
  const taglineAccent = taglineParts[1] || '';

  return (
    <div>
      {/* Hero Section - Full Screen Dramatic */}
      <section
        aria-label="Featured artwork hero"
        style={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Background Image with Overlay */}
        {featuredPaintings[0]?.image && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}>
            <img
              src={urlFor(featuredPaintings[0].image).width(1920).quality(90).url()}
              alt={featuredPaintings[0].title || 'Featured artwork'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.4) saturate(1.2)'
              }}
            />
            {/* Gradient Overlays */}
            <div
              className="hero-overlay-gradient"
              style={{
                position: 'absolute',
                inset: 0,
              }} />
            <div
              className="hero-overlay-bottom"
              style={{
                position: 'absolute',
                inset: 0,
              }} />
          </div>
        )}

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <p style={{
              color: 'var(--accent-color)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '1.5rem',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease 0.2s forwards'
            }}>
              Fine Art Collection
            </p>

            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              marginBottom: '2rem',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease 0.4s forwards'
            }}>
              {taglineMain}
              {taglineAccent && (
                <>
                  <br />
                  <span className="gradient-text" style={{ fontStyle: 'italic' }}>
                    {taglineAccent}
                  </span>
                </>
              )}
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '3rem',
              maxWidth: '500px',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease 0.6s forwards'
            }}>
              {homePage?.description || 'Explore the collection of oil paintings. A journey through landscapes, emotion, and abstract forms.'}
            </p>

            <div style={{ opacity: 0, animation: 'fadeInUp 0.8s ease 0.8s forwards' }}>
              <Link to="/gallery" className="btn-primary">
                {homePage?.ctaText || 'Explore Gallery'} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <p style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}>
            Scroll to explore
          </p>
          <ArrowDown size={20} style={{
            color: 'var(--text-muted)',
            animation: 'bounce 2s infinite'
          }} />
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        aria-label="Selected works"
        style={{ padding: '8rem 0', background: 'var(--bg-secondary)' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{
              color: 'var(--accent-color)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '1rem'
            }}>
              Portfolio
            </p>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Selected Works
            </h2>
            <div className="divider" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {featuredPaintings.map((painting, index) => (
              <PaintingCard
                key={painting._id}
                painting={painting}
                onClick={() => handleOpenModal(index)}
                imageHeight="400px"
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link
              to="/gallery"
              style={{
                color: 'var(--accent-color)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                borderBottom: '1px solid var(--accent-color)',
                paddingBottom: '0.5rem',
                transition: 'all var(--transition-fast)'
              }}
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedIndex !== null && (
        <PaintingModal
          painting={featuredPaintings[selectedIndex]}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedIndex < featuredPaintings.length - 1}
          hasPrev={selectedIndex > 0}
        />
      )}
    </div>
  );
};

export default Home;
