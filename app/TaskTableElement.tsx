import styles from "./TaskTableElement.module.css";

export default function TaskTableElement({
  textContent,
  textContentSub,
  isTaskDeadlineHovered,
  isTaskDeadlineClicked,
}: {
  textContent: string;
  textContentSub: string;
  isTaskDeadlineHovered?: boolean;
  isTaskDeadlineClicked?: boolean;
}) {
  let ani: string = "";

  if (isTaskDeadlineHovered) {
    ani = `1000ms linear forwards alternate ${styles.pulse}`;
  }

  if (isTaskDeadlineClicked) {
    ani = `1000ms linear forwards ${styles.pulse}`;
  }

  if (!isTaskDeadlineHovered && !isTaskDeadlineClicked) {
    ani = `1000ms linear forwards reverse ${styles.pulse}`;
  }

  const taskTableElementStyle = { animation: `${ani}` };

  return (
    <span className={styles.taskTableElement} style={taskTableElementStyle}>
      {textContent + " "}
      <span
        className={styles.taskTableElementSub}
        style={taskTableElementStyle}
      >
        {textContentSub}
      </span>
    </span>
  );
}
