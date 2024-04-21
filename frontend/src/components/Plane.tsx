"use client";

import { GameState } from "./GameWindow";

export default function Plane({ gameState }: { gameState: GameState }) {
  return (
    <div
      className={`w-12 h-12 absolute`}
      style={{
        bottom: `${gameState.yPos}%`,
        left: `10%`,
        backgroundImage: `url("/assets/plane.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        transform: `rotate(${
          gameState.yVelocity < 0
            ? "45deg"
            : gameState.yVelocity === 0
            ? "0deg"
            : "-45deg"
        })`,
      }}
    ></div>
  );
}
