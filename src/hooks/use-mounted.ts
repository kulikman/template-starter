import { useSyncExternalStore } from "react";

const emptySubscribe = (): (() => void) => () => {};
const getSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/** Returns true after component mounts. Use to avoid hydration mismatches. */
export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}