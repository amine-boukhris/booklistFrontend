import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/users'

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                const response = await axios.post(`${baseUrl}/verifytoken`, {
                    token: token,
                })
                if (response.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Error verifying token:', error)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }

        verifyToken()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default PrivateRoute
