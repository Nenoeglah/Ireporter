

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("/check_session").then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user));
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     fetch("/logout", {
//       method: "DELETE",
//     })
//       .then((r) => {
//         if (r.ok) {
//           setUser(null);
//         } else {
//           r.json().then(console.log("There was an error in logging you out"));
//         }
//       });
//   };

//   return (
//     <nav className="fixed-top navbar navbar-expand-sm navbar-expand-lg navbar-dark bg-light static-top">
//       <div className="container-fluid">
//         <Link
//           to={"/"}
//           onClick={() => {
//             window.location.href = "#home";
//           }}
//           className="navbar-brand"
//           style={{
//             fontWeight: "bold",
//             color: "#white",
//             padding: "2px",
//             backgroundColor: "#4120fc",
//           }}
//         >
//           iREPORTER 
//         </Link>
//         <div
//           class="collapse navbar-collapse justify-content-end"
//           id="navbarSupportedContent"
//         >
//           <ul className="navbar-nav">
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     to="/profile"
//                     style={{ color: "#4120fc" }}
//                   >
//                     {user.username}'s Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     to="/user-landing"
//                     style={{ color: "##4120fc" }}
//                   >
//                     Raise an issue
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     to="/"
//                     onClick={handleLogout}
//                     style={{ color: "#4120fc" }}
//                   >
//                     Logout
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     onClick={() => {
//                       window.location.href = "#how-it-works";
//                     }}
//                     style={{ color: "#4120fc" }}
//                   >
//                     How it works
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     onClick={() => {
//                       window.location.href = "#recent-reports";
//                     }}
//                     style={{ color: "#4120fc" }}
//                   >
//                     Recent Reports
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link d-flex justify-content-center"
//                     to="/get-started"
//                     style={{ color: "#4120fc" }}
//                   >
//                     Get started
//                   </Link>
//                 </li>
//               </>
//             )}
//             <li className="nav-item">
//               <Link
//                 className="nav-link d-flex justify-content-center"
//                 to="/admin/login"
//                 style={{ color: "#4120fc" }}
//               >
//                 Admin Login
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// 🎙
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const HandleLogout = () => {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => { 
      if (r.ok) {
        setUser(null);
      } else {
        r.json().then("There was an error in logging you out")
      }
    })
  }

  return (
    <nav className="fixed-top navbar navbar-expand-sm  navbar-expand-lg navbar-dark bg-light static-top" >
      <div className="container-fluid">
      <Link to={"/"} onClick={() => {window.location.href = "#home"}} className="navbar-brand" style={{ fontWeight: "bold",color: "#e6150a",padding:"2px" }} >Ireporter
      </Link>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        > 
          <ul className="navbar-nav">
          {user ? (  
            <>
          <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                to="/profile"
                //to signup
                style={{ color: "#e6150a" }}
              >
                {user.username}'s Profile
              </Link>
            </li>
            <li className="nav-item">
            <Link
              className="nav-link d-flex justify-content-center"
              to="/user-landing"
              //to signup
              style={{ color: "#e6150a" }}
            >
             Raise an issue
            </Link>
          </li>
          <li className="nav-item">
          <Link
            className="nav-link d-flex justify-content-center"
            to="/"
            onClick={HandleLogout}
            //to signup
            style={{ color: "#e6150a" }}
          >
            Logout
          </Link>
        </li>
        </>
            ) : (
            <>
            {/* <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                to="/"
                style={{ color: "black" }}

              >
                About Us
              </Link>
            </li> */}
               <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                onClick={() => {window.location.href = "#how-it-works"}}
                style={{ color: "#e6150a" }}
              >
                How it works
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                onClick={() => {window.location.href = "#recent-reports"}}
                style={{ color: "#e6150a" }}
              >
                Recent Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                to="/get-started"
                //to signup
                style={{ color: "#e6150a" }}
              >

              Get started
                  </Link>
                </li>
              </>
            )}
            {/* <li className="nav-item">
              <Link
                className="nav-link d-flex justify-content-center"
                to="/admin/login"
                style={{ color: "#e6150a" }}
              >
                Admin Login
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
               