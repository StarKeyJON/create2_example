// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const value = 100000000000000000n;
  const salt = 1337;

  const Create = await hre.ethers.getContractFactory("FactoryAssembly");
  const create = await Create.deploy();

  await create.deployed();

  console.log(
    `Create with 1e17 ETH and deployed to ${create.address}`
  );

  const bytecode = await create.getBytecode(owner.address, salt);
  console.log("\nContract Bytecode: \n", bytecode);

  const address = await create.getAddress(bytecode, salt);
  console.log("\nContract Address: \n", address,"\n");

  await create.deploy(bytecode, salt, { value: value });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
