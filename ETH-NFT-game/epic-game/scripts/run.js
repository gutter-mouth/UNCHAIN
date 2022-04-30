

const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
    const gameContract = await gameContractFactory.deploy(
        ["METAANI_DOG", "METAANI_CAT", "METAANI_RABBIT"], // キャラクターの名前
        [
        //   "https://i.imgur.com/R3VVCSo.png", // キャラクターの画像
        //   "https://i.imgur.com/hAsLYu5.png",
        //   "https://i.imgur.com/qpQpPKe.png",
            "QmRm7gAQHLT9qeeM6ryCisMaMfPWFTD98TmLricmgXDJXy",
            "QmcSuNjWKXNdR1WEp96s2vdD6BLjaTjGRki5yKUFSs5iXi",
            "QmQCYiRMd7Ysr3dFMJiAhy42w7W8BBfFhYxPcf8BQVpjg4"
        ],
        [100, 200, 300], // キャラクターのHP
        [100, 50, 25],  // キャラクターの攻撃力
        "MISOTOY", // Bossの名前
        // "https://i.imgur.com/t0rRgWN.png", // Bossの画像
        "Qmbz7EekLcRC2ky3yrSRiTpZobBsqTiG1in9vG1Dph91aS",
        10000, // Bossのhp
        50 // Bossの攻撃力
    );
    // link of images: https://imgur.com/a/3jIRxQJ
    const nftGame = await gameContract.deployed();

    console.log("Contract deployed to: ", nftGame.address);

    let txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    let TokenURI1 = await gameContract.tokenURI(1);

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();
    
    let TokenURI2 = await gameContract.tokenURI(1);
    
    console.log(TokenURI1);
    console.log(TokenURI2);

};

const runMain = async () => {
    try {
        await main();
        process.exit(0); 
    } catch (error){
        console.log(error);
        process.exit(1);
    }
};

runMain();

