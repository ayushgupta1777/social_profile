import React, { useState} from "react";


const Signup = () => {
    const [username , setuser] = useState('');
    const [password, setpass] = useState('');

    const handreg = async() =>{
        const userId = Math.floor(100 + Math.random() * 900);
        const response =await fetch('http://localhost:3001/api/register',{
            method :'POST',
            headers :{
                'content-Type': 'application/json',
            },
            body: JSON.stringify({userId,username,password}),
        });
        if(response.ok){
            console.log('User reg sucess');
        }
    };

    return(
        <div className="div1">
            <div className="div2">
                <h1>SIGN UP</h1>
                <form onSubmit={(e) => {e.preventDefault(); handreg();}}>
                    
                    <div className="field">
                        <input type="text" value={username} onChange={(e) => setuser(e.target.value)} />
                    </div>
                    <div className="field">
                        <input type="password" value={password} onChange={(e) => setpass(e.target.value)} />
                    </div>
                    <button type="Submit" onClick={handreg}>SINGUP</button>
                </form>
            </div>
        </div>
    )
}
export default Signup;