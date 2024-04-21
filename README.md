# Survival Bird

![image](https://github.com/konradstrachan/ethdubai2024/assets/21056525/1655afa9-b4c2-4cbc-b072-54539355fc48)

A short fun project build at ETHDubai 2024 to explore different L2 chains and their ability to support web3 gaming integrations.

## About

⛈️ In April 2024 Dubai experienced the craziest weather it has seen in 75+ years. The city experienced a day of intense winds and rain that led to intense disruption. For those not 'lucky' enough to be in Dubai for Token2049 and ETHDubai during this time, they can experience the next best thing with the ETH Dubai survival Simulator called Survival Bird!

🐦 To experiment with the economics and practicalities of different L1 and L2 tech being showcased in Dubai, we build a a Flappy Bird clone that puts you in the seat of a plucky Emirates plane navigating between the skyscrapers of Dubai and the storms battering the city.

Experience winds, rain and compete to get the high score and a commemerative NFT.

The game is supported on Sepolia / XDC / Base and Morph.

🪙 Players should deplosit 0.01 ETH / TXDC and the highest scoring player will get the entire prize pool periodically. Each 100 blocks all the entry fees will be redistributed to the highest scoring player.

## How it works

![image](https://github.com/konradstrachan/ethdubai2024/assets/21056525/95fdea07-1139-479a-a772-ba77c20128d3)

The game front end is build in simple React and CSS, it queries via RPCs whether a player has paid to play and keeps the game state in sync with the chain by background txs. Aside from the initial deposit of funds to play, the player doesn't have to sign any other transactions. At the end of the game, the final game state is recorded directly in the game state contract and the player is minted an NFT with their score.

The background state updates occur via a quick and dirty AA like interaction with the game wallet paying for the txs on the behalf of the user while they focus on avoiding the obsticles within the game.

After a short time (set to 100 blocks as an example), the winning player can withdraw the pool of funds.

## Deployed contracts

### Sepolia

-   Game https://sepolia.etherscan.io/address/0xf02b85ed64e880ae675aa2c4173df1954cf46862
-   NFT https://sepolia.etherscan.io/address/0xe8d73e7c0a6e505e0ab8af1918bcf5deba66d986

### XDC Apothem

![image](https://github.com/konradstrachan/ethdubai2024/assets/21056525/b838d1d1-96f1-4f26-964a-b9e64a4c0629)

-   Game https://apothem.xinfinscan.com/address/0xF07b86d5DCd3165A23438bc37a8964128a94c7f0
-   NFT https://apothem.xinfinscan.com/address/0x66FFacc3CC94E6cA0327EB0FDd760e0bF7bE5dbf

### Morph

![image](https://github.com/konradstrachan/ethdubai2024/assets/21056525/8de08161-6bc6-49ea-8e37-b54c1aba9f1e)

-   Game https://explorer-testnet.morphl2.io/address/0xF07b86d5DCd3165A23438bc37a8964128a94c7f0
-   NFT https://explorer-testnet.morphl2.io/address/0x35461b3ba63Aa1764b46778570D8E369Ea3CFF86

## Base Sepolia

![image](https://github.com/konradstrachan/ethdubai2024/assets/21056525/f36112bb-387b-4617-9d43-05bd80ecf059)

-   Game https://sepolia.basescan.org/address/0x4dc36fcc192c042fc49fe934d86e8942d79c4e93
-   NFT https://sepolia.basescan.org/address/0xf07b86d5dcd3165a23438bc37a8964128a94c7f0

Example game end state https://sepolia.basescan.org/tx/0xacc829a11b9ba11b9e403e7453a92e450ac43a43f62ecda86eff4c36e5fef835

# Deployment

-   https://ethdubai2024.vercel.app
