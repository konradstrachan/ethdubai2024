import { useCallback, useEffect, useState } from "react";
import Plane from "./Plane";
import Building from "./Building";

export type BuildingState = {
  xPos: number;
  height: number;
};

export type GameState = {
  yPos: number;
  xVelocity: number;
  yVelocity: number;
  time: number;
  buildings: BuildingState[];
};

const initialGameState: GameState = {
  yPos: 50,
  xVelocity: 0.5,
  yVelocity: 0.5,
  time: 0,
  buildings: [{ height: Math.floor(Math.random() * 90), xPos: 100 }],
};

const IMPLUSE = 1;
const GRAVITY = 0.02;
const TICK = 1;
const PERIOD = 100;

const FPS = 60;

type Props = { handleEndGame: (score: number) => Promise<void> };

export default function GameWindow({ handleEndGame }: Props) {
  const [gameState, setGameState] = useState(initialGameState);
  const [clicked, setClicked] = useState(false);
  const [delayed, setDelayed] = useState(true);

  const [wind, setWind] = useState(0.5);

  const checkCollisions = useCallback((oldState: GameState) => {
    for (const building of oldState.buildings) {
      const planePos = 10;

      if (planePos - building.xPos > 0 && planePos - building.xPos < 5) {
        if (
          oldState.yPos < building.height ||
          oldState.yPos > building.height + 25
        )
          return true;
      }
    }
  }, []);

  const moveState = useCallback(
    (oldState: GameState) => {
      return {
        yPos: Math.min(Math.max(oldState.yPos + oldState.yVelocity, 0), 90),
        xVelocity: wind,
        yVelocity: clicked ? IMPLUSE : oldState.yVelocity - GRAVITY,
        time: oldState.time + TICK,
        buildings:
          oldState.buildings[oldState.buildings.length - 1].xPos < 60
            ? [
                ...oldState.buildings.map((building) => {
                  return {
                    height: building.height,
                    xPos: Math.max(building.xPos - oldState.xVelocity, -1000),
                  };
                }),
                { height: 10 + Math.random() * 80, xPos: 100 },
              ]
            : oldState.buildings.map((building) => {
                return {
                  height: building.height,
                  xPos: Math.max(building.xPos - oldState.xVelocity, -1000),
                };
              }),
      };
    },
    [clicked, wind]
  );

  const gameLoop = useCallback(() => {
    setGameState((oldVal) => {
      const movedState = moveState(oldVal);

      return movedState;
    });
  }, [moveState]);

  useEffect(() => {
    const windInterval = setInterval(() => {
      const MIN = 35 / 100;
      const MAX = 30 / 100;

      const wind = MIN + Math.random() * MAX;
      const main = document.querySelector("main");

      if (!main) return;

      if (wind < MIN + MAX / 2) {
        main.style.backgroundImage = `url("/assets/rain-hard.gif")`;
      } else {
        main.style.backgroundImage = `url("/assets/rain-low.gif")`;
      }

      setWind(wind);
    }, 1000);

    return () => clearInterval(windInterval);
  }, []);

  useEffect(() => {
    if (checkCollisions(gameState)) handleEndGame(gameState.time);
  }, [handleEndGame, gameState, checkCollisions]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 1000 / FPS);
    return () => clearInterval(interval);
  }, [gameLoop]);

  useEffect(() => {
    setDelayed(true);

    setTimeout(() => setDelayed(false), 100);
  }, [clicked]);

  useEffect(() => {
    setClicked(false);
  }, [gameState]);

  const handleClick = useCallback(() => {
    if (delayed) return;

    setClicked(true);
  }, [delayed]);

  return (
    <main className="relative">
      {gameState.buildings.map((building, ind) => (
        <Building height={building.height} xPos={building.xPos} key={ind} />
      ))}
      <button className="w-screen h-screen relative" onClick={handleClick}>
        <Plane gameState={gameState} />
      </button>
      <div className="absolute top-12 right-12">
        <p className="text-2xl text-white font-bold">
          Score - {gameState.time} {"  "}
          Wind - {wind.toLocaleString()}
        </p>
      </div>
    </main>
  );
}
