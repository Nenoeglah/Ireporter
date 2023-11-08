
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import InterventionsViewDetails from "./components/InterventionsViewDetails";
import RedFlagsViewDetails from "./components/RedFlagsViewDetails";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Profile from "./components/Profile";
import UserLanding from "./User-Landing/UserLanding";
import UsersList from "./components/UsersList";
import Notification from "./components/Notification"; 
// import Email from "./components/Email"; 
import NotFound from "./components/NotFound";
import NotAuthorized from "./components/NotAuthorized";

function App() {
  const [user, setUser] = useState(null);
  const [redFlags, setRedFlags] = useState([]);
  const [interventions, setInterventions] = useState([]);

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // Retrieve the user object from localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // Parse the stored user object back to a JavaScript object
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    // Fetch other data or perform other setup as needed
    // ...

  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="row mt-3">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin onLogin={setUser} />} />
        <Route exact path="/" element={<Home user= {user} />} />
        {user?.is_admin ? (
          <Route
            exact
            path="/interventions/:interventionId"
            element={<InterventionsViewDetails />}
          />
        ) : (
          <Route path="/interventions/:interventionId" element={<NotAuthorized />} />
        )}
        {user?.is_admin ? (
          <Route
            exact
            path="/redflags/:redflagId"
            element={<RedFlagsViewDetails />}
          />
        ) : (
          <Route path="/redflags/:redflagId" element={<NotAuthorized />} />
        )}
        {user ? (
          <Route
            exact
            path="/dashboard"
            element={
              <AdminDashboard
                user={user}
                redFlags={redFlags}
                setRedFlags={setRedFlags}
                interventions={interventions}
                setInterventions={setInterventions}
              />
            }
          />
        ) : (
          <Route path="/dashboard" element={<NotAuthorized />} />
        )}
        <Route exact path="/login" element={<SignIn onLogin={handleLogin} />} />
        <Route
          exact
          path="/get-started"
          element={<SignUp onLogin={setUser} />}
        />
        {user ? (
          <Route
            exact
            path="/user-landing"
            element={<UserLanding user={user} />}
          />
        ) : (
          <Route path="/user-landing" element={<NotAuthorized />} />
        )}
        {user?.is_admin ? (
          <Route exact path="/users" element={<UsersList user={user} />} />
        ) : (
          <Route path="/users" element={<NotAuthorized />} />
        )}
        {user ? (
          <Route exact path="/profile" element={<Profile user={user} />} />
        ) : (
          <Route path="/profile" element={<NotAuthorized />} />
        )}
        {/* Use the Notification component in your Routes */}
        <Route path="/notification" element={<Notification />} />
        {/* Use the Email component in your Routes */}
        {/* <Route path="/email" element={<Email />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;






