import React from 'react';

const Input = ({label, type = "text", value, id, onChange, className, ...attr}) => {
    return (
        <div className={`rsl-input-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            {type === "textarea" ? (
                    <textarea value={value} id={id} onChange={onChange} {...attr} />
                ) :
                <input type={type} value={value} id={id} onChange={onChange} {...attr} />
            }
        </div>
    );
};

export default Input;

