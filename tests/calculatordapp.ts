import assert from "assert";
import anchor from "@project-serum/anchor";
let { SystemProgram } = anchor.web3;
describe("mycalculatordapp", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.calculatordapp;

  it("create a calculator", async () => {
    await program.rpc.create("Welcome to solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.greeting == "Welcom to solana");
  });
});
