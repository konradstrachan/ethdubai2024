'use client';

import Building from '@/components/Building';
import Plane from '@/components/Plane';
import { useCallback, useEffect, useState } from 'react';

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
	buildings: [],
};

export default function Home() {
	const [gameState, setGameState] = useState<GameState>(initialGameState);
	const [clicked, setClicked] = useState<boolean>(false);
	const [delayed, setDelayed] = useState<boolean>(false);

	useEffect(() => {
		const gameLoop = () => {
			setGameState((oldVal) => ({
				yPos: oldVal.yPos + oldVal.yVelocity,
				xVelocity: oldVal.xVelocity,
				yVelocity: clicked ? 0.5 : oldVal.yVelocity - 0.01,
				time: oldVal.time + 1,
				buildings:
					oldVal.time % 200 == 0
						? [
								...oldVal.buildings.map((building) => {
									return {
										height: building.height,
										xPos: building.xPos - oldVal.xVelocity,
									};
								}),
								{ height: 10 + Math.random() * 80, xPos: 100 },
						  ]
						: oldVal.buildings.map((building) => {
								return {
									height: building.height,
									xPos: building.xPos - oldVal.xVelocity,
								};
						  }),
			}));
		};

		setDelayed(true);

		setTimeout(() => setDelayed(false), 100);

		const interval = setInterval(gameLoop, 1000 / 60);

		return () => clearInterval(interval);
	}, [clicked]);

	useEffect(() => {
		setClicked(false);
	}, [gameState]);

	const handleClick = useCallback(() => {
		if (delayed) return;

		setClicked(true);
	}, [delayed]);

	return (
		<button className='bg-white w-screen h-screen relative overflow-hidden' onClick={handleClick}>
			<Plane gameState={gameState} />
			{gameState.buildings.map((building, ind) => (
				<Building height={building.height} xPos={building.xPos} key={ind} />
			))}
		</button>
	);
}
