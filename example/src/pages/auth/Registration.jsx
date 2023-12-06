import {useDispatch} from "rsl-redux";
import {createAccountAction} from "../..//store/actions/authAction.js";
import {Link} from "react-router-dom";

function Login() {

    const dispatch = useDispatch()

    function handleCreateAccount(e) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const username = e.target.username.value
        dispatch(createAccountAction({
            username,
            password,
            email
        }))
    }

    return (<div className="mx-auto max-w-5xl">
            <div className="col-span-4">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                    <form onSubmit={handleCreateAccount}>
                        <div className="mb-4">
                            <label htmlFor="username"
                                   className="block text-gray-700 font-semibold mb-2">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter username"
                                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email"
                                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password"
                                   className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password"
                                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="my-3">
                            <Link to="/login">Login here</Link>
                        </div>

                        <button type="submit"
                                className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Create
                        </button>
                    </form>
                </div>
            </div>
        </div>)
}

export default Login

