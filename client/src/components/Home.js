import React, { useState, useEffect } from 'react'
import AboutUs from "./AboutUs";
import Footer from "./Footer"
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className='homeback-colour'>
    <div className='home-colour'>

   
<div>
      {user?.is_admin ? <AdminNavbar/> : 
       <Navbar/> }
        <AboutUs />
        <Footer/> 
    </div>
    </div>
    </div>
  )
}

export default Home