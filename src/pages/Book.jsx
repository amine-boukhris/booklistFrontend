import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AlertError, AlertSuccess } from '../components/Alert'
import formatDate from '../utils/formatDate'

const baseUrl = 'http://localhost:5000/api/books'

const Book = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [book, setBook] = useState({})
    const [editMode, setEditMode] = useState(false)

    const [success, setSucess] = useState(false)
    const [error, setError] = useState(false)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publicationYear, setPublicationYear] = useState('')

    useEffect(() => {
        const getBook = async () => {
            const response = await axios.get(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data = await response.data
            console.log(data)
            setBook(data)
            data.title ? setTitle(data.title) : null
            data.author ? setAuthor(data.author) : null
            data.genre ? setGenre(data.genre) : null
            data.publicationYear
                ? setPublicationYear(data.publicationYear)
                : null
        }

        getBook()
    }, [])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setError(false)
            }, 10000)
        }
    }, [success])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }, [error])

    const handleDelete = async () => {
        await axios.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        navigate('/')
    }

    const handleCancel = () => {
        setEditMode(false)
        setTitle(book.title)
        setAuthor(book.author)
        setGenre(book.genre)
        setPublicationYear(book.publicationYear)
    }

    const handleSave = async () => {
        if (
            title == book.title &&
            author == book.author &&
            genre == (book.genre || '') &&
            publicationYear == (book.publicationYear || '')
        ) {
            return
        }

        const putBody = {}
        title ? (putBody.title = title) : null
        author ? (putBody.author = author) : null
        genre ? (putBody.genre = genre) : null
        publicationYear ? (putBody.publicationYear = publicationYear) : null

        const response = await axios.put(`${baseUrl}/${id}`, putBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (response.status === 200) {
            const data = await response.data
            setBook(data.updatedBook)
            setEditMode(false)
            setSucess(true)
            setError(false)
        } else {
            setSucess(false)
            setError(true)
        }
    }

    return (
        <div className="bg-base-200 flex justify-center items-center h-full w-full">
            <div className="w-full h-full sm:w-fit sm:h-fit shadow-xl p-8 rounded-lg bg-base-100 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                    <span className="text-accent">By {book.author}</span>
                    <br />
                    <span className="text-slate-500 text-sm">
                        Added on {formatDate(book.createdAt)}
                    </span>
                </div>
                {success && (
                    <div className="flex">
                        <AlertSuccess text={'Book updated successfully!'}>
                            <Link to={'/'} className="link link-neutral px-2">
                                back to home
                            </Link>
                        </AlertSuccess>
                    </div>
                )}
                {error && <AlertError text={'Failed to update book!'} />}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="title" className="form-control w-full">
                            <span className="label-text my-2">Title</span>
                            <input
                                disabled={!editMode}
                                required
                                id="title"
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full disabledInput"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor="author" className="form-control w-full">
                            <span className="label-text my-2">Author</span>
                            <input
                                disabled={!editMode}
                                required
                                id="author"
                                type="text"
                                placeholder="Author"
                                className="input input-bordered w-full disabledInput"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="genre" className="form-control w-full">
                            <span className="label-text my-2">Genre</span>
                            <input
                                disabled={!editMode}
                                id="genre"
                                type="text"
                                placeholder="Genre"
                                className="input input-bordered w-full disabledInput"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="publication year"
                            className="form-control w-full"
                        >
                            <span className="label-text my-2">
                                Publication year
                            </span>
                            <input
                                disabled={!editMode}
                                id="publication-year"
                                type="text"
                                placeholder="Publication year"
                                className="input input-bordered w-full disabledInput"
                                value={publicationYear}
                                onChange={(e) =>
                                    setPublicationYear(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <div className="divider my-0" />
                    <div className="flex gap-3">
                        {!editMode ? (
                            <>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById('my_modal_1')
                                            .showModal()
                                    }
                                    className="btn btn-outline btn-error flex-1"
                                >
                                    Delete
                                </button>
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Are you sure you want to <br />{' '}
                                            Delete this book?
                                        </h3>
                                        <div className="modal-action">
                                            <form
                                                method="dialog"
                                                className="flex gap-3"
                                            >
                                                <button className="btn btn-outline">
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-error"
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                                <button
                                    className="btn btn-primary flex-1"
                                    onClick={(e) => setEditMode(true)}
                                >
                                    Edit
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="btn btn-ghost flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="btn btn-primary flex-1"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
