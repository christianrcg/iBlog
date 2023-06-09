import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
    const {setUserInfo, userInfo} = useContext(UserContext);
  //runs everytime Header() is mounted, for headers if a user is logged in
    useEffect(() => {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
      }).then(response =>{
       response.json().then(userInfo=> {
          setUserInfo(userInfo);
       });
      });
    }, []);

    //logout
    function logout(){
      fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }

    const username = userInfo?.username;
    //header structure
    return(
        <header>
        <Link to="/" className="logo">iBlog</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout ({username})</a>
            </>
          )}
          {!username &&(
            <>
              <Link to="/login">Login </Link>
              <Link to="/register">Register</Link> 
            </>
          )}
          
        </nav>
      </header>
    );
}

