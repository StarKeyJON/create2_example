const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Create2", function (){

    /*
    // 1. Get bytecode of contract to be deployed
    // NOTE: _owner and _foo are arguments of the TestContract's constructor
    function getBytecode(address _owner, uint _foo) public pure returns (bytes memory) {
        bytes memory bytecode = type(TestContract).creationCode;

        return abi.encodePacked(bytecode, abi.encode(_owner, _foo));
    }
    */

    async function deployConstructor(){
        const Create = await ethers.getContractFactory("FactoryAssembly");
        const create = await Create.deploy();

        return { create };
    };

   describe("Deploying the FactoryAssembly contract", function(){
    it("Should deploy the FactoryAssembly contract", async function(){
        [owner, acct1, acct2, acct3, acct4] = await ethers.getSigners();
        const { create } = await loadFixture(deployConstructor);

        let filter = create.filters.Deployed(create.address);
        create.on(filter,(address, event) => {
            console.log(`Setter: ${setter}\n Address: ${address}\n Event: ${event} `)
        })

        // First we gather the bytecode from the contract we want to precompute the address to
        // enter the address of the owner and a random salt
        // function getBytecode(address _owner, uint _foo) public pure returns (bytes memory)
        const bytecode = await create.getBytecode(owner.address, 1337);
        console.log("\nContract Bytecode: \n", bytecode);

        // Then with the bytecode we can precompute the address of the deployed contract
        // function getAddress(bytes memory bytecode, uint _salt) public view returns (address)
        const address = await create.getAddress(bytecode, 1337);
        console.log("\nContract Address: \n", address,"\n");

        
        // Finally we can deploy the contract to the precomputed address
        // function deploy(bytes memory bytecode, uint _salt) public payable
        expect(await create.deploy(bytecode, 1337, { value: 1 })).to.emit(create,"Deployed").withArgs(address, 1337);
        })
   })
})