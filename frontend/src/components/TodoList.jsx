import React from 'react'
import { useEffect, useState } from 'react';
import { BASE_URL, network } from "../network/axiosInstance"
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

function TodoList() {
    const [todos, setTodos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newToDo, setNewToDo] = useState({
        text: "",
        isCompleted: false,
        isDeleted: false
    })
    const [updatedToDo, setUpdatedToDo] = useState(
        {   
            id:undefined,
            text: "",
        }
    )
    const { data, isLoading, refetch } = useQuery(
        "todos",
        async () => {
            return network.getAll(BASE_URL)
                .then(res => {
                    // console.log(res)
                    setTodos(res)
                })
        },
    );
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newToDo.text != "") {
            network.addItem(BASE_URL, newToDo)
                .then(() => {
                    refetch()
                    toast("İnformation added!")
                })
        } else {
            alert("Fill in the information completely")
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        setNewToDo(
            {
                text: value,
                isCompleted: false,
                isDeleted: false
            }
        )
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = (id) => {
        network.deleteItem(BASE_URL, id)
            .then(() => {
                refetch()
                toast("İnformation deleted!")
            })
    }
    const handleUpdate = (item) => {
        setIsModalOpen(true);
        setUpdatedToDo({
            id: item._id,
            text: item.text,
            isCompleted: false,
            isDeleted: false
        })
    }
    const handleUpdated = (e) => {
        const value = e.target.value
        setUpdatedToDo(
            {   
                id:updatedToDo.id,  
                text: value,
                isCompleted: false,
                isDeleted: false
            }
        )
    }
    const handleOk = () => {
        setIsModalOpen(false);
        network.updateItem(BASE_URL, updatedToDo.id, updatedToDo)
            .then(() => {
                refetch()
                toast("İnformation has been updated!")
            })
    };
    const handleCopmleted=(id,situation)=>{
        // console.log(id,situation)
        network.updateItem(BASE_URL, id, {isCompleted:situation})
        .then(() => {
            refetch()
            toast("İnformation has been updated!")
        })
    }
    return (
        <div className='container'>
            <ToastContainer />
            <div className='todocontainer'>
                <h1>To Do App</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" id='todo' name='todo' onChange={handleChange} />
                    <button className='addbtn'>Add ToDo</button>
                </form>
                <ul className='todo-list'>
                    {
                        todos && (
                            todos.map((x, i) => (
                                <div className='todo' id={x.isCompleted ? "completed" : ""} key={x._id}>
                                    <li>{x.text}</li>
                                    <div className='btns'>
                                        <button className='completeBtn' onClick={()=>handleCopmleted(x._id,x.isCompleted ? false : true)}>{x.isCompleted ? "completed" : "uncompleted"}</button>
                                        <button onClick={() => handleUpdate(x)}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => handleDelete(x._id)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                        {
                            updatedToDo && (
                                <div className='modal'>
                                    <div>
                                        <input type="text" value={updatedToDo.text} name='text' id='text' onChange={handleUpdated} />
                                    </div>
                                </div>
                            )
                        }
                    </Modal>
                </ul>
            </div>
        </div>
    )
}

export default TodoList
