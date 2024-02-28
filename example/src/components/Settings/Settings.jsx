import React from 'react';
import {BiHome} from "react-icons/bi";
import Switch from "@/components/Form/Switch.jsx";


const Settings = () => {

    // const {setSetting, settings} = getState()

    const items = [
        // { icon: ()=> <BiHome />, label: "Show booked Tickets" },
        { icon: ()=> <BiHome />, label: "Home" }
    ]

    function handleSetSetting(name, value){
        // setSetting({[name]: value})
    }

    return (
        <div>
            <h2 className="drawer-title">Settings</h2>

            <div>
                <ul className="uppercase text-sm font-medium">


                    <li className="flex items-center gap-x-2 justify-between mt-2">
                        <label htmlFor="reserveImmediately">Reserve Immediately</label>
                        <Switch size="sm" on={true} onChange={(isOn) => handleSetSetting("reserveImmediately", isOn)}
                                id="reserveImmediately"/>
                    </li>
                </ul>


            </div>
        </div>
    );
};

export default Settings;