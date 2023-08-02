import styles from "./Arrow.module.css";
import Image from "next/image";
import arrow from "../public/arrow.svg";

export default function Arrow() {
  const arrowHeight = 6;
  const arrowWidth = arrowHeight / 20;

  return (
    <>
      <Image src={arrow} alt={"down arrow"} width={24} />
    </>
  );
}
