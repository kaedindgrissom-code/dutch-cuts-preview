"use client";

import { useEffect, useState } from "react";

let firstLoad = true;

/**
 * Re-mounts on every client navigation. The 260ms fade/rise runs only on those
 * navigations, never on the first paint, so it costs nothing on LCP.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => !firstLoad);
  useEffect(() => {
    firstLoad = false;
  }, []);
  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
