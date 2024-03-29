import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import AuthForm from './pages/AuthForm'
import AddBook from './pages/AddBook'
import Book from './pages/Book'

function App() {
    return (
        <Router>
            <div className="pb-12 h-screen">
                <Navbar />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact
                        path="/addbook"
                        element={
                            <PrivateRoute>
                                <AddBook />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact
                        path="/books/:id"
                        element={
                            <PrivateRoute>
                                <Book />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={<AuthForm action={'login'} />}
                    />
                    <Route
                        path="/register"
                        element={<AuthForm action={'register'} />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
