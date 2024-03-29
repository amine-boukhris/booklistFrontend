import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const baseUrl = 'http://localhost:5000/api/books'

const Book = () => {
    const { id } = useParams()

    const [book, setBook] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const getBook = async () => {
            const response = await axios.get(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data = await response.data
            setBook(data)
        }
    }, [])

    const handleDelete = () => {
        
    }

    const handleCancel = () => {
        setEditMode(false)
    }

    return (
        <div className="bg-base-200 flex justify-center items-center h-full w-full">
            <div className="w-full h-full sm:w-fit sm:h-fit shadow-xl p-8 rounded-lg bg-base-100 flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="title" className="form-control w-full">
                            <span className="label-text my-2">Title</span>
                            <input
                                disabled
                                required
                                id="title"
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full disabledInput"
                            />
                        </label>
                        <label htmlFor="author" className="form-control w-full">
                            <span className="label-text my-2">Author</span>
                            <input
                                disabled
                                required
                                id="author"
                                type="text"
                                placeholder="Author"
                                className="input input-bordered w-full disabledInput"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label htmlFor="genre" className="form-control w-full">
                            <span className="label-text my-2">Genre</span>
                            <input
                                disabled
                                id="genre"
                                type="text"
                                placeholder="Genre"
                                className="input input-bordered w-full disabledInput"
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
                                disabled
                                id="publication-year"
                                type="text"
                                placeholder="Publication year"
                                className="input input-bordered w-full disabledInput"
                            />
                        </label>
                    </div>
                    <div className="divider my-0" />
                    <div className="flex gap-3">
                        {!editMode ? (
                            <>
                                <button onClick={handleDelete} className="btn btn-danger flex-1">
                                    Delete
                                </button>
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
                                    className="btn btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
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
