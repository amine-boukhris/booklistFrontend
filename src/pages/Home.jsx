import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Table from './components/Table'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/users'

const Home = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${baseUrl}/current`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const userData = await response.data
            setUser(userData)
            setIsLoading(false)
            console.log(userData)
        }
        getUser()
    }, [])

    if (isLoading) {
        return 
    }
    return (
        <div>
            <Hero user={user} />
            <Table user={user} />
        </div>
    )
}

export default Home
