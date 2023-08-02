import Deadline from "./Deadline";

interface Task {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
}

interface DeadlineContainer {
  name: string;
  isHovered: boolean;
  isClicked: boolean;
}

export default function DeadlineSequence({
  sortedTaskSet,
  scheduleWidth,
  scheduleHeight,
  nTicks,
  isTaskDeadlineHovered,
  isTaskDeadlineClicked,
  sortedSequence,
}: {
  sortedTaskSet: Array<Task>;
  scheduleWidth: number;
  scheduleHeight: number;
  nTicks: number;
  isTaskDeadlineHovered: Array<boolean>;
  isTaskDeadlineClicked: Array<boolean>;
  sortedSequence: Array<number>;
}) {
  let deadlineContainers: Array<DeadlineContainer> = [];
  for (let i = 0; i < nTicks; i++) {
    const deadlineContainer = { name: "", isHovered: false, isClicked: false };
    deadlineContainers.push(deadlineContainer);
  }

  for (let i = 0; i < sortedTaskSet.length; i++) {
    deadlineContainers[sortedTaskSet[i].deadline] = {
      name: sortedTaskSet[i].name,
      isHovered:
        isTaskDeadlineHovered[
          sortedSequence[parseInt(sortedTaskSet[i].name.substring(1), 10) - 1]
        ],
      isClicked:
        isTaskDeadlineClicked[
          sortedSequence[parseInt(sortedTaskSet[i].name.substring(1), 10) - 1]
        ],
    };
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: `calc(${scheduleWidth}vw + 24px)`,
      }}
    >
      {deadlineContainers.map((container, containerIndex) => (
        <div key={containerIndex}>
          {container.name === "" ? (
            <div style={{ height: "10vh", width: "24px" }}></div>
          ) : (
            <Deadline
              taskName={container.name}
              isTaskDeadlineHovered={container.isHovered}
              isTaskDeadlineClicked={container.isClicked}
            />
          )}
        </div>
      ))}
    </div>
  );
}
