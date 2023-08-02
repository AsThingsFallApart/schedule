import styles from "./TaskTableColumnHeader.module.css";
import TaskTableElement from "./TaskTableElement";

export default function TaskTableColumnHeader({
  textContent,
  textContentSub,
}: {
  textContent: string;
  textContentSub: string;
}) {
  return (
    <div className={styles.taskTableColumnHeader}>
      <TaskTableElement
        textContent={textContent}
        textContentSub={textContentSub}
      />
    </div>
  );
}
