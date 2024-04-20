'use client';

export default function Building({ height, xPos }: { height: number; xPos: number }) {
	return <div className={`w-48  absolute bottom-0 bg-blue-700`} style={{ height: `${height}%`, left: `${xPos}%` }}></div>;
}
