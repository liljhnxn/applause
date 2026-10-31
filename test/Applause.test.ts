import { expect } from "chai";
import hre from "hardhat";

describe("Applause Contract", function () {
  let applause: any;
  let owner: any;
  let alice: any;
  let bob: any;
  let charlie: any;

  beforeEach(async function () {
    [owner, alice, bob, charlie] = await hre.ethers.getSigners();
    const ApplauseFactory = await hre.ethers.getContractFactory("Applause");
    applause = await ApplauseFactory.deploy();
    await applause.waitForDeployment();
  });

  describe("Validation Rules", function () {
    it("should prevent sending appreciation to zero address", async function () {
      await expect(
        applause.connect(alice).sendAppreciation(hre.ethers.ZeroAddress, 0, "Nice job!")
      ).to.be.revertedWith("Recipient cannot be zero address");
    });

    it("should prevent sending appreciation to oneself", async function () {
      await expect(
        applause.connect(alice).sendAppreciation(alice.address, 0, "Appreciating myself")
      ).to.be.revertedWith("Cannot appreciate yourself");
    });

    it("should prevent invalid category values (> 4)", async function () {
      await expect(
        applause.connect(alice).sendAppreciation(bob.address, 5, "Invalid category")
      ).to.be.revertedWith("Invalid category");
    });

    it("should prevent messages longer than 120 characters", async function () {
      const longMessage = "a".repeat(121);
      await expect(
        applause.connect(alice).sendAppreciation(bob.address, 1, longMessage)
      ).to.be.revertedWith("Message exceeds 120 characters");
    });

    it("should allow maximum length messages of 120 characters", async function () {
      const exactMessage = "a".repeat(120);
      await expect(
        applause.connect(alice).sendAppreciation(bob.address, 1, exactMessage)
      ).to.not.be.reverted;
    });

    it("should allow empty message", async function () {
      await expect(
        applause.connect(alice).sendAppreciation(bob.address, 2, "")
      ).to.not.be.reverted;
    });
  });

  describe("Sending and Querying Appreciations", function () {
    it("should emit AppreciationSent event with correct args", async function () {
      const tx = await applause.connect(alice).sendAppreciation(bob.address, 0, "Loved the UI!");
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt!.blockNumber);

      await expect(tx)
        .to.emit(applause, "AppreciationSent")
        .withArgs(0, alice.address, bob.address, 0, "Loved the UI!", block!.timestamp);
    });

    it("should accurately track all, sent, and received appreciations", async function () {
      // Alice appreciates Bob (category 0: Great Design)
      await applause.connect(alice).sendAppreciation(bob.address, 0, "Great design work!");
      // Charlie appreciates Bob (category 3: Excellent Work)
      await applause.connect(charlie).sendAppreciation(bob.address, 3, "Superb smart contract!");
      // Bob appreciates Alice (category 1: Helpful)
      await applause.connect(bob).sendAppreciation(alice.address, 1, "Thanks for the review!");

      // Check total count
      expect(await applause.getTotalCount()).to.equal(3);

      const all = await applause.getAllAppreciations();
      expect(all.length).to.equal(3);
      expect(all[0].sender).to.equal(alice.address);
      expect(all[0].recipient).to.equal(bob.address);
      expect(all[0].category).to.equal(0);
      expect(all[0].message).to.equal("Great design work!");

      // Bob's received count and items
      expect(await applause.getReceivedCount(bob.address)).to.equal(2);
      const bobReceived = await applause.getReceivedAppreciations(bob.address);
      expect(bobReceived.length).to.equal(2);
      expect(bobReceived[0].sender).to.equal(alice.address);
      expect(bobReceived[1].sender).to.equal(charlie.address);

      // Alice's sent items
      const aliceSent = await applause.getSentAppreciations(alice.address);
      expect(aliceSent.length).to.equal(1);
      expect(aliceSent[0].recipient).to.equal(bob.address);

      // Charlie's received count should be 0
      expect(await applause.getReceivedCount(charlie.address)).to.equal(0);
      const charlieReceived = await applause.getReceivedAppreciations(charlie.address);
      expect(charlieReceived.length).to.equal(0);
    });
  });
});
