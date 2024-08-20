import React, { useState } from "react";

const CheckBoxTwo = () => {
  const [checked, setChecked] = useState("");

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label>Show Passwords</label>
    </div>
  );
};

export default CheckBoxTwo;