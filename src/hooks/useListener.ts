import { useEffect } from "react";

export const CMSPARENT = "http://localhost:5009";

export function useListener(func: (event: MessageEvent) => void) {
  useEffect(() => {
    window.addEventListener("message", (event) => handleMessage(event, func));
    return () => window.removeEventListener("message", () => handleMessage);
  }, []);
}

function handleMessage(event: MessageEvent, func: (event: MessageEvent) => void) {
  if (event.origin !== CMSPARENT) return;
  return func(event);
}