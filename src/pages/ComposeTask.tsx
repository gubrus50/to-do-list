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

function ComposeTask() {
  const inputClass = "form-control rounded-0 ";

  return (
    <>
      <form
        className="container-fluid d-flex vh-100 pt-2"
        style={{ flexFlow: "column" }}
      >
        <div className="form-floating mb-1">
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

        <div className="form-floating row-fluid" style={{ flex: "1 1 auto" }}>
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
          className="btn-group mt-1"
          role="group"
          aria-label="options"
          style={{ marginBottom: "15vh" }}
        >
          <button
            type="button"
            className="btn btn-warning rounded-0 fw-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success rounded-0 fw-semibold"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default ComposeTask;
