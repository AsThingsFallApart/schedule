import TimelineTrailOff from "./TimelineTrailOff";

export default function TimelineTopper({
  scheduleWidth,
  scheduleHeight,
}: {
  scheduleWidth: number;
  scheduleHeight: number;
}) {
  const timeTickLabelOffset: number = 24;
  const thickness = 6 / 20;

  return (
    <>
      <div
        style={{
          borderBottom: `${thickness}vh solid black`,
          width: `calc(${scheduleWidth}vw)`,
          position: "relative",
          left: `${timeTickLabelOffset / 2}px`,
          top: `3px`,
        }}
      ></div>
    </>
  );
}
