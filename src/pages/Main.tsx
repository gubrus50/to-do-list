import { useState } from "react";
import Tasks from "../components/Tasks";

function Main() {
  const [selected, setSelectedIndex] = useState(0);
  const navOptions = new Set(["All", "Done", "ToDo", "+"]);
  const navOptionsClass = "nav-item nav-link text-light fw-semibold p-2";

  return (
    <>
      <nav className="navbar nav-fill navbar-expand-lg bg-dark p-0">
        {Array.from(navOptions).map((option, index) => {
          const state: any = index === selected ? true : null;

          return (
            <button
              className={
                state === true
                  ? navOptionsClass.concat(
                      " bg-warning text-dark fw-bold active"
                    )
                  : navOptionsClass
              }
              onClick={() => {
                setSelectedIndex(index);
                {
                  option === "+"
                    ? location.replace("/compose-task")
                    : location.replace(`#${option}`);
                }
              }}
              style={{ minWidth: "50px" }}
              aria-current={state}
              type="button"
              key={option}
            >
              {option}
            </button>
          );
        })}
      </nav>
      <hr className="border-white m-0"></hr>
      <Tasks />
    </>
  );
}

export default Main;
