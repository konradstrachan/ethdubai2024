"use client";

import Building from "@/components/Building";
import Plane from "@/components/Plane";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, parseEther } from "ethers";
import { Contract } from "ethers";
import { ClimbingBoxLoader } from "react-spinners";
import { startGame } from "@/utils/ethers.utils";
import LogoComponent from "@/components/Logo";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "cf21c46e431e56bb835b439ba6b302a2";

// 2. Set chains
const WALLETCONNECT_CHAINS = [
  {
    chainId: 11155111,
    name: "Ethereum Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://sepolia.drpc.org",
  },
];

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: WALLETCONNECT_CHAINS,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: any) {
  return children;
}

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
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [isGameStarted, setIsGameStarted] = useState<boolean>();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [clicked, setClicked] = useState<boolean>(false);
  const [delayed, setDelayed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isGameEnded = useMemo(() => {
    if (gameState.yPos <= 0) return true;
    if (gameState.yPos > 100) return true;

    for (const building of gameState.buildings) {
      if (building.xPos < 10 && building.xPos > 0) {
        if (gameState.yPos - building.height < 0) return true;
        if (gameState.yPos - building.height > 20) return true;
      }
    }
  }, [gameState]);

  useEffect(() => {
    const gameLoop = () => {
      if (!isGameStarted || isGameEnded) return;

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
                    xPos: Math.max(building.xPos - oldVal.xVelocity, -1000),
                  };
                }),
                { height: 10 + Math.random() * 80, xPos: 100 },
              ]
            : oldVal.buildings.map((building) => {
                return {
                  height: building.height,
                  xPos: Math.max(building.xPos - oldVal.xVelocity, -1000),
                };
              }),
      }));
    };

    setDelayed(true);

    setTimeout(() => setDelayed(false), 100);

    const interval = setInterval(gameLoop, 1000 / 60);

    return () => clearInterval(interval);
  }, [clicked, isGameStarted, isGameEnded]);

  useEffect(() => {
    setClicked(false);
  }, [gameState]);

  const handleClick = useCallback(() => {
    if (delayed) return;

    setClicked(true);
  }, [delayed]);

  const handleStartGame = useCallback(async () => {
    try {
      setLoading(true);

      if (!isConnected || !walletProvider || !chainId)
        throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);

      const gameHash = await startGame(
        chainId.toString(),
        await ethersProvider.getSigner()
      );

      setIsGameStarted(true);
      setLoading(false);
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  }, [chainId, walletProvider, isConnected]);

  if (loading)
    return (
      <main className="w-screen h-screen grid place-items-center">
        <ClimbingBoxLoader />
      </main>
    );

  return (
    <Web3Modal>
      <main className="h-screen w-screen flex items-center justify-center">
        <LogoComponent />
      </main>
      {/* <main className="">
        {isGameStarted ? (
          <>
            {!isGameEnded ? (
              <button
                className="w-screen h-screen relative overflow-hidden"
                onClick={handleClick}
              >
                <Plane gameState={gameState} />
                {gameState.buildings.map((building, ind) => (
                  <Building
                    height={building.height}
                    xPos={building.xPos}
                    key={ind}
                  />
                ))}
              </button>
            ) : (
              <button
                className="w-screen h-screen grid place-items-center "
                onClick={() => setGameState(initialGameState)}
              >
                <div>
                  <div className="text-4xl font-bold">
                    Score - {gameState.time}
                  </div>
                  <div className="">Click to play again</div>
                </div>
              </button>
            )}
          </>
        ) : (
          <>
            {address ? (
              <button
                className="w-screen h-screen grid place-items-center text-4xl font-bold"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            ) : (
              <w3m-button />
            )}
          </>
        )}
      </main> */}
    </Web3Modal>
  );
}
