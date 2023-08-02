import styles from "./ViewSplit.module.css";
import Schedule from "./Schedule";
import HorizontalViewSplit from "./HorizontalViewSplit";
import { SetStateAction, Dispatch, useState } from "react";
import BratleyView from "./BratleyView";

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

export default function ViewSplit({
  sortedTaskSet,
  scheduleEndTick,
  algorithm,
  allUpdates,
  setAllUpdates,
  allTasks,
  setAllTasks,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setIsButtonClicked,
  isTaskCompTimeHovered,
  setIsTaskCompTimeHovered,
  isTaskCompTimeClicked,
  setIsTaskCompTimeClicked,
  isTaskDeadlineHovered,
  setIsTaskDeadlineHovered,
  isTaskDeadlineClicked,
  setIsTaskDeadlineClicked,
  sortedSequence,
  bratleyBreadths,
}: {
  sortedTaskSet: Array<BratleyTask>;
  scheduleEndTick: number;
  algorithm: string;
  allUpdates: Array<string>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  realTimeEnvironment: string[];
  setRealTimeEnvironment: Dispatch<SetStateAction<string[]>>;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
  isTaskCompTimeHovered: Array<boolean>;
  setIsTaskCompTimeHovered: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskCompTimeClicked: Array<boolean>;
  setIsTaskCompTimeClicked: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskDeadlineHovered: Array<boolean>;
  setIsTaskDeadlineHovered: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskDeadlineClicked: Array<boolean>;
  setIsTaskDeadlineClicked: Dispatch<SetStateAction<Array<boolean>>>;
  sortedSequence: Array<number>;
  bratleyBreadths: Array<Array<BratleyTask>>;
}) {
  const [lowerGridRowViewportHeight, setLowerGridViewportHeight] = useState(30);
  const [upperGridRowViewportHeight, setUpperGridViewportHeight] = useState(70);

  let visualizedSchedule: JSX.Element = <div></div>;

  console.log(`bratleyBreadths:`);
  console.dir(bratleyBreadths);

  switch (algorithm) {
    case "bratleys":
      visualizedSchedule = (
        <BratleyView
          bratleyBreadths={bratleyBreadths}
          viewHeight={upperGridRowViewportHeight}
        />
      );

      break;
    case "earliestDueDate":
      visualizedSchedule = (
        <Schedule
          sortedTaskSet={sortedTaskSet}
          algorithm={algorithm}
          scheduleEndTick={scheduleEndTick}
          isTaskCompTimeHovered={isTaskCompTimeHovered}
          isTaskCompTimeClicked={isTaskCompTimeClicked}
          isTaskDeadlineHovered={isTaskDeadlineHovered}
          isTaskDeadlineClicked={isTaskDeadlineClicked}
          sortedSequence={sortedSequence}
        />
      );

      break;
  }

  return (
    <div
      className={styles.viewSplit}
      style={{
        gridTemplateRows: `${
          100 - lowerGridRowViewportHeight
        }vh ${lowerGridRowViewportHeight}vh`,
      }}
    >
      {visualizedSchedule}
      <HorizontalViewSplit
        allUpdates={allUpdates}
        setAllUpdates={setAllUpdates}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setLowerGridViewportHeight={setLowerGridViewportHeight}
        setUpperGridViewportHeight={setUpperGridViewportHeight}
        setIsButtonClicked={setIsButtonClicked}
        isTaskCompTimeHovered={isTaskCompTimeHovered}
        setIsTaskCompTimeHovered={setIsTaskCompTimeHovered}
        isTaskCompTimeClicked={isTaskCompTimeClicked}
        setIsTaskCompTimeClicked={setIsTaskCompTimeClicked}
        isTaskDeadlineHovered={isTaskDeadlineHovered}
        setIsTaskDeadlineHovered={setIsTaskDeadlineHovered}
        isTaskDeadlineClicked={isTaskDeadlineClicked}
        setIsTaskDeadlineClicked={setIsTaskDeadlineClicked}
        sortedSequence={sortedSequence}
      />
    </div>
  );
}
