import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development only
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    style={{
                        minHeight: '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        textAlign: 'center'
                    }}
                >
                    <div>
                        <h2
                            className="text-serif"
                            style={{
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                color: 'var(--text-primary)'
                            }}
                        >
                            Something went wrong
                        </h2>
                        <p
                            style={{
                                color: 'var(--text-secondary)',
                                marginBottom: '2rem',
                                maxWidth: '400px'
                            }}
                        >
                            We apologize for the inconvenience. Please try refreshing the page.
                        </p>
                        <button
                            onClick={this.handleRetry}
                            className="btn-primary"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
