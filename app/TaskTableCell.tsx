import styles from "./TaskTableCell.module.css";
import TaskTableElement from "./TaskTableElement";
import {
  useState,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";

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

export default function TaskTableCell({
  textContent,
  textContentSub,
  rowIndex,
  columnIndex,
  allTasks,
  setAllTasks,
  setAllUpdates,
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
  textContent: string;
  textContentSub: string;
  rowIndex: number;
  columnIndex: number;
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
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
  const [isBeingHovered, setIsBeingHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [oldCellValue, setOldCellValue] = useState(0);

  function handleMouseEnter(e: MouseEvent) {
    setIsBeingHovered((hoverStatus) => (hoverStatus = true));

    const taskIndex = columnIndex - 1;
    let nextTaskCompTimeHovered: Array<boolean> = [];
    let nextTaskDeadlineHovered: Array<boolean> = [];

    for (let i = 0; nextTaskCompTimeHovered.length; i++) {
      nextTaskCompTimeHovered[i] = false;
      nextTaskDeadlineHovered[i] = false;
    }

    console.log(`Hovering task cell (${rowIndex}, ${columnIndex})...`);
    console.log("allTasks:");
    console.dir(allTasks);
    console.log("isTaskCompTimeHovered");
    console.dir(isTaskCompTimeHovered);
    console.log("sortedSequence");
    console.dir(sortedSequence);
    console.log("isTaskDeadlineHovered");
    console.dir(isTaskDeadlineHovered);

    switch (rowIndex) {
      case 1:
        // comp times
        nextTaskCompTimeHovered[sortedSequence[taskIndex]] = true;

        console.log(`\tCorresponding to task J${columnIndex}.computationTime`);
        console.log(`\t@ sorted index ${sortedSequence[taskIndex]}`);

        setIsTaskCompTimeHovered(
          (taskCompTimeHoverStatus) =>
            (taskCompTimeHoverStatus = nextTaskCompTimeHovered)
        );

        break;

      case 2:
        // deadlines
        nextTaskDeadlineHovered[sortedSequence[taskIndex]] = true;

        console.log(`\tCorresponding to task J${columnIndex}.computationTime`);
        console.log(`\t@ sorted index ${sortedSequence[taskIndex]}`);

        setIsTaskDeadlineHovered(
          (taskDeadlineHoverStatus) =>
            (taskDeadlineHoverStatus = nextTaskDeadlineHovered)
        );
        break;
    }
  }

  function handleMouseLeave(e: MouseEvent) {
    setIsBeingHovered((hoverStatus) => (hoverStatus = false));
    const nextTaskCompTimeHovered = JSON.parse(
      JSON.stringify(isTaskCompTimeHovered)
    );
    const nextTaskDeadlineHovered = JSON.parse(
      JSON.stringify(isTaskDeadlineHovered)
    );

    const taskIndex = columnIndex - 1;

    console.log(`Leaving task cell (${rowIndex}, ${columnIndex})...`);
    switch (rowIndex) {
      case 1:
        // comp times
        nextTaskCompTimeHovered[sortedSequence[taskIndex]] = false;

        console.log(`\tCorresponding to task J${columnIndex}.computationTime`);

        console.log(`\t@ sorted index ${sortedSequence[taskIndex]}`);
        console.log("changing hover status to false...");
        console.dir(isTaskCompTimeHovered);

        setIsTaskCompTimeHovered(
          (taskCompTimeHoverStatus) =>
            (taskCompTimeHoverStatus = nextTaskCompTimeHovered)
        );

        break;

      case 2:
        // deadlines
        nextTaskDeadlineHovered[sortedSequence[taskIndex]] = false;

        console.log(`\tCorresponding to task J${columnIndex}.deadline`);
        console.log(`\t@ sorted index ${sortedSequence[taskIndex]}`);

        setIsTaskDeadlineHovered(
          (taskDeadlineHoverStatus) =>
            (taskDeadlineHoverStatus = nextTaskDeadlineHovered)
        );
        break;
    }
  }

  const hoverAni: string = isBeingHovered
    ? `1000ms infinite linear alternate ${styles.flash}`
    : "";

  function handleMouseDown(e: MouseEvent) {
    setIsClicked((clickStatus) => (clickStatus = true));
    const nextTaskCompTimeClicked = JSON.parse(
      JSON.stringify(isTaskCompTimeClicked)
    );
    const nextTaskDeadlineClicked = JSON.parse(
      JSON.stringify(isTaskDeadlineClicked)
    );

    const taskNum = columnIndex - 1;

    switch (rowIndex) {
      case 1:
        // comp times
        nextTaskCompTimeClicked[taskNum] = true;

        setIsTaskCompTimeHovered(
          (taskCompTimeClickStatus) =>
            (taskCompTimeClickStatus = nextTaskCompTimeClicked)
        );

        break;

      case 2:
        // deadlines
        nextTaskDeadlineClicked[taskNum] = true;

        setIsTaskDeadlineHovered(
          (taskDeadlineClickStatus) =>
            (taskDeadlineClickStatus = nextTaskDeadlineClicked)
        );
        break;
    }

    const mouseDownTarget = e.target as HTMLDivElement;
    setOldCellValue(
      (oldValue) =>
        (oldValue = parseInt(mouseDownTarget.textContent?.trim() as string, 10))
    );
  }

  function handleBlur(e: FocusEvent) {
    setIsClicked((clickStatus) => (clickStatus = false));
    setIsBeingHovered((hoverStatus) => (hoverStatus = false));

    const divContent = parseInt(e.target.textContent?.trim() as string, 10);

    const nextTaskCompTimeClicked = JSON.parse(
      JSON.stringify(isTaskCompTimeClicked)
    );
    const nextTaskDeadlineClicked = JSON.parse(
      JSON.stringify(isTaskDeadlineClicked)
    );

    const taskNum = columnIndex - 1;

    switch (rowIndex) {
      case 1:
        // comp times
        nextTaskCompTimeClicked[taskNum] = false;

        setIsTaskCompTimeHovered(
          (taskCompTimeClickStatus) =>
            (taskCompTimeClickStatus = nextTaskCompTimeClicked)
        );

        break;

      case 2:
        // deadlines
        nextTaskDeadlineClicked[taskNum] = false;

        setIsTaskDeadlineHovered(
          (taskDeadlineClickStatus) =>
            (taskDeadlineClickStatus = nextTaskDeadlineClicked)
        );
        break;
    }

    console.log(`oldValue:\t${oldCellValue}`);
    if (divContent !== oldCellValue) {
      changeTaskList(rowIndex, columnIndex, divContent);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    console.log(e.code);
    if (e.code === "Escape") {
      setIsClicked((clickStatus) => (clickStatus = false));
    }

    if (e.code === "Enter") {
      setIsClicked((clickStatus) => (clickStatus = true));
    }
  }

  function handleFocus(e: FocusEvent) {
    setIsBeingHovered((hoverStatus) => (hoverStatus = true));
  }

  function changeTaskList(rowInd: number, colInd: number, newValue: number) {
    let nextTaskSet = JSON.parse(JSON.stringify(allTasks));
    const taskNum = colInd - 1;

    switch (rowInd) {
      case 1:
        // user changed a computationTime value
        nextTaskSet[taskNum].computationTime = newValue;
        break;
      case 2:
        // user changed a deadline value
        nextTaskSet[taskNum].deadline = newValue;
        break;
    }

    setAllTasks((taskSet) => (taskSet = nextTaskSet));
    // console.dir(allTasks);
    setAllUpdates(
      (allUpdates) =>
        (allUpdates = [...allUpdates, "Task set changed. Rescheduling..."])
    );
  }

  const clickAni: string = isClicked
    ? `500ms cubic-bezier(0.19,1,0.22,1) forwards ${styles.flash}`
    : "";

  const loseFocusAni = `2000ms 1 linear reverse ${styles.flash}`;

  let compoundAnis: string = "";

  if (isClicked) {
    compoundAnis = compoundAnis.concat(clickAni);
  } else {
    if (isBeingHovered) {
      compoundAnis = compoundAnis.concat(hoverAni);
    } else {
      compoundAnis = compoundAnis.concat(loseFocusAni);
    }
  }

  const taskTableCellStyle = {
    animation: `${compoundAnis}`,
  };

  // console.log(`isBeingHovered:\t${isBeingHovered}`);
  // console.log(`isClicked:\t${isClicked}`);
  // console.log(`compoundAnis:\t${compoundAnis}`);

  return (
    <div
      tabIndex={0}
      suppressContentEditableWarning={true}
      contentEditable={isClicked}
      className={styles.taskTableCell}
      style={taskTableCellStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <TaskTableElement
        textContent={textContent}
        textContentSub={textContentSub}
      />
    </div>
  );
}
