// Used only for STATIC_EXPORT builds (GitHub Pages preview): serves the original files
// under the base path with no optimization. Production on Vercel uses the default loader.
export default function loader({ src }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
