const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <div className="card sm:shadow-2xl bg-base-100 h-full sm:h-fit w-full sm:w-fit">
                <form className="card-body justify-end w-full max-w-md mx-auto">
                    <div className="flex flex-col justify-center flex-grow">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-control mt-12 sm:mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
