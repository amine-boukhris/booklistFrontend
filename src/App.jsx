import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    {/* <PrivateRoute path="/addbook" component={AddBook} />
                    <PrivateRoute path="/books/:id" component={Book} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/about" component={About} />
                    <Route path="/register" component={Register} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
