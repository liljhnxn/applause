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

  // Check gas price dynamically to ensure gas efficiency
  const feeData = await ethers.provider.getFeeData();
  const currentGasPrice = feeData.gasPrice || 20000000000n; // fallback to 20 gwei if null
  console.log(`Current Gas Price: ${ethers.formatUnits(currentGasPrice, "gwei")} Gwei`);

  const ApplauseFactory = await ethers.getContractFactory("Applause");
  
  // Estimate gas for minimal fee usage
  const deployTx = await ApplauseFactory.getDeployTransaction();
  const estimatedGas = await ethers.provider.estimateGas(deployTx);
  console.log(`Estimated Deployment Gas Units: ${estimatedGas.toString()}`);
  
  const estimatedCost = (estimatedGas * currentGasPrice);
  console.log(`Estimated Deployment Cost: ${ethers.formatEther(estimatedCost)} native currency`);

  // Deploy using the exact network gasPrice to prevent overpaying
  const applause = await ApplauseFactory.deploy({
    gasPrice: currentGasPrice,
  });
  await applause.waitForDeployment();

  const deployedAddress = await applause.getAddress();
  const deployTxReceipt = await applause.deploymentTransaction()?.wait();
  const actualGasUsed = deployTxReceipt?.gasUsed || 0n;
  const actualCost = actualGasUsed * (deployTxReceipt?.gasPrice || currentGasPrice);

  console.log("==================================================");
  console.log(`Applause successfully deployed to ${network.name}!`);
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Actual Gas Used: ${actualGasUsed.toString()}`);
  console.log(`Actual Deployment Cost: ${ethers.formatEther(actualCost)} native currency`);
  console.log("==================================================");

  const chainId = (await ethers.provider.getNetwork()).chainId.toString();
  const explorerBase = "https://scan.botchain.ai";

  // Export contract address and ABI for easy frontend consumption
  const deployedInfo = {
    address: deployedAddress,
    network: network.name,
    chainId: chainId,
    deployedAt: new Date().toISOString(),
    explorerUrl: `${explorerBase}/address/${deployedAddress}`,
    gasUsed: actualGasUsed.toString(),
    deploymentCost: ethers.formatEther(actualCost),
  };

  const outputDir = path.resolve(process.cwd(), "src/contracts");
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
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), ".env.local"),
  ];

  for (const envPath of envFiles) {
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, "utf-8");
      if (content.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
        content = content.replace(
          /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/g,
          `NEXT_PUBLIC_CONTRACT_ADDRESS=${deployedAddress}`
        );
      }
      if (content.includes("RPC_URL=") && chainId === "677") {
        content = content.replace(
          /RPC_URL=.*/g,
          `RPC_URL=https://rpc.botchain.ai`
        );
      }
      fs.writeFileSync(envPath, content);
      console.log(`Updated configuration in ${path.basename(envPath)}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
