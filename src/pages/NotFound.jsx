import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 border-2 ">
                <div className="card-body gap-5 items-center">
                    <h2 className="font-bold text-3xl">404</h2>
                    <p>The page you're looking for wasnt't found</p>
                    <Link to={'/'} className="btn btn-primary">
                        back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
