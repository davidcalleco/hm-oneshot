/** A bordered pill used for disciplines and other short metadata. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-label rounded-full border border-line-strong px-3 py-1.5 text-body">
      {children}
    </span>
  );
}
