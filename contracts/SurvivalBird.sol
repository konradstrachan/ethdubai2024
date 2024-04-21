// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISurvivalBird {
    function getGamePlayerIfFinished(bytes32 gameHash) external view returns (address);
}

contract SurvivalBird is ISurvivalBird {
    uint256 private totalPrizePool;
    uint256 private lastBlockRewardsPaid;
    uint256 private blocksBeforeWinnerPaid;
    address private currentHighestScoringPlayer;
    uint256 private currentHighestScore;

    struct Game {
        bool isGameFinished;
        address playerAddress;
        uint256 score;
    }

    mapping(bytes32 => Game) public games;

    constructor() {
        totalPrizePool = 0;
        lastBlockRewardsPaid = 0;
        blocksBeforeWinnerPaid = 100;
        currentHighestScoringPlayer = address(0);
        currentHighestScore = 0;
    }

    function startGame() external payable returns (bytes32) {
        require(msg.value == 0.01 ether, "Incorrect amount sent");

        bytes32 gameHash = keccak256(abi.encodePacked(block.timestamp));
        games[gameHash] = Game(false, msg.sender, 0);

        totalPrizePool += msg.value;

        return gameHash;
    }

    function endGame(address playerAddress, bytes32 gameHash, uint256 score) external {
        require(!games[gameHash].isGameFinished, "Game already finished");

        games[gameHash].isGameFinished = true;
        games[gameHash].playerAddress = playerAddress;
        games[gameHash].score = score;

        if (score > currentHighestScore) {
            currentHighestScoringPlayer = playerAddress;
            currentHighestScore = score;
        }
    }

    function getGamePlayerIfFinished(bytes32 gameHash) external view override returns (address) {
        require(games[gameHash].isGameFinished, "Game not finished or valid");
        return games[gameHash].playerAddress;
    }

    function canWinningsBeClaimed() public view returns (bool) {
        return (   totalPrizePool > 0 
                && block.number >= lastBlockRewardsPaid + blocksBeforeWinnerPaid);
    }

    function getCurrrentPrizePool() public view returns (uint256) {
        return totalPrizePool;
    }

    function getCurrrentHighScore() public view returns (uint256) {
        return currentHighestScore;
    }

    function getCurrentWinner() public view returns (address) {
        return currentHighestScoringPlayer;
    }

    function claimWinnings() external {
        require(canWinningsBeClaimed(), "Winnings cannot be claimed yet");

        uint256 prizeToTransfer = totalPrizePool;
        totalPrizePool = 0;

        payable(currentHighestScoringPlayer).transfer(prizeToTransfer);

        lastBlockRewardsPaid = block.number;
        currentHighestScoringPlayer = address(0);
        currentHighestScore = 0;
    }
}
