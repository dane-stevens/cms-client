import { useEffect } from "react";

export const CMSPARENT = "http://localhost:5009";

export function useListener(func: (event: MessageEvent) => void, actions: string[]) {
  useEffect(() => {
    window.addEventListener("message", (event) => handleMessage(event, func, actions));
    return () => window.removeEventListener("message", () => handleMessage);
  }, []);
}

function handleMessage(
  event: MessageEvent,
  func: (event: MessageEvent) => void,
  actions: string[]
) {
  if (event.origin !== CMSPARENT) return;
  if (!actions.includes(event.data._action)) return;
  console.log("HANDLE MESSAGE TRIGGERED-------------------------", event.data);
  return func(event);
}
