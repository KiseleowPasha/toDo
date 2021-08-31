import React, { useEffect, useState } from "react";
import {useParams, useLocation, Redirect } from "react-router-dom";
import tasksJSON from "../../db/tasks.json";
import "./toDoList.css";

function ToDoList(){
    const [tasks, setTasks] = useState(tasksJSON);
    const [currentTask, setCurrentTask] = useState("");
    const {text} = useParams();
    const filteredTasks = tasks.filter(task => task[text] === true);
    let sumActiveTasks = 0;
    tasks.forEach(task => task.active ? sumActiveTasks++ : null);
    const {pathname} = useLocation();
    const command = pathname.split("/").splice(2).join("");//ищем либо id, либо текст новой задачи

    const newTask = function (task) {  
        return {    id: Math.random(), 
                    task: task, 
                    completed :false, 
                    active: true, 
                    all: true
                }
    }
    const onChangeInputTask = ({target}) => setCurrentTask(target.value); 

    const onDownEnter = ({code}) => {
        if(code === "Enter")    {
                                    setTasks([...tasks, newTask(currentTask)]);
                                    setCurrentTask("");
                                }
    }

    const completeTask = id => {
            const task = tasks.find(task => task.id === id); 
            task.completed = !task.completed; 
            task.active = !task.active; 
            setTasks([...tasks]);
        }

    const clearComplete = () => setTasks([...tasks.filter(task => task.completed !== true)]);

    const deleteTask = id => setTasks([...tasks.filter(task => task.id !== id)]);

    useEffect(() => {
        if(text === "delete") 
            confirm(`Удалить ${command} задачу?`) ? deleteTask(parseInt(command)) : null;
        if(text === "add") setTasks([...tasks, newTask(command)]);
        if(text === "complete") completeTask(parseInt(command));
    })
  
    return  text === "delete" || text === "add" || text === "complete" ? <Redirect to="/all"/> :      
                <>
                    <input type="text" className="input-task" onChange={onChangeInputTask} value={currentTask} onKeyDown={onDownEnter}/>
                    <div className="tasks">
                        {filteredTasks.map(filteredTask => 
                                                <div key={filteredTask.id} className="task"> 
                                                    <div className="task-button" onClick={() => completeTask(filteredTask.id)}></div>
                                                    {filteredTask.completed ? <s className="task-text">{filteredTask.task}</s> : <span className="task-text">{filteredTask.task}</span>}
                                                    <div className="delete-button" onClick={() => deleteTask(filteredTask.id)}>X</div>
                                                </div>
                        )}
                    </div>
                    <div className="additional-features">
                        <span>Осталось активных : {sumActiveTasks}</span>
                        <span onClick={clearComplete}>Очистить выполненные</span>
                    </div>
                </>
}

export default ToDoList;