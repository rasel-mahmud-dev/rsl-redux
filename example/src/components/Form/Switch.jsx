import React, { useEffect, useState} from 'react';

const Switch = ({onChange, id = "", on = false, size}) => {
    const [isChecked, setIsChecked] = useState(on);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked)
    };

    useEffect(() => {
        setIsChecked(on)
    }, [on]);

    return (
        <label className={`switch switch-size-${size}`}>
            <input id={id} type="checkbox" checked={isChecked} onChange={toggleSwitch} />
            <span className="slider"></span>
        </label>
    );
};

export default Switch;