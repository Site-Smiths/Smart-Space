import React, { useContext, useState } from 'react'
import Login from './components/auth/Login'
import Nav from './others/Nav'
import HeroSection from './others/HeroSection'
import StudentDashboard from './components/dashboard/StudentDashboard'
import MentorDashboard from './components/dashboard/MentorDashboard'
import { AuthContext } from './context/AuthProvider'

const app = () => {

    const authData = useContext(AuthContext)
    console.log(authData)
     
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [role, setRole] = useState(null)

   


    const handleLogin = (email, password, role) => {

        

        if (email == 'student@gmail.com' && password == 1234 && role == 'student') {
            setRole("student")
        }
        else if (email == 'mentor@gmail.com' && password == 1234 && role == 'mentor') {
            setRole("mentor")
        }
        else {
            alert("Invalid Credensials !")
        }

    }

   
    return (
        <div className="bg-gradien-to-b frm-[#A48DF3] to=-[#F5F4FE] min-h-screen">

            {!role ? (
                <Login handleLogin={handleLogin} />
            ) : role === 'student' ? (
                <StudentDashboard />
            ) : role === 'mentor' ? (
                <MentorDashboard />
            ) : (
                <Login handleLogin={handleLogin} />
            )}

        </div>
    )
}

export default app