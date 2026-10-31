import hre from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const { ethers, network } = hre;
  console.log(`Starting deployment of Applause to network: ${network.name}...`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} native currency`);

  const ApplauseFactory = await ethers.getContractFactory("Applause");
  const applause = await ApplauseFactory.deploy();
  await applause.waitForDeployment();

  const deployedAddress = await applause.getAddress();
  console.log("==================================================");
  console.log(`Applause successfully deployed!`);
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Network: ${network.name}`);
  console.log("==================================================");

  // Export contract address and ABI for easy frontend consumption
  const deployedInfo = {
    address: deployedAddress,
    network: network.name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployedAt: new Date().toISOString(),
  };

  const outputDir = path.join(__dirname, "../src/contracts");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, "deployedAddress.json"),
    JSON.stringify(deployedInfo, null, 2)
  );

  console.log(`Deployment metadata written to src/contracts/deployedAddress.json`);

  // Update .env and .env.local
  const envFiles = [
    path.join(__dirname, "../.env"),
    path.join(__dirname, "../.env.local"),
  ];

  for (const envPath of envFiles) {
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, "utf-8");
      if (content.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
        content = content.replace(
          /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/g,
          `NEXT_PUBLIC_CONTRACT_ADDRESS=${deployedAddress}`
        );
        fs.writeFileSync(envPath, content);
        console.log(`Updated NEXT_PUBLIC_CONTRACT_ADDRESS in ${path.basename(envPath)}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
