import { useEffect } from "react";
import { ZodSchema } from "zod";

export const CMSPARENT = "http://localhost:5009";

export function useListener(func: (event: MessageEvent) => void, schema: ZodSchema) {
  useEffect(() => {
    window.addEventListener("message", messageEventHandler);
    return () => window.removeEventListener("message", messageEventHandler);
  }, []);

  function messageEventHandler(event: MessageEvent) {
    return handleMessage(event, func, schema);
  }

  function handleMessage(
    event: MessageEvent,
    func: (event: MessageEvent) => void,
    schema: ZodSchema
  ) {
    if (event.origin !== CMSPARENT) return;
    const result = schema.safeParse(event.data);
    if (!result.success) return;
    return func(event);
  }
  return;
}
