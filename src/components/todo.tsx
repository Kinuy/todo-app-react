import "./todo.css"
import {ChangeEvent, useState} from "react";

export default function Todo() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);

        setTasks(updatedTasks);
    }

    function moveTaskUp(index: number) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index: number) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setTasks(updatedTasks);
        }
    }


    return (
        <div className="todo-list">
            <h1>ToDos</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}/>
                <button className="add-button"
                        onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>

                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            move up
                        </button>

                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            move down
                        </button>
                    </li>
                )}
            </ol>

        </div>)
}
