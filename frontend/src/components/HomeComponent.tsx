"use client";

import { ethers } from "ethers";
import { Web3Modal } from "./Web3Modal";
import LogoComponent from "./Logo";

type Props = {
  globalGameState: {
    highScore: bigint;
    prizePool: bigint;
    winnerAddress: string;
    areWinningsClaimable: boolean;
  };
  address: string;
  handleStartGame: () => Promise<void>;
  handleClaimWinnings: () => Promise<void>;
};

export default function HomeComponent({
  globalGameState,
  address,
  handleClaimWinnings,
  handleStartGame,
}: Props) {
  return (
    <Web3Modal>
      <main className="h-screen w-screen flex flex-col items-center justify-center gap-12">
        <LogoComponent />
        <div className="p-4 bg-[#1F2124] text-white rounded-md space-y-4 flex flex-col items-stretch">
          <p>High Score - {globalGameState.highScore.toString() ?? 0}</p>
          <p>
            Prize Pool - {ethers.formatEther(globalGameState.prizePool)} ETH
          </p>
          <p>
            Current Winner - {globalGameState.winnerAddress.substring(0, 10)}...
          </p>
        </div>
        {globalGameState.winnerAddress === address &&
        globalGameState.areWinningsClaimable ? (
          <button
            className="bg-[#1F2124] rounded-md text-white px-8 py-4"
            onClick={handleClaimWinnings}
          >
            Claim Winnings
          </button>
        ) : (
          <button
            className="bg-[#1F2124] rounded-md text-white px-8 py-4"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        )}
      </main>
    </Web3Modal>
  );
}
