import React, { useEffect } from "react";
import {Provider, useDispatch, useSelector} from "react-redux"
import ReactDOM from "react-dom";
import {taskCompleted, titleChanged, removeTask, loadTasks, getTasks, createTask} from './store/tasks'
import { initiateStore } from "./store/store";

const App = (params) => {
    const dispatch = useDispatch()
    const state = useSelector(getTasks())
    useEffect(() => {
        dispatch(loadTasks())
    }, []);

    const completeTask = (taskId) => {
        dispatch(taskCompleted(taskId));
    };
    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(removeTask(taskId));
    }
    const addTask = (task) => {
        dispatch(createTask(task))
    }

    return (
        <>
            <h1> App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p> {`Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => addTask({completed:false, title: "Solve the hometask"})}>
                Add Task
                </button>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store = {initiateStore()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
