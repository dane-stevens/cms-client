import { z } from "zod";

export const ALLOW_NAVIGATE = "ALLOW_NAVIGATE";
export const DRAGGING = "DRAGGING";
export const DROPPED = "DROPPED";
export const DELETE = "DELETE";
export const EDIT = "EDIT";

export type EventActions = z.infer<typeof EventActions>[];
export const EventActions = z.enum([ALLOW_NAVIGATE, DRAGGING, DROPPED, DELETE, EDIT]);

export const MessageEvent_AllowNavigate = z.object({
  _action: z.literal(ALLOW_NAVIGATE),
  isNavigateEnabled: z.boolean(),
});

export const MessageEvent_Dragging = z.object({
  _action: z.literal(DRAGGING),
  x: z.number(),
  y: z.number(),
});

export const MessageEvent_Dropped = z.object({
  _action: z.literal(DROPPED),
  x: z.number(),
  y: z.number(),
  component: z.object({
    id: z.string().cuid2(),
    component: z.string(),
    data: z.any(),
  }),
});

export const MessageEvent_Delete = z.object({
  _action: z.literal(DELETE),
  id: z.string().cuid2(),
});

export const MessageEvent_Edit = z.object({
  _action: z.literal(EDIT),
  id: z.string().cuid2(),
  field: z.string(),
  value: z.any(),
});
