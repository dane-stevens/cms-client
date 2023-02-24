import { CMSPARENT } from "src/hooks/useListener";
import { z } from "zod";

export function postMessage(event: PostMessageSchema) {
  const targetWindow = window.parent;

  const data = PostMessageSchema.parse(event);

  return targetWindow.postMessage(data, CMSPARENT);
}

const PostMessage_Handshake = z.object({
  _action: z.literal("HANDSHAKE"),
  location: z.object({
    href: z.string().url(),
    pathname: z.string().url(),
  }),
});

const PostMessage_ComponentSelected = z.object({
  _action: z.literal("COMPONENT_SELECTED"),
  id: z.string().cuid(),
  page: z.string().url(),
  component: z.string(),
  data: z.any(),
  dataPath: z.string(),
});

const PostMessage_Dropped = z.object({
  _action: z.literal("DROPPED"),
  page: z.string().url(),
  component: z.string(),
  dataPath: z.string(),
  index: z.number(),
});

type PostMessageSchema = z.infer<typeof PostMessageSchema>;
const PostMessageSchema = z.union([
  PostMessage_Handshake,
  PostMessage_ComponentSelected,
  PostMessage_Dropped,
]);
