import { ethers } from "ethers";

const GAME_ABI: string[] = [
  "function startGame() external payable returns (bytes32)",
  "function canWinningsBeClaimed() public view returns (bool)",
  "function endGame(address playerAddress, bytes32 gameHash, uint256 score) external",
  "function getCurrrentPrizePool() public view returns (uint256)",
  "function getCurrentWinner() public view returns (address)",
  "function claimWinnings() external",
  "",
];

const GAME_ADDRESS: { [chainId: string]: string } = {
  "11155111": "0xcbE291970d3F61b3C3c949bcD310444338528F0E",
};

const DEFAULT_SIGNER = ethers.Wallet.fromPhrase(
  "bar jungle bean try butter donor inch bike farm enemy scatter seat"
);

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

export const isCurrentWinner = async (
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

// export const startGame = async (
//   chainId: string,
//   signer: ethers.Signer = DEFAULT_SIGNER
// ) => {
//   const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

//   let [gameHash] = await contract.startGame.staticCallResult({
//     value: ethers.parseEther("0.01"),
//   });

//   let tx = await contract.startGame({
//     value: ethers.parseEther("0.01"),
//   });

//   await tx.wait();

//   return gameHash;
// };

// export const startGame = async (
//   chainId: string,
//   signer: ethers.Signer = DEFAULT_SIGNER
// ) => {
//   const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

//   let [gameHash] = await contract.startGame.staticCallResult({
//     value: ethers.parseEther("0.01"),
//   });

//   let tx = await contract.startGame({
//     value: ethers.parseEther("0.01"),
//   });

//   await tx.wait();

//   return gameHash;
// };
