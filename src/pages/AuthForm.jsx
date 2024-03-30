import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const baseUrl = 'http://localhost:5000/api/users'

const AuthForm = ({ action }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${baseUrl}/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (action === 'login') {
                const data = await response.json()
                if (response.status === 200) {
                    localStorage.setItem('token', data.token)
                    navigate('/')
                } else {
                    console.log(data.error)
                }
            } else if (action === 'register') {
                const data = await response.json()
                if (response.status === 201) {
                    navigate('/login')
                } else {
                    console.log(data.error)
                }
            }
        } catch (error) {
            console.log('Error authenticating user:', error)
        }
    }

    return (
        <div className="bg-base-200 flex justify-center items-center h-screen w-full">
            <form
                onSubmit={handleSubmit}
                className="w-full h-full sm:w-fit sm:h-fit shadow-xl p-8 rounded-lg bg-base-100 flex flex-col gap-6 "
            >
                <h1 className="text-center font-bold text-2xl text-neutral">
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                </h1>
                <div className="flex flex-col gap-3">
                    <label htmlFor="username" className="form-control w-full">
                        <span className="label-text my-2">Enter your name</span>
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                            className="input input-bordered w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password" className="form-control w-full">
                        <span className="label-text my-2">
                            Enter your password
                        </span>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex-grow flex items-end justify-center">
                    <button type="submit" className="btn btn-primary w-full">
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                    </button>
                </div>
                <Link
                    className="text-center text-accent"
                    to={action == 'register' ? '/login' : '/register'}
                >
                    {action == 'register'
                        ? 'already have an account? login'
                        : "don't have an account? register"}
                </Link>
            </form>
        </div>
    )
}

export default AuthForm
