"use client";

const BUILDING_WIDTH = 5;
const GAP = 25;

export default function Building({
  height,
  xPos,
}: {
  height: number;
  xPos: number;
}) {
  return (
    <div
      className={`absolute h-screen flex flex-col items-stretch justify-between`}
      style={{
        left: `${xPos}%`,
        width: `${BUILDING_WIDTH}%`,
      }}
    >
      <div
        style={{
          height: `${Math.max(100 - height - GAP, 0)}%`,
          backgroundImage: 'url("/assets/cloud.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
        }}
      ></div>
      <div
        className={``}
        style={{
          height: `${height}%`,
          backgroundImage: 'url("/assets/building.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "top",
        }}
      ></div>
    </div>
  );
}
