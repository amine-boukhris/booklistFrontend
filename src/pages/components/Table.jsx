import formatDate from '../../utils/formatDate'

const Table = ({ user }) => {
    const books = user.books

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-6">Book List</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Publication year</th>
                            <th>Added at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => {
                            return (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre || <span className='italic'>not set</span>}</td>
                                    <td>{book.publicationYear || <span className='italic'>not set</span>}</td>
                                    <td>{formatDate(book.createdAt)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
