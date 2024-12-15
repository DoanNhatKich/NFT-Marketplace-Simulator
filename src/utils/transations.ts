import { Lucid, UTxO } from "lucid-cardano";

export async function createPurchaseTransaction(
  lucid: Lucid,
  sellerAddress: string,
  price: number,
  utxo: UTxO
) {
  try {
    const tx = await lucid
      .newTx()
      .collectFrom([utxo])
      .payToAddress(sellerAddress, { lovelace: BigInt(price * 1000000) })
      .complete();

    const signedTx = await tx.sign().complete();
    return await signedTx.submit();
  } catch (error) {
    console.error("Error creating purchase transaction:", error);
    throw error;
  }
}
