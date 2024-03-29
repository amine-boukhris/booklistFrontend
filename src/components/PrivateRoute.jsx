// PrivateRoute.js
import { useState, useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/verifytoken'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('jwtToken')
                if (!token) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                const response = await axios.post(baseUrl, {
                    token,
                })
                if (response.data.isValid) {
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

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    // <Redirect to="/login" />
                    useNavigate('/')
                )
            }
        />
    )
}

export default PrivateRoute
