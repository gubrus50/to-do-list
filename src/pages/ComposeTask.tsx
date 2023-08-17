import cookies from "../scripts/cookies";
import confirmAction from "../scripts/confirmAction";
import getOrCreateEmptyList from "../scripts/localStorageList";
import { useEffect } from "react";

const input: any = {};

const labelAnimation = (inputTarget: any) => {
  let label = inputTarget.nextSibling || false;

  // Throw Error if not a LABEL Node.
  if (label === false || label.nodeName !== "LABEL")
    throw new Error(
      `Invalid target! Expected LABEL Node, Instead got: ${label}`
    );

  // Transition label to the top when input: contains value, or is in focus.
  if (inputTarget.value.length > 0 || document.activeElement === inputTarget) {
    label.style.transform = "scale(.85) translateY(-.5rem) translateX(.15rem)";
  } else {
    label.style.transform = "none";
  }
};

const createAndSaveValidTask = () => {
  // Return alert on failed validation
  const t_len = input.title.value.length;
  const d_len = input.detail.value.length;

  if (!t_len || !d_len) {
    return alert("Please fill out the form before submitting");
  } else if (t_len > 30 || d_len > 500) {
    return alert("Error illegal length");
  }

  // Construct task object
  const tasks: any = getOrCreateEmptyList("tasks");
  let biggest_id = -1;

  for (let i = 0; i < tasks.length; i++) {
    const task_id: number = tasks[i].id;

    if (task_id > biggest_id) biggest_id = task_id;
  }

  const task = {
    id: ++biggest_id,
    title: input.title.value,
    detail: input.detail.value,
    state: "incomplete",
    creation_date: (() => {
      const d = new Date();
      const date = d.toLocaleDateString("en-UK");
      const time = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return date + " " + time; // dd/mm/yyyy hh:mm
    })(),
  };

  // Save new task in localStorage "tasks" list
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Redirect user to Detailed-Page with newly created task
  location.replace("/task-detail?task_id=" + task.id);
};

const exitToMainPage = () => {
  // Save inputs temporarily
  cookies.set("composeTask_taskTitle", input.title.value, 1);
  cookies.set("composeTask_taskDetail", input.detail.value, 1);
  confirmAction.getResponse(
    "You are about to leave the compose task form, and you will lose your entries upon returning to the main panel."
  );
};

const onActionResponse = () => {
  // Return if actionResponse is not "confirm" nor "cancel"
  const response = confirmAction.response() || null;
  if (response != "confirm" && response != "cancel") return;

  confirmAction.reset();

  // Get temporarily saved data and their responsive inputs
  const taskTitleValue: string = cookies.get("composeTask_taskTitle") || "";
  const taskDetailValue: string = cookies.get("composeTask_taskDetail") || "";

  // Import temporarily saved data on "cancel"
  if (response === "cancel") {
    input.title.value = taskTitleValue;
    input.detail.value = taskDetailValue;
    labelAnimation(input.title);
    labelAnimation(input.detail);
  }
  // Delete temporarily saved data and return to the main page on "confirm"
  else if (response === "confirm") {
    cookies.delete("composeTask_taskTitle");
    cookies.delete("composeTask_taskDetail");
    location.replace("/main");
  }
};

function ComposeTask() {
  const inputClass = "form-control rounded-0 ";

  useEffect(() => {
    input.title = document.getElementById("taskTitle");
    input.detail = document.getElementById("taskDetail");
    onActionResponse();
  });

  return (
    <>
      <form
        className="container-fluid d-flex vh-100 pt-2"
        style={{ flexFlow: "column", maxWidth: "1280px" }}
      >
        <div className="form-floating">
          <input
            type="email"
            className={inputClass.concat(" fs-2")}
            onChange={(e) => labelAnimation(e.target)}
            onFocus={(e) => labelAnimation(e.target)}
            onBlur={(e) => labelAnimation(e.target)}
            id="taskTitle"
          />
          <label htmlFor="taskTitle" style={{ transform: "none" }}>
            My Task
          </label>
        </div>

        <div
          className="form-floating row-fluid my-2"
          style={{ flex: "1 1 auto" }}
        >
          <textarea
            className={inputClass.concat(" fs-4 from-floating h-100")}
            onChange={(e) => labelAnimation(e.target)}
            onFocus={(e) => labelAnimation(e.target)}
            onBlur={(e) => labelAnimation(e.target)}
            id="taskDetail"
          ></textarea>
          <label htmlFor="taskDetail" style={{ transform: "none" }}>
            Task's details
          </label>
        </div>

        <div
          className="d-flex justify-content-between mt-2"
          role="group"
          aria-label="options"
          style={{ marginBottom: "15vh" }}
        >
          <button
            type="button"
            className="btn btn-danger rounded-0 fw-semibold me-3 w-25"
            onClick={() => exitToMainPage()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success rounded-0 fw-semibold w-75"
            onClick={() => createAndSaveValidTask()}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default ComposeTask;
