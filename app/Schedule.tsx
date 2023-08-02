import styles from "./Schedule.module.css";
import Timeline from "./Timeline";
import TaskSequence from "./TaskSequence";
import DeadlineSequence from "./DeadlineSequence";

interface Task {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
}

export default function Schedule({
  sortedTaskSet,
  scheduleEndTick,
  algorithm,
  isTaskCompTimeHovered,
  isTaskCompTimeClicked,
  isTaskDeadlineHovered,
  isTaskDeadlineClicked,
  sortedSequence,
}: {
  sortedTaskSet: Array<Task>;
  scheduleEndTick: number;
  algorithm: string;
  isTaskCompTimeHovered: Array<boolean>;
  isTaskCompTimeClicked: Array<boolean>;
  isTaskDeadlineHovered: Array<boolean>;
  isTaskDeadlineClicked: Array<boolean>;
  sortedSequence: Array<number>;
}) {
  const scheduleWidth: number = 80;
  const scheduleHeight: number = 10;
  let timelineTicks: Array<number> = [];
  for (let i = 0; i < scheduleEndTick; i++) {
    timelineTicks.push(i);
  }

  return (
    <div className={styles.flexCenter}>
      <DeadlineSequence
        sortedTaskSet={sortedTaskSet}
        scheduleWidth={scheduleWidth}
        scheduleHeight={scheduleHeight}
        nTicks={scheduleEndTick}
        isTaskDeadlineHovered={isTaskDeadlineHovered}
        isTaskDeadlineClicked={isTaskDeadlineClicked}
        sortedSequence={sortedSequence}
      />
      <TaskSequence
        sortedTaskSet={sortedTaskSet}
        scheduleWidth={scheduleWidth}
        scheduleHeight={scheduleHeight}
        nTicks={scheduleEndTick}
        isTaskCompTimeHovered={isTaskCompTimeHovered}
        isTaskCompTimeClicked={isTaskCompTimeClicked}
      />
      <Timeline
        scheduleWidth={scheduleWidth}
        scheduleHeight={scheduleHeight}
        nTicks={scheduleEndTick}
      />
    </div>
  );
}
