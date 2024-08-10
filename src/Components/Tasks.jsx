import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { MdChecklist } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, checkTask } from "../Rtk/ToDoSlice";
function Tasks() {
  
  const dispatch = useDispatch();
  const TaskList = useSelector((state) => state.ToDos.ToDoList);
  const [date, setdate] = useState("");
  const [Input, SetINput] = useState("");
  const [message, setmessage] = useState("");

  const payload = {
    id: Date.now(),
    name: Input,
    status: false,
  };
  // to handle Add task
  const handlesubmit = (e) => {
    e.preventDefault();
    if (Input) {
      dispatch(addTask(payload));

      setmessage("Adding New Task");
      setTimeout(() => {
        setmessage("");
      }, 2000);
      SetINput("");
    } else {
      setmessage("Enter Valid Task");
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };
  // to handle task status
  const handleChange = (Taskid) => {
    dispatch(checkTask(Taskid));
  };

  // handle choose what tasks to show
  const [Tasks, setTasks] = useState([]);
  const [activeTaskType, setactiveTaskType] = useState("ALL");
  const handleshowingTasks = (statuschoose) => {
    setactiveTaskType(statuschoose);
    if (statuschoose == "ALL") {
      setTasks(TaskList);
    } else if (statuschoose == "active") {
      setTasks(TaskList.filter((task) => task.status == false));
    } else {
      setTasks(TaskList.filter((task) => task.status == true));
    }
  };
  // get current date
  const Todaydate = new Date();
  const formattedDate = Todaydate.toDateString();

  // Add Tasks To Local Storage
 

  useEffect(() => {
    setTasks(TaskList);
    setdate(formattedDate);
   
  }, [TaskList]);

  return (
    <div className="container">
      <div className="Heading">
        <div className="title">
          <MdChecklist style={{ fontSize: "23px" }} />
          <h2>&nbsp;Awesome Todo List</h2>
        </div>
        <h4>{date}</h4>
      </div>
      <div className="TOdOContent">
        <p
          className="Message"
          style={
            message == "Adding New Task" ? { color: "green" } : { color: "red" }
          }
        >
          {message}
        </p>
        <div className="AddNewTask">
          <form onSubmit={handlesubmit}>
            <input
              type="text"
              placeholder="New Task..."
              autoFocus={true}
              onChange={(e) => SetINput(e.target.value)}
              value={Input}
            />
            <button type="submit">ADD</button>
          </form>
        </div>
        <div className="Tasks">
          <div className="TasksTypes">
            <ul>
              <li
                className={activeTaskType === "ALL" ? "active" : ""}
                onClick={() => handleshowingTasks("ALL")}
              >
                ALL
              </li>
              <li
                className={activeTaskType === "active" ? "active" : ""}
                onClick={() => handleshowingTasks("active")}
              >
                active
              </li>
              <li
                className={activeTaskType === "Completed" ? "active" : ""}
                onClick={() => handleshowingTasks("Completed")}
              >
                Completed
              </li>
            </ul>
          </div>

          <div className="ShowingTasks">
            {Tasks.length > 0 ? (
              Tasks.map((task) => (
                <div className="Task" key={task.id}>
                  <input
                    type="checkbox"
                    id={task.id}
                    checked={task.status}
                    onChange={() => handleChange(task.id)}
                  />

                  <label
                    htmlFor={task.id}
                    style={
                      task.status == true
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {task.name}
                  </label>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "10px" }}>
                <h2>start Your Day Now 😊</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
