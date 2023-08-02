import styles from "./Timeline.module.css";
import TimeTick from "./TimeTick";
import TimelineTopper from "./TimelineTopper";
import TimelineTrailOff from "./TimelineTrailOff";

export default function Timeline({
  scheduleWidth,
  scheduleHeight,
  nTicks,
}: {
  scheduleWidth: number;
  scheduleHeight: number;
  nTicks: number;
}) {
  let timelineTicks: Array<number> = [];
  for (let i = 0; i < nTicks; i++) {
    timelineTicks.push(i);
  }

  return (
    <div style={{ willChange: "transform" }}>
      <TimelineTopper
        scheduleHeight={scheduleHeight}
        scheduleWidth={scheduleWidth}
      />
      <div
        className={styles.timeline}
        style={{
          width: `calc(${scheduleWidth}vw + 24px)`,
          willChange: "transform",
        }}
      >
        {timelineTicks.map((tick, tickIndex) => (
          <div key={tickIndex}>
            {tickIndex === nTicks - 1 ? (
              <TimelineTrailOff key={tickIndex} />
            ) : (
              <TimeTick key={tickIndex} tickNumber={tickIndex} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
