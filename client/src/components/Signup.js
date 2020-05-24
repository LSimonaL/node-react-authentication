import React, { useState, useEffect } from 'react'

const Signup = (props) => {
    
    const [userdata, setstate] = useState({username:'', password: '', repeatPassword: ''});
    useEffect(() => {
        if(localStorage.getItem('authToken')){
            console.log('user logged in');
            props.history.push('/Profile');
        } 
    },[]);    

    //re-assigning
    const onChangeHandler = (event) => {
        // console.log(event.target.value);
        setstate({...userdata, [event.target.name]: event.target.value});
        console.log("username:", userdata.username, "password:", userdata.password);
    }

    const signuphandler = async (event) => {
        event.preventDefault();
        // console.log('login test');
        const url = 'http://localhost:9090/users/register';
        // Default options are marked with *
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userdata) // body data type must match "Content-Type" header
  });
  const data = await response.json();
  console.log(data.token);
  localStorage.setItem('authToken', data.token);
}   



    return (
        <div className="container mt-5">
            <div className="auth-wrapper auth-inner">
                <form>
                <h3>Sign up</h3>
        
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={userdata.username} onChange={onChangeHandler} name="username" required/>
                </div>
        
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={userdata.password} onChange={onChangeHandler} name="password" required />
                </div>
                <div className="form-group">
                    <label>Repeat password</label>
                    <input type="password" className="form-control" value={userdata.repeatPassword} onChange={onChangeHandler} name="repeatPassword" required />
                </div>
        
                <button type="button" className="btn btn-primary btn-form btn-block" onClick={signuphandler}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
