import React from 'react'
import { useState } from 'react';


const UserFrom = () => {
    
    const [formData, setFormData] = useState({
        username: "",
        userphone: "",
        useremail: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        
    }


    const handleSubmit  = async(e) => {
        e.preventDefault();
        try {
            const createuser = await fetch("http://localhost:3000/create", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const jsonData = await createuser.json()
            
            if(jsonData.success){
                alert("User created successfully")
                
                setFormData({
                useremail: ''
                ,username: "",
                userphone: ""
            })
            } else {
                console.log("409 error for this")
            }
            
            
        } catch (error) {
            console.log(error.message)
            return
        }
    }

  return (
    <div >
      <form>
        <div>
          Username : <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}

          />
        </div>
        <div>
          Email: <input
            type="email"
            name="useremail"
            placeholder="Email"
            value={formData.useremail}
            onChange={handleChange}
          />
        </div>
        <div>
          Phone: <input
            type="text"
            name="userphone"
            placeholder="Phone"
            value={formData.userphone}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserFrom