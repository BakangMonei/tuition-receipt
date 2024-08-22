import { lazy, Suspense } from "react";
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
import AdminDashboard from "./layouts/admin/AdminDashboard";
import UserDashboard from "./layouts/user/UserDashboard";
import SuperAdminDashboard from "./layouts/superadmin/SuperAdminDashboard";

const RegistrationPage = lazy(() =>
  import("./layouts/auth/RegistrationScreen")
);
const ForgotPassword = lazy(() => import("./layouts/auth/ForgotPassword"));
const LoginScreen = lazy(() => import("./layouts/auth/LoginScreen"));

const store = createStore(rootReducer);

const isAuthenticated = () => {
  return auth.currentUser !== null;
};

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/LoginPage" />;
};



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          <Route path="/LoginPage" element={<LoginScreen />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route
            path="/SuperAdminDashboard"
            element={<SuperAdminDashboard />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
