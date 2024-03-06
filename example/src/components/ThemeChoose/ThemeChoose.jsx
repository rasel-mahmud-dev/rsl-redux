import React, {useState} from 'react';
import {MdColorLens} from "react-icons/md";
import getAlpha from "../../utils/getAlpha.js";
import changeThemeColor from "../../utils/changeThemeColor.js";

const ThemeChoose = () => {



    /*
    * 	--primary-500: #2c65ec;
	--primary-500-05: rgba(44, 101, 236, 0.19);
	--primary-500-03: rgba(44, 101, 236, 0.19);
	--primary-500-04: rgba(44, 101, 236, 0.19);
	--primary-500-02: rgba(44, 101, 236, 0.1);
    * */

    const [open, setOpen] = useState(false)

    const themes = [
        {
            name: "default",
            color: "#2c65ec",
        },{
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
        changeThemeColor(theme)
        localStorage.setItem("theme", theme.name === "default" ? "" : theme.color)
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