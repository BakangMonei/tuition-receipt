import React, {useState} from "react";
import {connect} from "react-redux";



const CheckBox = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <label>Remember me</label>
        </div>
    );
};

export default CheckBox;