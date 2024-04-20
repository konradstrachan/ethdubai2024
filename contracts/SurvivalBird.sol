// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SurvivalBird {
    uint256 public totalPrizePool;
    uint256 public lastBlockRewardsPaid;
    uint256 public blocksBeforeWinnerPaid;
    address public currentHighestScoringPlayer;
    uint256 public currentHighestScore;

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

    function canWinningsBeClaimed() public view returns (bool) {
        return (   totalPrizePool > 0 
                && block.number >= lastBlockRewardsPaid + blocksBeforeWinnerPaid);
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
