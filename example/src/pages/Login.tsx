import {setAuth} from "../store/slices/authSlice";
import {useDispatch} from "rsl-redux";

function Login() {

    const dispatch = useDispatch()

    function handleLogin(e) {
        e.preventDefault()
        const email = e.target.email.value
        dispatch(setAuth({email: email})).unwrap().then((data) => {
            console.log(data)
        })
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="col-span-4">
                <h1 className="font-semibold text-base">Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Enter email address"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
