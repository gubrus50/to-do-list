import { useState } from "react";
import homeIcon from "../assets/home.svg";

function TaskDetail() {
  // taskState: 1 - complete, 0 - unfinished
  const [taskState, setTaskState] = useState(0);

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
            taskState === 1 ? "btn-success" : "btn-secondary"
          }`}
          style={{ textOverflow: "ellipsis" }}
        >
          sdsd
          sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd
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
          <p className="my-3">
            sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd
          </p>
          <hr className="border-white m-0"></hr>
        </section>

        <section
          aria-label="Task's creation date"
          className="mt-3 align-baseline"
        >
          <h2 className="fs-6 me-3 d-inline">Created</h2>
          <p style={{ float: "right" }}>dd/mm/yyyy time</p>
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
          onClick={() => location.replace("/confirm-action")}
        >
          Delete
        </button>
        <button
          type="button"
          className={`btn rounded-0 fw-semibold w-75 ${
            taskState === 1 ? "btn-light" : "btn-success"
          }`}
          onClick={() => {
            taskState === 0 ? setTaskState(1) : setTaskState(0);
          }}
        >
          {taskState === 1 ? "Redo" : "Complete"}
        </button>
      </div>
    </>
  );
}

export default TaskDetail;
