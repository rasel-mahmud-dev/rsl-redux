
import {useEffect} from "react";
import {logOut, setAuth} from "../store/slices/authSlice";
import {deletePostAsync, fetchPostsAsync} from "../store/actions/postAction";
import {useDispatch, useSelector} from "rsl-redux/src/index";

function ReduxSlice() {

    const postState = useSelector(state => state.postState)
    const authState = useSelector(state => state.authState)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsAsync())
    }, [])

    function handleDeletePost(postId) {
       dispatch(deletePostAsync(postId))
    }

    function handleLogin(e) {
        e.preventDefault()
        const email = e.target.email.value
        dispatch(setAuth({email: email})).unwrap().then((data)=>{
            console.log(data)
        })
    }
    function handleLogout() {
        dispatch(logOut())
    }

    function handleFetchPosts(){
        dispatch(fetchPostsAsync()).unwrap().then((data)=>{
            console.log(data)
        })
    }


    return (
        <div className="mx-auto max-w-5xl" >

            <div className="flex justify-between">
                <button  className="my-2" onClick={handleFetchPosts}>Fetch post</button>
            </div>

            <div className="grid grid-cols-12 gap-x-10">
                <div className="col-span-8">
                    <h4 className="my-4">Posts ({postState?.posts.length}) {Date.now().toString()}</h4>
                    <div>
                        {postState?.posts?.map(post => (
                            <div key={post.id} style={{display: "flex", justifyContent: "space-between"}}>
                                <li>{post.title}</li>
                                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-4">
                    <h1 className="font-semibold text-base">User info</h1>

                    { authState?.auth &&  <div>
                        <h4>Logged user:</h4>
                        <p>{authState?.auth?.email}</p>

                        <button type="button" onClick={handleLogout}>Log out</button>
                    </div> }

                    { !authState?.auth &&  (
                        <form onSubmit={handleLogin}>
                            <input type="email" name="email" placeholder="Enter email address" />
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReduxSlice
