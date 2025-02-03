import React, { useState } from 'react';

const Login = ({handleLogin}) => {

    // console.log({handleLogin})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')

    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email, password, role)
        console.log(email)
        console.log(password)
        console.log(role)

        setEmail('')
        setPassword('')
        setRole('student')

    }

    return (
        <div className="h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={(e) =>{
                    submitHandler(e)
                }} >
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Select Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            id="role"
                            name="role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="student">Student</option>
                            <option value="mentor">Mentor</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            value={email}
                            onChange={(e)=>{
                              setEmail(e.target.value)
                            }}
                            required
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            value={password}
                            onChange={(e)=>{
                              setPassword(e.target.value)
                            }}
                            required
                            type="password"
                            placeholder="Type your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <a href="#" className="text-sm text-purple-500 hover:underline">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center text-gray-500">
                    <a href="#" className="text-purple-500 hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
