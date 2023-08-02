import Image from "next/image";
import arrow from "../public/arrowRight.svg";

export default function ArrowRight() {
  const arrowHeight = 6;
  const arrowWidth = arrowHeight / 20;

  return (
    <>
      <Image src={arrow} alt={"arrow pointing right"} />
    </>
  );
}
