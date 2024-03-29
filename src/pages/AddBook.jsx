import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import isValidYear from '../utils/isValidYear'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/books'

const AddBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publicationYear, setPublicationYear] = useState('')

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !author) {
            return setError(true)
        }

        if (publicationYear && !isValidYear(publicationYear)) {
            return setError(true)
        }

        const reqBody = {
            title,
            author,
        }
        if (genre.length > 0) {
            reqBody.genre = genre
        }
        if (publicationYear.length > 0) {
            reqBody.publicationYear = Number(publicationYear)
        }

        const response = await axios.post(baseUrl, reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })

        const data = await response.data
        console.log(data)
        navigate(`/books/${data.savedBook._id}`)
    }

    return (
        <div className="bg-base-200 flex justify-center items-center h-full w-full">
            <form
                onSubmit={handleSubmit}
                className="w-full h-full sm:w-fit sm:h-fit shadow-xl p-8 rounded-lg bg-base-100 flex flex-col gap-6"
            >
                {error && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Invalid book data!</span>
                    </div>
                )}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="title" className="form-control w-full">
                            <span className="label-text my-2">Enter title</span>
                            <input
                                required
                                id="title"
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor="author" className="form-control w-full">
                            <span className="label-text my-2">
                                Enter author
                            </span>
                            <input
                                required
                                id="author"
                                type="text"
                                placeholder="Author"
                                className="input input-bordered w-full"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="genre" className="form-control w-full">
                            <span className="label-text my-2">Enter genre</span>
                            <input
                                id="genre"
                                type="text"
                                placeholder="Genre"
                                className="input input-bordered w-full"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="publication year"
                            className="form-control w-full"
                        >
                            <span className="label-text my-2">
                                Enter publication year
                            </span>
                            <input
                                id="publication-year"
                                type="text"
                                placeholder="Publication year"
                                className="input input-bordered w-full"
                                value={publicationYear}
                                onChange={(e) =>
                                    setPublicationYear(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <div className="divider my-0" />
                    <div className="flex gap-3">
                        <Link to={'/'} className="btn btn-outline flex-1">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary flex-1"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddBook
