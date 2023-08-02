import ArrowRight from "./ArrowRight";

export default function TimelineTrailOff() {
  return (
    <div style={{ width: "24px" }}>
      <div
        style={{
          position: "fixed",
          // top: "calc((2vh + 10px) / 2)",
          top: "-15px",
          right: "-40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ transform: "scale(1)" }}>
            <ArrowRight />
          </div>
          <div style={{ fontSize: "xx-large" }}>{"t"}</div>
        </div>
      </div>
    </div>
  );
}
