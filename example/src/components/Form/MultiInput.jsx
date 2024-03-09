import React, {useState, useEffect} from 'react';
import {BiCheck, BiTrash} from "react-icons/bi";


const MultiInput = ({defaultValues, name, label, labelClass, className, placeholder, onChange}) => {

    const [values, setValues] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (defaultValues && Array.isArray(defaultValues)) {
            setValues(defaultValues);
        }
    }, [defaultValues]);

    const onInputEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEnter();
        }
    };

    const deleteSelectedInput = (text) => {
        const updatedValues = values.filter(v => v !== text);
        setValues(updatedValues);
        onChange && onChange({target: {values: updatedValues, name: name}});
    };

    const handleEnter = () => {
        let updatedState = [...values];

        let arrItems = value.trim().split(" ");
        if (arrItems.length > 0) {
            arrItems.forEach(eachItem => {
                if (eachItem !== " ") {
                    let idx = updatedState.indexOf(eachItem.trim().toLowerCase());
                    if (idx === -1) {
                        updatedState.push(eachItem.trim().toLowerCase());
                    } else {
                        updatedState.splice(idx, 1);
                    }
                }
            });
            onChange && onChange({target: {values: updatedState, name: name}});
            setValues(updatedState);
            setValue("");
        }
    };

    return (
        <div className={`multi-input ${className}`}>
            {label && <label className={labelClass}>{label}</label>}
            <div className="selected_input">
                {values && values.map((v, i) => (
                    <li key={i}>
                        {v}
                        <BiTrash className="delete_btn" onClick={() => deleteSelectedInput(v)}/>
                    </li>
                ))}
            </div>

            <div className="rsl-input-group rsl-input-group-multi relative">
                <input
                    name={name}
                    className=""
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onKeyPress={onInputEnter}
                    onChange={(e) => setValue(e.target.value)}
                />
                {value && <div
                    className="absolute top-1/2  -translate-y-1/2  right-1 circle-pill !w-6 !h-6 flex items-center justify-center rounded-full">
                    <BiCheck onClick={handleEnter}/>
                </div>}
            </div>
        </div>
    );
};

export default MultiInput;
