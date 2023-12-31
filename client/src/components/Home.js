import React, { useState, useEffect } from 'react'
import AboutUs from "./AboutUs";
import Footer from "./Footer"
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

const Home = ({user}) => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  return (

    <div className='home-colour'>

   
<div>
      {user?.is_admin ? <AdminNavbar/> : 
       <Navbar/> }
        <AboutUs />
        <Footer/> 
    </div>
    
    </div>
  )
}

export default Home