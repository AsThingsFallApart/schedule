import {
  SetStateAction,
  Dispatch,
  useState,
  MouseEvent,
  AnimationEvent,
} from "react";
import styles from "./HorizontalViewSplit.module.css";
import ProgressionView from "./ProgressionView";
import TaskTable from "./TaskTable";
import ResizableIndicator from "./ResizableIndicator";

interface Task {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
}

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

export default function HorizontalViewSplit({
  allUpdates,
  setAllUpdates,
  allTasks,
  setAllTasks,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setLowerGridViewportHeight,
  setUpperGridViewportHeight,
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
}: {
  allUpdates: Array<string>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  realTimeEnvironment: string[];
  setRealTimeEnvironment: Dispatch<SetStateAction<string[]>>;
  setLowerGridViewportHeight: Dispatch<SetStateAction<number>>;
  setUpperGridViewportHeight: Dispatch<SetStateAction<number>>;
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
}) {
  const [isProgressionViewCollapsed, setIsProgressionViewCollapsed] =
    useState(false);
  const [isProgViewResizerFacingRight, setIsProgViewResizerFacingRight] =
    useState(false);
  const [gridColumnsWidth, setGridColumnsWidth] = useState("50vw 50vw");

  // TODO: make distance between collapsed progression view and expanded task table = default margin
  function collapseProgressionView(e: MouseEvent) {
    setIsProgressionViewCollapsed((collapseStatus) => (collapseStatus = true));
    setGridColumnsWidth((columnsWidth) => (columnsWidth = "3vw 97vw"));
  }

  function expandProgressionView(e: MouseEvent) {
    setIsProgressionViewCollapsed((collapseStatus) => (collapseStatus = false));
    setGridColumnsWidth((columnsWidth) => (columnsWidth = "50vw 50vw"));
  }

  const resizeAni: string = isProgressionViewCollapsed
    ? `1000ms cubic-bezier(0.17,0.84,0.44,1) ${styles.collapseProgressionView}`
    : `1000ms cubic-bezier(0.17,0.84,0.44,1) ${styles.expandProgressionView}`;

  const horizontalViewSplitStyle = {
    animation: `${resizeAni}`,
    gridTemplateColumns: `${gridColumnsWidth}`,
  };

  function handleAnimationEnd(e: AnimationEvent) {
    e.stopPropagation();

    setIsProgViewResizerFacingRight((progViewResizerFacingRightStatus) =>
      isProgressionViewCollapsed
        ? (progViewResizerFacingRightStatus = true)
        : (progViewResizerFacingRightStatus = false)
    );
    // console.log("progression view resize animation ended.");
  }

  return (
    <div
      className={styles.horizontalViewSplit}
      style={horizontalViewSplitStyle}
      onAnimationEnd={handleAnimationEnd}
    >
      <ResizableIndicator
        setLowerHeight={setLowerGridViewportHeight}
        setUpperHeight={setUpperGridViewportHeight}
      />
      <ProgressionView
        allUpdates={allUpdates}
        isCollapsed={isProgressionViewCollapsed}
        collapseProgressionView={collapseProgressionView}
        expandProgressionView={expandProgressionView}
        isResizerFacingRight={isProgViewResizerFacingRight}
      />
      <TaskTable
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setAllUpdates={setAllUpdates}
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
