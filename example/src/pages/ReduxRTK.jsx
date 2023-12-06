import React from 'react';
import {deletePostMutation, getTodos} from "../store/api/todoApi";


const ReduxRtk = () => {

    let { isLoading, data: todos } = getTodos()

    let [deletePost] = deletePostMutation()


    if(isLoading){
        return (
            <div className="mx-auto border-4 border-pink-500 animate-spin h-14 w-14"> </div>
        )
    }

    function handleDelete(todoId) {
        let result = deletePost({id: todoId})
        console.log(result)
    }

    return (
        <div>
            {
                todos?.map(todo=>(
                    <div key={todo.id} className="py-2 flex justify-between" >
                        <p className="text-sm ">{todo.title}</p>
                        <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    );
};

export default ReduxRtk;