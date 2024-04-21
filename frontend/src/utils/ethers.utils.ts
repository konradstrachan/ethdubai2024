import { ethers } from "ethers";

const GAME_ABI: string[] = [
  "function startGame() external payable returns (bytes32)",
  "function canWinningsBeClaimed() public view returns (bool)",
  "function endGame(address playerAddress, bytes32 gameHash, uint256 score) external",
  "function getCurrrentPrizePool() public view returns (uint256)",
  "function getCurrentWinner() public view returns (address)",
  "function getCurrrentHighScore() public view returns (uint256)",
  "function claimWinnings() external",
  "",
];

const GAME_ADDRESS: { [chainId: string]: string } = {
  "11155111": "0xF02B85eD64e880Ae675aa2c4173Df1954cf46862",
};

const RPC_PROVIDER = new ethers.JsonRpcProvider("https://sepolia.drpc.org");

const DEFAULT_SIGNER = ethers.Wallet.fromPhrase("", RPC_PROVIDER);

export const startGame = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  let [gameHash] = await contract.startGame.staticCallResult({
    value: ethers.parseEther("0.01"),
  });

  let tx = await contract.startGame({
    value: ethers.parseEther("0.01"),
  });

  await tx.wait();

  return gameHash;
};

export const getCurrrentHighScore = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrrentHighScore();
};

export const getCurrrentPrizePool = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrrentPrizePool();
};

export const getCurrentWinner = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrentWinner();
};

export const endGame = async (
  chainId: string,
  playerAddress: string,
  gameHash: string,
  score: number,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  let tx = await contract.endGame(playerAddress, gameHash, score);

  await tx.wait();
};

export const claimWinnings = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  let tx = await contract.claimWinnings();

  await tx.wait();
};
