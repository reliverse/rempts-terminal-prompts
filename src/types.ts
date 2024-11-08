import type { TSchema } from "@sinclair/typebox";

export type ColorName =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "cyanBright"
  | "white"
  | "gray"
  | "grey"
  | "none";

export type Choice = {
  title: string;
  value: any;
  description?: string;
};

export type PromptType =
  | "text"
  | "number"
  | "confirm"
  | "select"
  | "multiselect"
  | "password"
  | "date";

export type PromptOptions<T extends TSchema = any> = {
  type: PromptType;
  id: string;
  title: string;
  hint?: string;
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
  default?: any;
  choices?: Choice[];
  schema?: T;
  color?: ColorName;
};
