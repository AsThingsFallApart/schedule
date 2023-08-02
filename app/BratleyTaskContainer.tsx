import styles from "./BratleyTaskContainer.module.css";
import BratleyTask from "./BratleyTask";
import BratleyTaskText from "./BratleyTaskText";
import { useRef } from "react";

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

export default function BratleyTaskContainer({
  task,
  height,
}: {
  task: BratleyTask;
  height: number;
}) {
  const visibility = task.feasible ? "visible" : "hidden";

  const worstCaseCompTimeStyle = {};
  const bratleyTaskContainerStyle = {
    height: `${height}vh`,
    width: `${height}vh`,
    visibility: `${visibility}`,
  };

  return (
    <div
      className={styles.bratleyTaskContainer}
      style={bratleyTaskContainerStyle as React.CSSProperties}
    >
      <BratleyTaskText
        textContent={task.worstCaseCompTime.toString(10)}
        top={0}
        right={0}
      />
      <BratleyTask
        task={task}
        taskIdentifier={task.name.substring(1)}
        taskHeight={height - 2}
        isFeasible={task.feasible}
      />
    </div>
  );
}
