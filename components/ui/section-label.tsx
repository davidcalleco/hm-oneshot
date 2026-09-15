/** The mono index label that opens every section: `01 / Studio`. */
export function SectionLabel({
  index,
  label,
  invert = false,
  className = "",
}: {
  index: string;
  label: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`type-label ${invert ? "text-faint-invert" : "text-faint"} ${className}`}
    >
      <span className={invert ? "text-signal-invert" : "text-signal"}>
        {index}
      </span>
      &nbsp;/&nbsp;{label}
    </p>
  );
}
