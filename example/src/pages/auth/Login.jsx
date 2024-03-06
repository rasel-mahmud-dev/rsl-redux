import {useDispatch} from "rsl-redux";
import {loginAction} from "../..//store/actions/authAction.js";
import {Link, useNavigate} from "react-router-dom";
import toast from "../../utils/toast.js";
import {HiOutlineKey} from "react-icons/hi";
import LoginCredential from "../../components/Modals/LoginCredential.jsx";
import {useState} from "react";
import {Spinner} from "../../components/Loader.jsx";

function Login() {

    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)

    const [openKeyModal, setOpenKeyModal] = useState(false)

    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        if (!email || !password) {
            return toast.openError("Email and password required")
        }

        setLoading(true)
        dispatch(loginAction({email, password})).unwrap().then(() => {
            navigate("/")
        }).catch(ex => {
            toast.openError(ex)
        }).finally(()=>{
            setLoading(false)
        })
    }

    function handleLogin2({email, password}) {
        setLoading(true)
        setOpenKeyModal(false)
       dispatch(loginAction({email, password})).unwrap().then(() => {
            navigate("/")
        }).catch(ex => {
            toast.openError(ex)
        }).finally(()=>{
           setLoading(false)
       })
    }


    return (
        <div className="mt-10">

            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                {isLoading && (
                    <Spinner  title="Please wait..." className="border-t-primary-500" /> )}

                <form onSubmit={handleLogin}>
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

                    <div className="my-3 flex justify-between items-center relative">
                        <Link to="/register">Create an account</Link>
                        <HiOutlineKey onClick={() => setOpenKeyModal(true)}/>

                        {openKeyModal && <LoginCredential loginAction={handleLogin2} onClose={()=>setOpenKeyModal(false)}/>}

                    </div>

                    <button disabled={isLoading} type="submit"
                            className="w-full bg-pink-400 primary-btn text-white font-semibold px-4 py-2 rounded-lg  transition duration-300">Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login

