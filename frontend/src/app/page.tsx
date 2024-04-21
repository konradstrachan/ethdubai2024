"use client";

import { useCallback, useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider, ethers } from "ethers";
import {
  canWinningsBeClaimed,
  claimWinnings,
  endGame,
  getCurrentWinner,
  getCurrrentHighScore,
  getCurrrentPrizePool,
  startGame,
} from "@/utils/ethers.utils";
import LogoComponent from "@/components/Logo";
import { Web3Modal } from "@/components/Web3Modal";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import LoadingComponent from "@/components/LoadingComponent";
import WalletConnectPage from "@/components/WalletConnectPage";
import HomeComponent from "@/components/HomeComponent";
import GameWindow from "@/components/GameWindow";

type GlobalGameState = {
  highScore: bigint;
  prizePool: bigint;
  winnerAddress: string;
  areWinningsClaimable: boolean;
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [globalGameState, setGlobalGameState] = useState<GlobalGameState>({
    highScore: BigInt(0),
    prizePool: BigInt(0),
    winnerAddress: ethers.ZeroAddress,
    areWinningsClaimable: false,
  });

  const [isGameStarted, setIsGameStarted] = useState<string | null>(null);

  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [endScore, setEndScore] = useState(0);

  useEffect(() => {
    (async () => {
      if (!isConnected || !chainId) return;

      setLoading(true);

      const highScore = await getCurrrentHighScore(chainId.toString());
      const prizePool = await getCurrrentPrizePool(chainId.toString());
      const winnerAddress = await getCurrentWinner(chainId.toString());
      const areWinningsClaimable = await canWinningsBeClaimed(
        chainId.toString()
      );

      setGlobalGameState({
        highScore,
        prizePool,
        winnerAddress,
        areWinningsClaimable,
      });
      setLoading(false);
    })();
  }, [chainId, isConnected]);

  const handleStartGame = useCallback(async () => {
    try {
      if (!isConnected || !walletProvider || !chainId) return;

      setLoading(true);

      const ethersProvider = new BrowserProvider(walletProvider);
      const gameHash = await startGame(
        chainId.toString(),
        await ethersProvider.getSigner()
      );

      setIsGameStarted(gameHash);
      setLoading(false);
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  }, [chainId, walletProvider, isConnected]);

  const handleClaimWinnings = useCallback(async () => {
    if (!isConnected || !walletProvider || !chainId) return;

    setLoading(true);

    const ethersProvider = new BrowserProvider(walletProvider);

    await claimWinnings(chainId.toString(), await ethersProvider.getSigner());

    setLoading(false);
    window.location.reload();
  }, [chainId, walletProvider, isConnected]);

  const handleEndGame = useCallback(
    async (score: number) => {
      if (!chainId || !address || !isGameStarted) return;

      setLoading(true);

      await endGame(chainId.toString(), address, isGameStarted, score);

      setEndScore(score);
      setIsGameEnded(true);
      setLoading(false);
    },
    [chainId, address, isGameStarted]
  );

  if (loading) return <LoadingComponent />;

  if (!isConnected || !chainId || !address) return <WalletConnectPage />;

  if (!isGameStarted)
    return (
      <HomeComponent
        address={address}
        globalGameState={globalGameState}
        handleClaimWinnings={handleClaimWinnings}
        handleStartGame={handleStartGame}
      />
    );

  if (!isGameEnded) return <GameWindow handleEndGame={handleEndGame} />;

  return (
    <Web3Modal>
      <main className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
        <LogoComponent />
        <p className="text-6xl bg-gray-800 text-white rounded-md p-4">
          Score - {endScore}
        </p>
        <button
          className="text-4xl white rounded-md p-4"
          onClick={() => window.location.reload()}
        >
          Click to restart
        </button>
      </main>
    </Web3Modal>
  );
}
