import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

const Home = () => {
  const [featuredPaintings, setFeaturedPaintings] = useState([]);
  const [homePage, setHomePage] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid var(--border-color)',
            borderTopColor: 'var(--accent-color)',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
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
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        {featuredPaintings[0]?.image && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}>
            <img
              src={urlFor(featuredPaintings[0].image).width(1920).quality(90).url()}
              alt=""
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
        <div className="scroll-indicator">
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
        <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(10px); }
            }
          `}</style>
      </section>

      {/* Selected Works Section */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)' }}>
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
              <div
                key={painting._id}
                className="glass-card glow-on-hover"
                style={{
                  overflow: 'hidden',
                  transition: 'transform var(--transition-medium)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="image-zoom" style={{ height: '400px' }}>
                  {painting.image && (
                    <img
                      src={urlFor(painting.image).width(700).height(500).url()}
                      alt={painting.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>
                <div style={{ padding: '1.5rem 2rem' }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    {painting.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {painting.category}
                  </p>
                </div>
              </div>
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
      </section >
    </div >
  );
};

export default Home;
