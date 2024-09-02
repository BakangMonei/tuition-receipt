import React, { useState } from 'react';
import { sendOtpEmail } from "firebase/functions";
const OTPPopover = ({ onSubmit, onClose }) => {
  const [otp, setOtp] = useState('');

  



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 px-4 mb-4"
          placeholder="Enter OTP"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-2"
          onClick={() => {
            onSubmit(otp);
            onClose();
          }}
        >
          Submit OTP
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};


export default OTPPopover;