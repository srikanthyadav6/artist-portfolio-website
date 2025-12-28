import { useState } from 'react';
import { Send } from 'lucide-react';
import Toast from '../components/Toast';

const Contact = () => {
    const [result, setResult] = useState("");
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setSending(true);
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("");
                setToast({ message: "Message sent successfully!", type: "success" });
                event.target.reset();
            } else {
                setToast({ message: data.message || "Something went wrong.", type: "error" });
                setResult("");
            }
        } catch (error) {
            setToast({ message: "Network error. Please try again.", type: "error" });
            setResult("");
        }
        setSending(false);
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '6rem' }}>
            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '700px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <p style={{
                            color: 'var(--accent-color)',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            marginBottom: '1rem'
                        }}>
                            Get in Touch
                        </p>
                        <h1 className="text-serif" style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '1rem'
                        }}>
                            Let's Connect
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                            Inquiries about commissions, exhibitions, or purchasing artwork.
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
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-secondary)'
                                }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '6px',
                                        background: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--accent-color)';
                                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--border-color)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-secondary)'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '6px',
                                        background: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--accent-color)';
                                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--border-color)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--text-secondary)'
                            }}>
                                Message
                            </label>
                            <textarea
                                name="message"
                                rows="6"
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    background: 'var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--accent-color)';
                                    e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--border-color)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={sending}
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
