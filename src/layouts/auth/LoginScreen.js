import React, { useState } from "react";
import { connect } from "react-redux";
import { showPassword } from "../../redux/actions/passwordActions";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import OptionPopover from "./OptionPopover";
import OTPPopover from "./OTPPopover";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "../../database/firebase"; // <-- Import functions here
import CheckBox from "../../components/Checkbox/CheckBox";

export const LoginScreen = ({ showPasswordToggle, showPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [showOptionPopover, setShowOptionPopover] = useState(false);
  const [showOTPPopover, setShowOTPPopover] = useState(false);
  const [otpMethod, setOtpMethod] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const db = getFirestore();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     setError("Email and password are required.");
  //     return;
  //   }
  //   try {
  //     const userSnapshot = await getDocs(
  //       query(collection(db, "users"), where("email", "==", email))
  //     );
  //     const adminSnapshot = await getDocs(
  //       query(collection(db, "admin"), where("email", "==", email))
  //     );
  //     const s_adminSnapshot = await getDocs(
  //       query(collection(db, "s_admin"), where("email", "==", email))
  //     );

  //     if (userSnapshot.size > 0) {
  //       await signInWithEmailAndPassword(auth, email, password);
  //       navigate("/UserDashboard");
  //     } else if (adminSnapshot.size > 0) {
  //       await signInWithEmailAndPassword(auth, email, password);
  //       navigate("/AdminDashboard");
  //     } else if (s_adminSnapshot.size > 0) {
  //       await signInWithEmailAndPassword(auth, email, password);
  //       navigate("/SuperAdminDashboard");
  //       console.log("Successfully Logged in As Super Admin " + email);
  //     } else {
  //       setError("Invalid email or password.");
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //     console.error("Login error:", error);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const userSnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      const adminSnapshot = await getDocs(
        query(collection(db, "admin"), where("email", "==", email))
      );
      const s_adminSnapshot = await getDocs(
        query(collection(db, "s_admin"), where("email", "==", email))
      );

      if (
        userSnapshot.size > 0 ||
        adminSnapshot.size > 0 ||
        s_adminSnapshot.size > 0
      ) {
        await signInWithEmailAndPassword(auth, email, password);
        setShowOptionPopover(true);
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  };

  const handleOtpMethodSelection = async (method) => {
    setSelectedOption(method);

    // Get the user's email or phone number from Firestore
    const userSnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    const userData = userSnapshot.docs[0]?.data();

    const sendOTP = httpsCallable(functions, "sendOTP");
    try {
      const response = await sendOTP({
        email: method === "email" ? userData.email : null,
        phoneNumber: method === "phone" ? userData.phoneNumber : null,
      });

      if (response.data.success) {
        setOtpMethod(method);
        // setShowOTPPopover(true);
        setShowOTPPopover(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("An error occurred while sending the OTP.");
    }
  };

  const handleOtpSubmit = (otp) => {
    // Logic to verify OTP
    console.log(`OTP ${otp} submitted for method ${otpMethod}`);
    navigate("/UserDashboard"); // Example navigation
  };

  return (
    <div className="bg_image flex items-center justify-center min-h-screen ">
      <div className="login_container p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-500 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-500">
          <p className="mx-4 mb-0 text-2xl text-center font-semibold text-gray-500 dark:text-white">
            AreyengSghela
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent font-open-sans font-bold w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Password
              <button
                type="button"
                className="float-right text-gray-500 text-sm font-medium focus:outline-none hover:text-gray-700 transition duration-200"
                onClick={() => showPassword()}
              >
                {showPasswordToggle ? "Hide" : "Show"}
              </button>
            </label>
            <input
              placeholder="Password"
              className="bg-transparent w-full font-open-sans font-bold px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              id="pass"
              type={showPasswordToggle ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-row mb-4 mt-1 text-end">
            <div className="">
              <CheckBox />
            </div>
            <div className="ml-auto">
              <a href="/ForgotPassword" className="text-gray-500">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-200"
          >
            Log in
          </button>
        </form>
        {showOptionPopover && (
          <OptionPopover
            onSelectOption={handleOtpMethodSelection}
            onClose={() => setShowOptionPopover(false)}
          />
        )}

        {showOTPPopover && (
          <OTPPopover
            onSubmit={handleOtpSubmit}
            onClose={() => setShowOTPPopover(false)}
          />
        )}
        <h1 className="text-start font-thin mb-4">
          Don’t have an account?{" "}
          <a href="/RegistrationPage" className="text-black underline">
            Sign up
          </a>
        </h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  showPasswordToggle: state.password.showPassword,
});

export default connect(mapStateToProps, { showPassword })(LoginScreen);
