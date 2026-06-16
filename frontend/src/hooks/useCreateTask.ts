import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TaskManagerABI } from "../abis";
import { parseEther } from "viem";

const TASK_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TASK_MANAGER_ADDRESS as `0x${string}`;

export function useCreateTask() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createTask = async (title: string, description: string, rewardEth: string, deadline: number) => {
    writeContract({
      address: TASK_MANAGER_ADDRESS,
      abi: TaskManagerABI,
      functionName: "createTask",
      args: [title, description, parseEther(rewardEth), deadline],
      value: parseEther(rewardEth), // The contract requires the reward to be sent as msg.value
    });
  };

  return {
    createTask,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
}
