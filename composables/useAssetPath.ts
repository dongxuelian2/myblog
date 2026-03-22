import { withBase } from "ufo";

export function useAssetPath() {
  const { app } = useRuntimeConfig();

  return (src?: string) => {
    if (!src) return "";
    if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) {
      return src;
    }
    return withBase(src, app.baseURL);
  };
}
