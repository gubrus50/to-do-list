import homeIcon from "../assets/home.svg";
import Loading from "../components/Loading";
import confirmAction from "../scripts/confirmAction";
import getOrCreateEmptyList from "../scripts/localStorageList";
import { useState, useEffect } from "react";

const getQueryParameterTaskId = () => {
  const query_string = location.search;
  const query_parameters = query_string.substring(1).split("&");

  for (let i = 0; i < query_parameters.length; i++) {
    const param: string = query_parameters[i];

    if (param.substring(0, 8) === "task_id=") {
      const task_id = param.substring(8);

      if (task_id.length > 0) return Number(task_id);
      break;
    }
  }

  return null;
};

const getTaskFromQuery = () => {
  const tasks: any = getOrCreateEmptyList("tasks");
  const param_task_id: any = getQueryParameterTaskId();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.id === param_task_id) return task;
  }

  return null;
};

const Task = getTaskFromQuery();

const deleteTask = () => {
  const response = confirmAction.response() || null;
  if (response != "confirm") return;

  confirmAction.reset();
  const tasks: any = getOrCreateEmptyList("tasks");

  for (let i = 0; i < tasks.length; i++) {
    // Remove Task from tasks
    if (tasks[i].id === Task.id) {
      tasks.splice(i, 1);
      break;
    }
  }

  // Replace old tasks in localStorage (save changes)
  // and redirect user to main
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.replace("/main");
};

function TaskDetail() {
  if (Task === null) {
    location.replace("/main");
    return <Loading message="Redirecting to main page" />;
  }

  useEffect(() => {
    deleteTask();
  });

  const [taskState, setTaskState] = useState(Task.state);
  const updateTaskState = () => {
    // Update state
    if (taskState === "complete") {
      setTaskState("incomplete");
      Task.state = "incomplete";
    } else if (taskState === "incomplete") {
      setTaskState("complete");
      Task.state = "complete";
    }

    // Save updated task
    const tasks: any = JSON.parse(localStorage.getItem("tasks") || "") || [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === Task.id) {
        tasks[i].state = Task.state;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        break;
      }
    }
  };

  return (
    <>
      <nav
        className="d-flex"
        role="group"
        aria-label="navigation"
        style={{ height: "45px" }}
      >
        <a
          href="/main"
          className="btn btn-warning fw-semibold rounded-0"
          draggable="false"
        >
          <img width="25" src={homeIcon}></img>
        </a>
        <div
          className={`btn text-start text-break rounded-0 fs-5 flex-fill text-nowrap overflow-hidden ${
            taskState === "complete" ? "btn-success" : "btn-secondary"
          }`}
          style={{ textOverflow: "ellipsis" }}
        >
          {Task.title}
        </div>
      </nav>
      <hr className="border-white m-0"></hr>

      <article
        aria-label="About task"
        className="container-fluid fs-6 text-break px-3 mt-4 fw-light"
        id="taskDetail"
      >
        <section aria-label="Task's details">
          <h2 className="fs-5">Task's Details</h2>
          <p className="my-3">{Task.detail}</p>
          <hr className="border-white m-0"></hr>
        </section>

        <section
          aria-label="Task's creation date"
          className="mt-3 align-baseline"
        >
          <h2 className="fs-6 me-3 d-inline">Created</h2>
          <p style={{ float: "right" }}>{Task.creation_date}</p>
        </section>
      </article>

      <div
        className="container-fluid mt-5 d-flex justify-content-between"
        role="group"
        aria-label="options"
      >
        <button
          type="button"
          className="btn btn-danger rounded-0 fw-semibold me-3 w-25"
          onClick={() =>
            confirmAction.getResponse(
              `You are about to delete the task: ${Task.title}`
            )
          }
        >
          Delete
        </button>
        <button
          type="button"
          className={`btn rounded-0 fw-semibold w-75 ${
            taskState === "complete" ? "btn-light" : "btn-success"
          }`}
          onClick={() => updateTaskState()}
        >
          {taskState === "complete" ? "Redo" : "Complete"}
        </button>
      </div>
    </>
  );
}

export default TaskDetail;
