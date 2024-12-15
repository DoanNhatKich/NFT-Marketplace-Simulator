import { Lucid, MintingPolicy, fromText, PolicyId } from "lucid-cardano";
import { NFTMetadata } from "../types/marketplace";

export async function getMintingPolicy(
  lucid: Lucid,
  address: string
): Promise<{ mintingPolicy: MintingPolicy; policyId: PolicyId }> {
  const { paymentCredential } = lucid.utils.getAddressDetails(address);

  if (!paymentCredential) {
    throw new Error("Payment credential not found");
  }

  const mintingPolicy = lucid.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      { type: "sig", keyHash: paymentCredential.hash },
      {
        type: "before",
        slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
      },
    ],
  });

  const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
  return { mintingPolicy, policyId };
}

export function createNFTMetadata(policyId: string, metadata: NFTMetadata) {
  return {
    "721": {
      [policyId]: {
        [metadata.name]: {
          ...metadata,
          mediaType: "image/jpeg",
          files: [
            {
              name: metadata.name,
              mediaType: "image/jpeg",
              src: metadata.image,
            },
          ],
        },
      },
    },
  };
}

export async function mintNFT(
  lucid: Lucid,
  address: string,
  metadata: NFTMetadata
): Promise<string> {
  const { mintingPolicy, policyId } = await getMintingPolicy(lucid, address);
  const assetName = fromText(metadata.name);
  const assetId = policyId + assetName;

  const nftMetadata = createNFTMetadata(policyId, metadata);

  const tx = await lucid
    .newTx()
    .mintAssets({ [assetId]: 1n })
    .attachMetadata(721, nftMetadata["721"])
    .validTo(Date.now() + 200000)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();
  return await signedTx.submit();
}
