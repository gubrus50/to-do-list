let tasks = [
  "Organize your bookshelf",
  "Wash the dishes and clean the kitchen",
  "Vacuum the entire house",
  "Sort and declutter your wardrobe",
  "Clean the windows",
  "Dust and wipe down all surfaces",
  "Sweep and mop the floors",
  "Take out the trash and recycling",
  "Water the plants and tend to the garden",
  "Rearrange the furniture in one room",
  "Clean out the refrigerator and throw away expired items",
  "Scrub the bathroom tiles and clean the bathtub",
  "Wash and change the bed sheets",
  "Wipe down and sanitize all doorknobs and light switches",
  "Organize your desk and workspace",
];

function Tasks() {
  const tasksClass = "btn text-start text-break rounded-0 w-100 fs-6";

  return (
    <>
      {tasks.map((task, index) => {
        const random = Math.round(Math.random());

        return (
          <a
            key={index}
            href={`#${task}`}
            className={
              random === 1
                ? tasksClass.concat(" btn-success")
                : tasksClass.concat(" btn-dark")
            }
            draggable="false"
          >
            {task}
          </a>
        );
      })}
    </>
  );
}

export default Tasks;
