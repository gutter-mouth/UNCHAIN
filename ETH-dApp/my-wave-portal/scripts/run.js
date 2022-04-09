// run.js
const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    const wavePortal = await waveContract.deployed();

    console.log("Contract deployed to:", wavePortal.address);
    console.log("Contract deployed by:", owner.address);

    let ContractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log("Contract balance: ", hre.ethers.utils.formatEther(ContractBalance));

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("A message");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Another message");
    await waveTxn.wait();

    ContractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log("Contract balance: ", hre.ethers.utils.formatEther(ContractBalance));

    waveCount = await waveContract.getTotalWaves()
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
;
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1)
    }
};

runMain();