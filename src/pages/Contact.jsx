import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { client } from '../sanityClient';
import Toast from '../components/Toast';
import FormInput from '../components/ui/FormInput';
import Spinner from '../components/ui/Spinner';

const Contact = () => {
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.fetch('*[_type == "contactPage"][0]')
            .then(data => {
                setPageContent(data);
                setLoading(false);
            })
            .catch((err) => {
                if (import.meta.env.DEV) {
                    console.error('Failed to fetch contact page:', err.message);
                }
                setLoading(false);
            });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setSending(true);
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setToast({ message: "Message sent successfully!", type: "success" });
                event.target.reset();
            } else {
                setToast({ message: data.message || "Something went wrong.", type: "error" });
            }
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Contact form error:', error.message);
            }
            setToast({ message: "Network error. Please try again.", type: "error" });
        }
        setSending(false);
    };

    if (loading) {
        return (
            <div style={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spinner size={40} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '6rem' }}>
            <section aria-label="Contact form" style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '700px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <p style={{
                            color: 'var(--accent-color)',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            marginBottom: '1rem'
                        }}>
                            {pageContent?.subheading || 'Get in Touch'}
                        </p>
                        <h1 className="text-serif" style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '1rem'
                        }}>
                            {pageContent?.heading || "Let's Connect"}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                            {pageContent?.description || 'Inquiries about commissions, exhibitions, or purchasing artwork.'}
                        </p>
                        <div className="divider" />
                    </div>

                    <form
                        onSubmit={onSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            <FormInput
                                label="Name"
                                name="name"
                                type="text"
                                required
                                placeholder="Your full name"
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <FormInput
                            label="Message"
                            name="message"
                            type="textarea"
                            rows={6}
                            required
                            placeholder="Tell me about your inquiry..."
                        />

                        <div style={{ marginTop: '1rem' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={sending}
                                aria-busy={sending}
                                style={{ opacity: sending ? 0.7 : 1 }}
                            >
                                {sending ? 'Sending...' : 'Send Message'} <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Contact;
