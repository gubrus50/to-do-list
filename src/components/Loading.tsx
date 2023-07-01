interface Props {
  message: string;
}

function Loading({ message = "Loading..." }) {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <span
        className="spinner-border spinner-border-sm text-light"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="sr-only ms-2">{message}</span>
    </div>
  );
}

export default Loading;
