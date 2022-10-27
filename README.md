# Create2 Sample Project

This project demonstrates how to deploy a contract to a precomputed address

# From https://docs.openzeppelin.com/cli/2.8/deploying-with-create2
<p>The CREATE2 opcode gives us the ability predict the address where a contract will be deployed, without ever having to do so. This opens up lots of possibilities to improve user onboarding and scalability.</p>

# CREATE2
The whole idea behind this opcode is to make the resulting address independent of future events. Regardless of what may happen on the blockchain, it will always be possible to deploy the contract at the precomputed address.

New addresses are a function of:

0xFF, a constant that prevents collisions with CREATE

The sender’s own address

A salt (an arbitrary value provided by the sender)

The to-be-deployed contract’s bytecode

# new_address = hash(0xFF, sender, salt, bytecode)
CREATE2 guarantees that if sender ever deploys bytecode using CREATE2 and the provided salt, it will be stored in new_address.

Because bytecode is included in this computation other agents can rely on the fact that, if a contract is ever deployed to new_address, it will be one they know about. This is the key concept behind counterfactual deployments.


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
