import { useReadContract } from "wagmi";
import { ReputationABI } from "../abis";

const REPUTATION_ADDRESS = process.env.NEXT_PUBLIC_REPUTATION_ADDRESS as `0x${string}`;

export function useUserReputation(userAddress: `0x${string}` | undefined) {
  const { data: reputation, isLoading, error } = useReadContract({
    address: REPUTATION_ADDRESS,
    abi: ReputationABI,
    functionName: "reputationScores",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    }
  });

  return {
    reputation,
    isLoading,
    error,
  };
}
