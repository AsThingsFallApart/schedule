import timelineStyles from "./Timeline.module.css";
import { useEffect, useState } from "react";
import Task from "./Task";

interface Task {
  name: string;
  computationTime: number;
  deadline: number;
}

export default function TaskSequence({
  sortedTaskSet,
  scheduleWidth,
  scheduleHeight,
  nTicks,
  isTaskCompTimeHovered,
  isTaskCompTimeClicked,
}: {
  sortedTaskSet: Array<Task>;
  scheduleWidth: number;
  scheduleHeight: number;
  nTicks: number;
  isTaskCompTimeHovered: Array<boolean>;
  isTaskCompTimeClicked: Array<boolean>;
}) {
  const taskWidthUnit: number = scheduleWidth / (nTicks - 1);

  // useEffect(() => {
  //   const timelineDOMElement = document.getElementsByClassName(
  //     `${timelineStyles.timeline}`
  //   )[0];

  //   console.dir(timelineDOMElement);

  //   // get computed width in pixels
  //   const timelineComputedWidth = timelineDOMElement.clientWidth;

  //   // each TimeTick takes up 24 pixels in width
  //   // there are sixteen gaps
  //   const tickTickWidths = nTicks * 24;
  //   const gapWidths = timelineComputedWidth - tickTickWidths;
  //   console.log(nTicks);
  //   const individualGapWidth = gapWidths / (nTicks - 1);
  //   console.log(individualGapWidth);

  //   setTaskWidthUnit(individualGapWidth + 24);
  // }, [nTicks]);

  // console.log(`taskWidthUnit:\t${taskWidthUnit}`);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: `calc(${scheduleWidth}vw + 24px)`,
        position: "relative",
        left: `12px`,
      }}
    >
      {sortedTaskSet.map((task, taskIndex) => (
        <Task
          key={taskIndex}
          width={taskWidthUnit * task.computationTime}
          height={70}
          taskName={`${task.name}`}
          taskComputationTime={task.computationTime}
          isTaskCompTimeHovered={isTaskCompTimeHovered[taskIndex]}
          isTaskCompTimeClicked={isTaskCompTimeClicked[taskIndex]}
        />
      ))}
    </div>
  );
}
