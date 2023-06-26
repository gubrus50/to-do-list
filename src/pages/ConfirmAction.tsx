function ConfirmAction() {
  return (
    <>
      <div
        className="container-fluid d-flex flex-column mt-3"
        style={{ maxWidth: "1280px" }}
      >
        <section
          className="bg-white text-black rounded-2 p-4 fs-2"
          aria-label="about action"
        >
          <p>
            <strong>Warning!</strong> blah blah blah...
          </p>
          <p className="fs-4">
            Are you sure you want to proceed with this action?
          </p>
        </section>

        <section
          className="d-flex flex-column my-3"
          role="group"
          aria-label="options"
        >
          <button
            type="button"
            className="btn btn-danger rounded-0 fw-semibold mb-3"
            onClick={() => location.replace("/main")}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary rounded-0 fw-semibold"
          >
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default ConfirmAction;
