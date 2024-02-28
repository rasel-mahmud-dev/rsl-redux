import React from 'react';

const Select = ({label, value, name, id, options, onChange, valueKey, nameKey,}) => {
    return (
        <div className="rsl-input">
            {label && <label htmlFor="">{label}</label>}
            <select value={value} onChange={onChange} name={name} id={id}>
                {options.map(el => (
                    <option key={valueKey ? el[valueKey] : el}
                            value={valueKey ? el[valueKey] : el}>
                        {nameKey ? el[nameKey] : el}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;