import React, { useState } from "react";
import { connect } from "react-redux";
import { showPassword } from "../../redux/actions/passwordActions";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication function
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";

import googleImage from "../../assets/images/google_image.png";
import facebookImage from "../../assets/images/facebook_image.png";
import { auth } from "../../database/firebase";
import CheckBox from "../../components/Checkbox/CheckBox";

export const LoginScreen = ({ showPasswordToggle, showPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const verifyCaptcha = () => {
    setCaptchaVerified(true);
  };

  const resetCaptcha = () => {
    setCaptchaVerified(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    //check the captch has been verified
    // if (!isCaptchaVerified) {
    //   alert(`Verify you're human`);
    //   return;
    // }

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

      if (userSnapshot.size > 0) {
        // User exists in the 'user' collection
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/UserDashboard");
      } else if (adminSnapshot.size > 0) {
        // User exists in the 'admin' collection
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/AdminDashboard");
      } else if (s_adminSnapshot.size > 0) {
        // User exists in the 's_admin' collection
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/SuperAdminDashboard");
        console.log("Successfully Logged in As Super Admin " + email);
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg_image flex items-center justify-center min-h-screen ">
      <div className="login_container p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-4xl font-sans mb-1 text-center">Log In</h1>
        <h1 className="text-center font-thin mb-4">
          Don’t have an account?{" "}
          <a href="/RegistrationPage" className="text-black underline">
            Sign up
          </a>
        </h1>

        <div className="">
          <button className="rounded-3xl border-2 border-gray-500 flex items-center px-4 py-2 justify-center w-full mb-4 bg-white">
            <img
              src={facebookImage}
              alt="Facebook Icon"
              className="w-6 h-6 mr-2"
            />
            Log in with Facebook
          </button>
          <button className="rounded-3xl border-2 border-gray-500 flex justify-center items-center px-4 py-2 w-full mb-4 bg-white">
            <img src={googleImage} alt="Google Icon" className="w-6 h-6 mr-2" />
            Log in with Google
          </button>
        </div>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-500 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-500">
          <p className="mx-4 mb-0 text-center font-semibold text-gray-500 dark:text-white">
            OR
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
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
              className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              id="pass"
              type={showPasswordToggle ? "text" : "password"} // Use showPasswordToggle instead of showPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-row mb-4 mt-1 text-end">
            <div className="">
              {/* Added margin-right to create space */}
              <CheckBox />
            </div>
            <div className="ml-auto">
              <a href="/ForgotPassword" className="text-gray-500">
                Forgot password?
              </a>
            </div>
          </div>
          {/* <div className="item-center justify-center flex-auto p-3">
            <ReCAPTCHA
              sitekey="6LcgtOIfAAAAAPKY4tPJouA-7ujrn7IHYJNvuOk6"
              // sitekey="6Lcmd9EpAAAAAB-OWZucytCG02_mFrByM5sJDEid"
              onChange={verifyCaptcha}
              onExpired={resetCaptcha}
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-200"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  showPasswordToggle: state.password.showPassword,
});

export default connect(mapStateToProps, { showPassword })(LoginScreen);
