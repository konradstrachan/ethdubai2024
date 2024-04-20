'use client';

import { GameState } from '@/app/page';

export default function Plane({ gameState }: { gameState: GameState }) {
	return <div className={`w-12 h-12 bg-red-600 absolute `} style={{ bottom: `${gameState.yPos}%`, left: `10%` }}></div>;
}
