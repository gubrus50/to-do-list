interface Props {
  show: string;
}

function Tasks({ show = "all" }) {
  const tasksClass = "btn text-start text-break rounded-0 w-100 fs-6";
  const tasks: any = JSON.parse(localStorage.getItem("tasks") || "") || [];

  show = show.toLowerCase();

  return (
    <>
      {tasks.map((task: any) => {
        if (show != "all" && task.state != show) return null;

        return (
          <div
            key={task.id}
            style={{ borderBottom: "1px solid rgba(255,255,255,.25)" }}
          >
            <a
              href={`/task-detail?task_id=${task.id}`}
              className={
                task.state === "complete"
                  ? tasksClass.concat(" btn-success")
                  : tasksClass.concat(" btn-dark")
              }
              draggable="false"
            >
              {task.title}
            </a>
          </div>
        );
      })}
    </>
  );
}

export default Tasks;
