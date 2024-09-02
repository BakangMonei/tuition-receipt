import React, { useState } from "react";

import { sendOtpEmail } from "firebase/functions";

const OptionPopover = ({ onSelectOption, onClose }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // make a function to send otp to email/phone getting the method from the functions?
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Select OTP Method</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-2">
          Receive OTP via Email
        </button>
        <button className="bg-green-500 text-awhite py-2 px-4 rounded w-full">
          Receive OTP via Phone Number
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};
export default OptionPopover;
