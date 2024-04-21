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
  "11155111": "0x0c8743d6979ae62146B34094C60fC6AccCC90917",
  "84532": "0x4DC36FCc192c042fC49Fe934D86E8942D79c4e93",
  "51": "0xF07b86d5DCd3165A23438bc37a8964128a94c7f0",
  "2710": "0xF07b86d5DCd3165A23438bc37a8964128a94c7f0",
};

const RPC_PROVIDER: { [chainId: string]: ethers.JsonRpcProvider } = {
  "11155111": new ethers.JsonRpcProvider("https://sepolia.drpc.org"),
  "84532": new ethers.JsonRpcProvider("https://sepolia.base.org"),
  "51": new ethers.JsonRpcProvider("https://apothem.xdcrpc.com"),
  "2710": new ethers.JsonRpcProvider("https://rpc-testnet.morphl2.io"),
};

const DEFAULT_SIGNER = ethers.Wallet.fromPhrase(
  "bar jungle bean try butter donor inch bike farm enemy scatter seat"
);

export const startGame = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  try {
    let [gameHash] = await contract.startGame.staticCallResult({
      value: ethers.parseEther("0.01"),
    });

    let tx = await contract.startGame({
      value: ethers.parseEther("0.01"),
    });

    await tx.wait();

    return gameHash;
  } catch (err) {
    console.log("--err", err);
  }
};

export const getCurrrentHighScore = async (chainId: string) => {
  const signer = ethers.Wallet.fromPhrase(
    "bar jungle bean try butter donor inch bike farm enemy scatter seat",
    RPC_PROVIDER[chainId]
  );

  console.log(GAME_ADDRESS[chainId]);

  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrrentHighScore();
};

export const getCurrrentPrizePool = async (chainId: string) => {
  const signer = ethers.Wallet.fromPhrase(
    "bar jungle bean try butter donor inch bike farm enemy scatter seat",
    RPC_PROVIDER[chainId]
  );

  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrrentPrizePool();
};

export const getCurrentWinner = async (chainId: string) => {
  const signer = ethers.Wallet.fromPhrase(
    "bar jungle bean try butter donor inch bike farm enemy scatter seat",
    RPC_PROVIDER[chainId]
  );

  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.getCurrentWinner();
};

export const canWinningsBeClaimed = async (chainId: string) => {
  const signer = ethers.Wallet.fromPhrase(
    "bar jungle bean try butter donor inch bike farm enemy scatter seat",
    RPC_PROVIDER[chainId]
  );

  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  return await contract.canWinningsBeClaimed();
};

export const endGame = async (
  chainId: string,
  playerAddress: string,
  gameHash: string,
  score: number
) => {
  const signer = ethers.Wallet.fromPhrase(
    "bar jungle bean try butter donor inch bike farm enemy scatter seat",
    RPC_PROVIDER[chainId]
  );

  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  try {
    let tx = await contract.endGame(playerAddress, gameHash, score);

    await tx.wait();
  } catch (err) {
    console.log("--err", err);
  }
};

export const claimWinnings = async (
  chainId: string,
  signer: ethers.Signer = DEFAULT_SIGNER
) => {
  const contract = new ethers.Contract(GAME_ADDRESS[chainId], GAME_ABI, signer);

  try {
    let tx = await contract.claimWinnings();

    await tx.wait();
  } catch (err) {
    console.log("--err", err);
  }
};
