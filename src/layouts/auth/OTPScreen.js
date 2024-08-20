import { useState, Suspense, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../database/firebase";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Use Firebase or your authentication logic to determine if the user is authenticated
    // Update the authenticated state accordingly
  }, []);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required.");
      return;
    }

    try {
      // Use Firebase or your authentication logic to verify the OTP
      // Update the authenticated state accordingly
      // For example, if the OTP is correct, setAuthenticated(true);
      // else, setAuthenticated(false);
      navigate("/UserDashboard");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Enter OTP</h2>
        <form onSubmit={handleOTPSubmit}>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}