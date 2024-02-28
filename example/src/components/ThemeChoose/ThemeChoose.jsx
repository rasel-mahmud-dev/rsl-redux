import React, {useState} from 'react';
import {MdColorLens} from "react-icons/md";
import getAlpha from "../../utils/getAlpha.js";

const ThemeChoose = () => {

    function changeColor(theme) {

        const colors = {
            "primary-500": theme.color,
            "primary-500-02": getAlpha(theme.color, 0.2),
            "primary-500-03": getAlpha(theme.color, 0.3),
            "primary-500-04": getAlpha(theme.color, 0.4),
            "primary-500-05": getAlpha(theme.color, 0.5),
        }

        for (const colorsKey in colors) {

            document.documentElement.style.setProperty(
                "--" + colorsKey,
                colors[colorsKey]
            )
        }


    }

    const [open, setOpen] = useState(false)

    const themes = [
        {
            name: "dsf",
            color: "red",
        },
        {
            name: "dsf",
            color: "#ff7f58",
        },
        {
            name: "dsf",
            color: "#cb3b5c",
        },
        {
            name: "dsf",
            color: "#ff4e85",
        },
        {
            name: "dsf",
            color: "#7fd961",
        },
        {
            name: "dsf",
            color: "#ffdc4f",
        }
    ]

    function handleSetTheme(theme){
        setOpen(false)
        changeColor(theme)

    }

    return (
        <div className="theme-chooser">

            <div onClick={()=>setOpen(p=>!p)} className="icon-theme">
                <MdColorLens/>
            </div>

            <div className={`theme-chooser- ${open  ? "open": ""}`}>
                {themes.map(theme=>(
                    <div>
                        <div style={{background: theme.color}} onClick={()=>handleSetTheme(theme)} className="icon-color-theme">
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ThemeChoose;