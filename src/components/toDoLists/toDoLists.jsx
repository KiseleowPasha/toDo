import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import ToDoList from "../toDoList/toDoList";
import "./toDoLists.css";

function ToDoLists(){
    return  <div className="toDo-Lists">
                <h2>ToDo</h2>
                <Switch>
                    <Route path="/:text">
                        <ToDoList/>
                    </Route>
                </Switch>
                <div className="switches">
                    <Link to="/all">All</Link>
                    <Link to="/active">Active</Link>
                    <Link to="/completed">Completed</Link>
                </div>
            </div>
}

export default ToDoLists;