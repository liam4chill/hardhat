import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";



const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy} = deployments;

  const {deployer} = await hre.getNamedAccounts();

  // Constants
  const VALUE_LOCKED = hre.ethers.parseEther("0.01");
  const UNLOCK_TIME = 10000;

  // Use ethers to get timestamp information
  const blockNumber = await ethers.provider.getBlockNumber();
  const lastBlockTimestamp = (await ethers.provider.getBlock(blockNumber))?.timestamp as number;
  
  await deploy("Lock", {
    from: deployer,
    args: [lastBlockTimestamp + UNLOCK_TIME], // Corrigé ici
    value: VALUE_LOCKED.toString(),
  });}
  
  export default func;