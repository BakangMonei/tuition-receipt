import { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux"; // Import createStore from redux
import rootReducer from "./redux/reducers"; // Import your root reducer

import { auth } from "./database/firebase";

const RegistrationPage = lazy(() => import("./layouts/auth/RegistrationScreen"));
const ForgotPassword = lazy(() => import("./layouts/auth/ForgotPassword"));
const LoginScreen = lazy(() => import("./layouts/auth/LoginScreen"));

// Create Redux store
const store = createStore(rootReducer);

// Function to check if user is authenticated
const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Private Route component to handle authentication
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/LoginPage" />;
};

function App() {
  return (
    // Provide the Redux store to your React app
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          {/* More functionality routes as needed */}
          <Route path="/LoginPage" element={<LoginScreen />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
