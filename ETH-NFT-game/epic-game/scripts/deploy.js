

const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
    const gameContract = await gameContractFactory.deploy(
        ["METAANI_DOG", "METAANI_CAT", "METAANI_RABBIT"], // キャラクターの名前
        [
            "QmRm7gAQHLT9qeeM6ryCisMaMfPWFTD98TmLricmgXDJXy",
            "QmcSuNjWKXNdR1WEp96s2vdD6BLjaTjGRki5yKUFSs5iXi",
            "QmQCYiRMd7Ysr3dFMJiAhy42w7W8BBfFhYxPcf8BQVpjg4"
        ],
        [100, 200, 300], // キャラクターのHP
        [100, 50, 25],  // キャラクターの攻撃力
        "MISOTOY", // Bossの名前
        "Qmbz7EekLcRC2ky3yrSRiTpZobBsqTiG1in9vG1Dph91aS", // Bossの画像
        10000, // Bossのhp
        50 // Bossの攻撃力
    );
    const nftGame = await gameContract.deployed();

    console.log("Contract deployed to: ", nftGame.address);

    // let txn;
    
    // txn = await gameContract.mintCharacterNFT(2);
    // await txn.wait();

    // txn = await gameContract.attackBoss();
    // await txn.wait();
    // console.log("First attack done");
    
    // txn = await gameContract.attackBoss();
    // await txn.wait();
    // console.log("Second attack done");
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