import styles from "./BratleyTaskText.module.css";

export default function BratleyTaskText({
  textContent,
  fontSize,
  color,
  top,
  right,
}: {
  textContent: string;
  fontSize?: string;
  color?: string;
  top?: number;
  right?: number;
}) {
  const textColor = color === "" ? "black" : color;

  const bratleyTaskTextStyle = {
    fontSize: `${fontSize}`,
    color: `${textColor}`,
    top: `${top}px`,
    right: `${right}px`,
  };

  return (
    <span className={styles.bratleyTaskText} style={bratleyTaskTextStyle}>
      {textContent}
    </span>
  );
}
