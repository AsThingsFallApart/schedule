import styles from "./Task.module.css";
import TaskTableElement from "./TaskTableElement";

export default function Task({
  width,
  height,
  taskName,
  taskComputationTime,
  isTaskCompTimeHovered,
  isTaskCompTimeClicked,
}: {
  width: number;
  height: number;
  taskName: string;
  taskComputationTime: number;
  isTaskCompTimeHovered: boolean;
  isTaskCompTimeClicked: boolean;
}) {
  let ani: string = "";

  if (isTaskCompTimeHovered) {
    ani = `1000ms linear forwards alternate ${styles.pulse}`;
  }

  if (isTaskCompTimeClicked) {
    ani = `1000ms cubic-bezier(0.22,0.61,0.36,1) forwards ${styles.pulse}`;
  }

  if (!isTaskCompTimeHovered && !isTaskCompTimeClicked) {
    ani = `1000ms cubic-bezier(0.76,0.05,0.86,0.06) forwards reverse ${styles.pulse}`;
  }

  const taskStyle = {
    width: `calc(${width}vw)`,
    height: `${height}px`,
    outline: `1px solid black`,
    animation: `${ani}`,
  };

  return (
    <div className={styles.task} style={taskStyle}>
      <TaskTableElement
        textContent={taskName.substring(0, 1)}
        textContentSub={taskName.substring(1)}
      />
    </div>
  );
}
