"use client";

import { useWaitlist } from "./WaitlistProvider";

export default function WaitlistButton({
  source,
  children,
  className,
}: {
  source: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { openWaitlist } = useWaitlist();
  return (
    <button onClick={() => openWaitlist(source)} className={className}>
      {children}
    </button>
  );
}
