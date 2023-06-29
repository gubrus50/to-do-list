import cookies from "../scripts/cookies";
import confirmAction from "../scripts/confirmAction";
import { useState, useEffect } from "react";

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

const buttonCancelPressed = () => {
  const elmTaskTitle: any = document.getElementById("taskTitle");
  const elmTaskDetail: any = document.getElementById("taskDetail");

  // Save inputs temporarily
  cookies.set("composeTask_taskTitle", elmTaskTitle.value, 1);
  cookies.set("composeTask_taskDetail", elmTaskDetail.value, 1);
  confirmAction.getResponse(
    "You are about to leave the compose task form, and you will lose your entries upon returning to the main panel."
  );
};

const OnActionResponse = () => {
  // Return if actionResponse if not "confirm" nor "cancel"
  const response = confirmAction.response() || null;
  if (response != "confirm" && response != "cancel") return;

  confirmAction.reset();

  // Get temporarily saved data and their responsive inputs
  const taskTitleValue: string = cookies.get("composeTask_taskTitle") || "";
  const taskDetailValue: string = cookies.get("composeTask_taskDetail") || "";
  const elmTaskTitle: any = document.getElementById("taskTitle");
  const elmTaskDetail: any = document.getElementById("taskDetail");

  // Import temporarily saved data on "cancel"
  if (response === "cancel") {
    elmTaskTitle.value = taskTitleValue;
    elmTaskDetail.value = taskDetailValue;
    labelAnimation(elmTaskTitle);
    labelAnimation(elmTaskDetail);
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
  useEffect(() => OnActionResponse());

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
            onClick={() => buttonCancelPressed()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success rounded-0 fw-semibold w-75"
            onClick={() => location.replace("/task-detail")}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default ComposeTask;
