import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = ({ user }) => {
    return (
        <div className="hero py-8 bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">
                        Welcome {user.username}
                    </h1>
                    <p className="py-4">
                        You can add a new book to your list, or browse the books
                        already added.
                    </p>
                    <Link to={'/addbook'} className="btn btn-primary">
                        Add book
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
