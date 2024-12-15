// import { useState } from 'react';
// import { useLucid } from '../context/LucidProvider';

// export const NFTAuction = () => {
//   const { lucid, address, createAuction, placeBid, claimNFT } = useLucid();
//   const [nftPolicyId, setNftPolicyId] = useState('');
//   const [nftName, setNftName] = useState('');
//   const [minimumBid, setMinimumBid] = useState('');
//   const [duration, setDuration] = useState('24'); // hours
//   const [bidAmount, setBidAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState('');

//   const handleCreateAuction = async () => {
//     try {
//       setLoading(true);
//       const tx = await createAuction(
//         nftPolicyId,
//         nftName,
//         BigInt(Number(minimumBid) * 1000000), // Convert to lovelace
//         Number(duration) * 3600000 // Convert hours to milliseconds
//       );
//       setTxHash(tx);
//     } catch (error) {
//       console.error('Error creating auction:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlaceBid = async (auctionId: string) => {
//     try {
//       setLoading(true);
//       const tx = await placeBid(
//         auctionId,
//         BigInt(Number(bidAmount) * 1000000) // Convert to lovelace
//       );
//       setTxHash(tx);
//     } catch (error) {
//       console.error('Error placing bid:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 border-t pt-8">
//       <h2 className="text-3xl font-bold mb-6">NFT Auction</h2>
      
//       {/* Create Auction Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Create Auction</h3>
//         <div className="flex flex-col gap-4 max-w-md">
//           <input
//             type="text"
//             placeholder="NFT Policy ID"
//             value={nftPolicyId}
//             onChange={(e) => setNftPolicyId(e.target.value)}
//             className="border rounded p-2"
//           />
//           <input
//             type="text"
//             placeholder="NFT Name"
//             value={nftName}
//             onChange={(e) => setNftName(e.target.value)}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Minimum Bid (ADA)"
//             value={minimumBid}
//             onChange={(e) => setMinimumBid(e.target.value)}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Duration (hours)"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="border rounded p-2"
//           />
//           <button
//             onClick={handleCreateAuction}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//           >
//             {loading ? 'Creating...' : 'Create Auction'}
//           </button>
//         </div>
//       </div>

//       {/* Display Transaction Hash */}
//       {txHash && (
//         <div className="mt-4 p-4 bg-gray-100 rounded">
//           <p className="text-sm text-gray-600">Transaction Hash:</p>
//           <a
//             href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-mono text-sm break-all text-blue-500 hover:text-blue-700"
//           >
//             {txHash}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }; 