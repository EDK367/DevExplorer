import React from 'react';

export const Button = ({ children, variant = 'primary', onClick, className = '', icon: Icon, ...props }) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            {...props}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};
