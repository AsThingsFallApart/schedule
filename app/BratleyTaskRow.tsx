import BratleyTask from "./BratleyTask";
import BratleyTaskContainer from "./BratleyTaskContainer";
import styles from "./BratleyTaskRow.module.css";

interface BratleyTask {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
  predecessorNames: Array<number>;
  predecessorWorstCaseCompTimes: Array<number>;
  worstCaseCompTime: number;
  feasible: boolean;
}

export default function BratleyTaskRow({
  breadth,
  taskHeight,
}: {
  breadth: Array<BratleyTask>;
  taskHeight: number;
}) {
  return (
    <div className={styles.bratleyTaskRow}>
      {breadth.map((task, taskIndex) => (
        <BratleyTaskContainer key={taskIndex} task={task} height={taskHeight} />
      ))}
    </div>
  );
}
