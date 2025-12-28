import PropTypes from 'prop-types';
import { useState } from 'react';

const FormInput = ({
    label,
    name,
    type = 'text',
    required = false,
    rows,
    placeholder = ''
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = `form-${name}`;
    const isTextarea = type === 'textarea';

    const inputStyles = {
        width: '100%',
        padding: '1rem 1.25rem',
        border: `1px solid ${isFocused ? 'var(--accent-color)' : 'var(--border-color)'}`,
        borderRadius: '6px',
        background: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        fontFamily: 'inherit',
        fontSize: '1rem',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        boxShadow: isFocused ? '0 0 0 3px var(--accent-glow)' : 'none',
        resize: isTextarea ? 'vertical' : undefined
    };

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div>
            <label
                htmlFor={inputId}
                style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-secondary)'
                }}
            >
                {label}
            </label>
            <InputComponent
                type={isTextarea ? undefined : type}
                id={inputId}
                name={name}
                required={required}
                rows={rows}
                placeholder={placeholder}
                style={inputStyles}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-required={required}
            />
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string
};

export default FormInput;
