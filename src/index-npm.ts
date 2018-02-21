import { mixer } from "./components/mixer/mixer";

interface IMagicxer {
  mix(stWord: string, ndWord: string): string[];
}

export const magicxer: IMagicxer = mixer;
