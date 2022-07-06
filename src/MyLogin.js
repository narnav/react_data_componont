import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
const MyLogin = () => {
const [user, setuser] = useState("")
const [pwd, setpwd] = useState("")
const DJANGO ='http://127.0.0.1:8000/token/'

const login=async()=>{
    axios.post(DJANGO, {
        username: user,
        password: pwd
      })
      .then(function (response) {
        console.log(response.data.access);
        localStorage.setItem("access",response.data.access)
      })
      .catch(function (error) {
        console.log(error);
      });
}

const test=async()=>{
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem("access")}`
    };
    axios.get('http://127.0.0.1:8000/notes/',{ headers }).
      then(function (response) {
        console.log(response.data);
        // console.log(jwt_decode(localStorage.getItem("access")))
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <div>
        User:<input onChange={(e)=>setuser(e.target.value)} /><br></br>
        Password:<input onChange={(e)=>setpwd(e.target.value)} type={'password'}/>
        <button onClick={()=>login()}>Login</button>
        <button onClick={()=>test()}>test</button>

    </div>
  )
}

export default MyLogin