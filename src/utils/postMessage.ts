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
    href: z.string(),
    pathname: z.string(),
  }),
});

const PostMessage_ComponentSelected = z.object({
  _action: z.literal("COMPONENT_SELECTED"),
  id: z.string().cuid2(),
  page: z.string(),
  component: z.string(),
  data: z.any(),
  dataPath: z.string(),
});

const PostMessage_Dropped = z.object({
  _action: z.literal("DROPPED"),
  page: z.string(),
  component: z.object({
    id: z.string().cuid2(),
    component: z.string(),
    data: z.any(),
  }),
  dataPath: z.string(),
  index: z.number(),
});

type PostMessageSchema = z.infer<typeof PostMessageSchema>;
const PostMessageSchema = z.discriminatedUnion("_action", [
  PostMessage_Handshake,
  PostMessage_ComponentSelected,
  PostMessage_Dropped,
]);
