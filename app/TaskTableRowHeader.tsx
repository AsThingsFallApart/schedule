import styles from "./TaskTableRowHeader.module.css";
import TaskTableElement from "./TaskTableElement";
import { text } from "stream/consumers";

export default function TaskTableRowHeader({
  textContent,
  textContentSub,
}: {
  textContent: string;
  textContentSub: string;
}) {
  return (
    <div className={styles.taskTableRowHeader}>
      <TaskTableElement
        textContent={textContent}
        textContentSub={textContentSub}
      />
    </div>
  );
}
