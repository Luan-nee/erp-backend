import type { PropColor } from "./color.js";

export type PropResponse = {
  status: number;
  message: string;
  info: PropColor[] | null;
}