import React from 'react';

export const Button = ({children, type, onClick, className}) => (
    <button type={type} onClick={onClick} className={className}>
        {children}
    </button>
);

Button.defaultProps = {
    type: 'button',
    className: 'btn btn-primary',
    children: 'Button',
};
