import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TaskManagerABI } from "../abis";

const TASK_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TASK_MANAGER_ADDRESS as `0x${string}`;

export function useAcceptTask() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const acceptTask = async (taskId: number) => {
    writeContract({
      address: TASK_MANAGER_ADDRESS,
      abi: TaskManagerABI,
      functionName: "acceptTask",
      args: [taskId],
    });
  };

  return {
    acceptTask,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
}
