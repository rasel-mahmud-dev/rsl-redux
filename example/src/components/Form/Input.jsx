import React from 'react';

const Input = ({label, type = "text", value, id, onChange, className, readOnly = false, ...attr}) => {
    return (
        <div className={`rsl-input-group ${className} ${readOnly ? "rsl-input-group__readonly": ""}`}>
            {label && <label htmlFor={id}>{label}</label>}
            {type === "textarea" ? (
                    <textarea readOnly={readOnly} value={value} id={id} onChange={onChange} {...attr} />
                ) :
                <input readOnly={readOnly} type={type} value={value} id={id} onChange={onChange} {...attr} />
            }
        </div>
    );
};

export default Input;

