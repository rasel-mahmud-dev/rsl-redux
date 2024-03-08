

import React from 'react';

const Input = ({label, value, id,  onChange, className, ...attr}) => {
    return (
        <div className={`rsl-input-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input value={value} id={id} onChange={onChange} {...attr} />
        </div>
    );
};

export default Input;

