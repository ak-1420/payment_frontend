import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

 let navigate = useNavigate()

  React.useEffect(() => {
    if(localStorage.getItem("emp_id") === null){
      navigate('/signin')
    }
   },[localStorage.getItem("emp_id")])
    return (
        <div>
           <center>
               <h1>Payment Mangement System </h1>
           </center>
        </div>
    )
}

export default Home
