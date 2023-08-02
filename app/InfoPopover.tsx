import styles from "./InfoPopover.module.css";

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

export default function InfoPopover({
  task,
  top,
  left,
}: {
  task: BratleyTask;
  top: number;
  left: number;
}) {
  const taskName = `Name:\t${task.name}`;
  const taskCompTime = `CompTime:\t${task.computationTime}`;
  const taskDeadline = `Deadline:\t${task.deadline}`;
  const taskArrival = `Arrival:\t${task.arrival}`;
  const taskWorstCaseCompTime = `WorstCase:\t${task.worstCaseCompTime}`;

  // console.log("InfoPopover trying to render...");

  const infoPopoverStyle = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
  };

  return (
    <div
      className={styles.infoPopover}
      style={infoPopoverStyle as React.CSSProperties}
    >
      <span>{taskName}</span>
      <span>{taskCompTime}</span>
      <span>{taskDeadline}</span>
      <span>{taskArrival}</span>
      <span>{taskWorstCaseCompTime}</span>
    </div>
  );
}
