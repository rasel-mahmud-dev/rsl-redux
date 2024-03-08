import React, {useState} from 'react';
import Input from "../../../components/Form/Input.jsx";

function Item({label, name, value, onChange, isEditMode, className = ""}) {
    return (
        <div className={className}>
            <label className="text-sm text-neutral-600">{label}</label>
            {isEditMode ? (
                <Input name={name} value={value} onChange={onChange}/>
            ) : <div>{value || "N/A"}</div>}
        </div>

    )
}

const CustomerProfile = () => {

    const initialProfileState = {
        fullName: 'RaseL Mahmud',
        email: 'raselmr005@gmail.com',
        mobile: '',
        birthday: '',
        gender: '',
        newsletter: false
    };

    const [profile, setProfile] = useState(initialProfileState);

    const [state, setState] = useState({
        nameEdit: false
    })


    function toggleEditMode() {
        setState(prev => ({
            ...prev,
            nameEdit: !prev.nameEdit
        }))
    }

    function handleChange(e) {
        const {name, value} = e.target
        setProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleNewsletterChange() {
    }

    return (
        <div className="py-6 px-2 md:px-4  ">
            <h2 className="font-semibold text-3xl">My Profile</h2>

            <div className="grid grid-cols-3 gap-x-4 gap-y-10 mt-10">
                <Item
                    isEditMode={state.nameEdit}
                    onChange={handleChange}
                    name="fullName"
                    label="Full Name"
                    value={profile.fullName}
                />
                <Item
                    label="Email Address"
                    value={profile.email}
                />
                <Item
                    isEditMode={state.nameEdit}
                    onChange={handleChange}
                    name="mobile"
                    label="Mobile"
                    value={profile.mobile}
                />
                <Item label="Birthday" value={profile.birthday}/>
                <Item label="Gender" value={profile.gender}/>

            </div>

            <div className="mt-6">
                <label className="text-sm text-neutral-600">Subscribe to our Newsletter</label>
                <div>
                    <input type="checkbox"
                           checked={profile.newsletter}
                           onChange={handleNewsletterChange}
                    />
                </div>
            </div>
            <button className="btn btn-outline" onClick={toggleEditMode}>Edit Profile</button>
            <button className="btn btn-outline ml-2">Change Password</button>
        </div>
    );
};

export default CustomerProfile;


