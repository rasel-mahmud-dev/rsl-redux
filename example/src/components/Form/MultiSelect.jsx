import React, {useState, useEffect} from 'react';
import {BiTrash} from "react-icons/bi";
import {api} from "../../axios/index.js";
import useDebounce from "../../hooks/useDebounce.jsx";



const MultiSelectInput = ({defaultValues, name, label, labelClass, className, placeholder, onChange}) => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const debouncedFetch = useDebounce(fetchSuggestions, 500);


    useEffect(() => {
        if (defaultValues && Array.isArray(defaultValues)) {
            setValues(defaultValues);
        }
    }, [defaultValues]);

    async function fetchSuggestions(inputValue){
        try {
            const {data} = await api.get(`/brands/search?name=${inputValue}`);
            if (data) {
                setSuggestions(data);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }

    const handleInputChange = (e) => {
        setValue(e.target.value);
        if (e.target.value.trim() !== "") {
            debouncedFetch(e.target.value.trim());
        } else {
            setSuggestions([]);
        }
    };

    const handleOptionClick = (option) => {
        const updatedValues = [...values, option];
        setValues(updatedValues);
        onChange && onChange({target: {values: updatedValues, name: name}});
        setValue("");
        // setSuggestions([]);
    };

    const deleteSelectedInput = (text) => {
        const updatedValues = values.filter(v => v !== text);
        setValues(updatedValues);
        onChange && onChange({target: {values: updatedValues, name: name}});
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleOptionClick(value.trim());
        }
    };

    function clearAll() {
        setValues([])
    }

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
                {(values?.length && values?.length > 10) ? <li onClick={clearAll}>Clear all</li> : null}
            </div>

            <div className="rsl-input-group rsl-input-group-multi relative">
                <input
                    name={name}
                    className=""
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                />
                {suggestions?.length ? <div className="suggestions">
                    <div>
                        {suggestions.map((option, index) => (
                            <div key={index} className="hover-list-primary text-sm py-1 px-2"
                                 onClick={() => handleOptionClick(option.slug)}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div> : null}
            </div>
        </div>
    );
};

export default MultiSelectInput;
