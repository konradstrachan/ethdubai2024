// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface ISurvivalBird {
    function getGamePlayerIfFinished(bytes32 gameHash) external view returns (address);
}

interface ISurvivalReward {
    function mint(bytes32 gameHash, uint256 score) external;
}

contract SurvivalReward is ERC721 {
    string private _imageData;
    uint256 private _score;
    address private _gameState;
    uint256 _nextId;

    // Mapping from token ID to score
    mapping(uint256 => uint256) private _tokenScores;

    constructor(address gameState, string memory base64ImageData) ERC721("ISurvivedDubai2024", "DUB24") {
        _nextId = 0;
        _gameState = gameState;
        _imageData = base64ImageData;
    }

    // Function to mint a new NFT with a specific score
    function mint(bytes32 gameHash, uint256 score) external {
        address to = ISurvivalBird(_gameState).getGamePlayerIfFinished(gameHash);
        _safeMint(to, ++_nextId);
        _tokenScores[_nextId] = score;
    }

    function getImageData() external view returns (string memory) {
        return _imageData;
    }

    function getScore(uint256 tokenId) external view returns (uint256) {
        require(tokenId <= _nextId, "Token ID does not exist");
        return _tokenScores[tokenId];
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return _imageData; 
    }
}
