import type { ArtworkId, Tone } from "@/lib/content";

/**
 * Conceptual project artwork.
 *
 * These are drawn rather than photographed on purpose: the work shown on this
 * site is illustrative, so the imagery is diagrammatic — systems, not scenes.
 * Every composition uses the same ink / paper / signal palette so the work
 * index reads as one body of work.
 */

const toneClass: Record<Tone, string> = {
  paper: "bg-white text-ink [--art-accent:var(--color-signal)]",
  cream: "bg-cream text-ink [--art-accent:var(--color-signal)]",
  ink: "bg-ink text-[#e9e7e1] [--art-accent:#7e93ff]",
  signal: "bg-signal text-white [--art-accent:#ffffff]",
};

type Props = {
  id: ArtworkId;
  tone: Tone;
  className?: string;
};

export function Artwork({ id, tone, className = "" }: Props) {
  const Shape = shapes[id];
  return (
    <div
      className={`texture-grain relative h-full w-full overflow-hidden ${toneClass[tone]} ${className}`}
    >
      <svg
        viewBox="0 0 800 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
        className="h-full w-full"
      >
        <Shape />
      </svg>
    </div>
  );
}

const S = {
  stroke: "currentColor",
  fill: "none",
  vectorEffect: "non-scaling-stroke",
} as const;

/* -------------------------------------------------------------------------- */

/** 01 — A clearer front door: a page reduced to the decisions it presents. */
function FrontDoor() {
  return (
    <g>
      <g opacity={0.14}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={80 + i * 80} y1={0} x2={80 + i * 80} y2={1000} {...S} strokeWidth={1} />
        ))}
      </g>
      <path d="M160 640V300a240 240 0 0 1 480 0v340" {...S} strokeWidth={2} />
      <path d="M232 640V300a168 168 0 0 1 336 0v340" {...S} strokeWidth={1.25} opacity={0.5} />
      <line x1="120" y1="640" x2="680" y2="640" {...S} strokeWidth={2} />
      <rect x="312" y="428" width="176" height="212" fill="var(--art-accent)" opacity={0.92} />
      <line x1="400" y1="428" x2="400" y2="640" stroke="currentColor" strokeWidth={1.25} opacity={0.35} />
      <g>
        <line x1="160" y1="726" x2="640" y2="726" {...S} strokeWidth={10} />
        <line x1="160" y1="772" x2="512" y2="772" {...S} strokeWidth={10} />
        <line x1="160" y1="836" x2="392" y2="836" {...S} strokeWidth={2} opacity={0.6} />
        <line x1="160" y1="868" x2="440" y2="868" {...S} strokeWidth={2} opacity={0.6} />
        <line x1="160" y1="900" x2="336" y2="900" {...S} strokeWidth={2} opacity={0.6} />
      </g>
      <circle cx="400" cy="200" r="9" fill="var(--art-accent)" />
    </g>
  );
}

/** 02 — A workflow that answers itself: retrieval as a connected graph. */
function Knowledge() {
  const nodes = [
    [160, 200], [352, 136], [592, 228], [656, 432], [120, 388], [296, 356],
    [472, 396], [200, 596], [400, 540], [616, 636], [288, 788], [512, 812],
    [136, 748], [664, 856],
  ];
  const edges = [
    [0, 5], [1, 5], [2, 3], [2, 1], [4, 0], [4, 7], [5, 6], [6, 3], [6, 8],
    [8, 7], [8, 9], [7, 12], [10, 8], [10, 12], [11, 9], [11, 10], [13, 11], [9, 6],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          {...S}
          strokeWidth={1.25}
          opacity={0.42}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill="currentColor" opacity={0.75} />
      ))}
      <g>
        <circle cx="400" cy="540" r="16" fill="var(--art-accent)" />
        <circle cx="400" cy="540" r="46" {...S} strokeWidth={1.5} opacity={0.8} />
        <circle cx="400" cy="540" r="92" {...S} strokeWidth={1.25} opacity={0.45} />
        <circle cx="400" cy="540" r="148" {...S} strokeWidth={1} opacity={0.22} />
      </g>
      <g opacity={0.9}>
        <line x1="400" y1="540" x2="472" y2="396" stroke="var(--art-accent)" strokeWidth={2.5} />
        <line x1="400" y1="540" x2="200" y2="596" stroke="var(--art-accent)" strokeWidth={2.5} />
        <line x1="400" y1="540" x2="616" y2="636" stroke="var(--art-accent)" strokeWidth={2.5} />
      </g>
    </g>
  );
}

/** 03 — The quiet operator: repetitive passes collapsing into one line. */
function Automation() {
  const rows = Array.from({ length: 12 }, (_, i) => i);
  return (
    <g>
      {rows.map((i) => {
        const y = 150 + i * 60;
        const segments = Math.max(1, 11 - i);
        return (
          <g key={i}>
            {Array.from({ length: segments }, (_, j) => (
              <line
                key={j}
                x1={110 + j * 52}
                y1={y}
                x2={110 + j * 52 + 34}
                y2={y}
                {...S}
                strokeWidth={i > 8 ? 6 : 3}
                opacity={0.25 + (i / 12) * 0.65}
              />
            ))}
            <line
              x1={110 + segments * 52 + 12}
              y1={y}
              x2={690}
              y2={y}
              stroke="var(--art-accent)"
              strokeWidth={i > 8 ? 6 : 1.5}
              opacity={i > 8 ? 1 : 0.35}
            />
          </g>
        );
      })}
      <line x1="690" y1="150" x2="690" y2="810" {...S} strokeWidth={2} />
      <circle cx="690" cy="810" r="12" fill="var(--art-accent)" />
      <line x1="110" y1="884" x2="690" y2="884" {...S} strokeWidth={1} opacity={0.4} />
    </g>
  );
}

/** 04 — An instrument, not a spreadsheet: a purpose-built control surface. */
function Instrument() {
  return (
    <g>
      <rect x="90" y="120" width="620" height="760" {...S} strokeWidth={2} />
      <line x1="90" y1="212" x2="710" y2="212" {...S} strokeWidth={2} />
      <circle cx="140" cy="166" r="10" fill="var(--art-accent)" />
      <line x1="184" y1="166" x2="330" y2="166" {...S} strokeWidth={4} opacity={0.7} />
      <line x1="452" y1="480" x2="452" y2="880" {...S} strokeWidth={1.5} opacity={0.5} />
      <line x1="90" y1="480" x2="710" y2="480" {...S} strokeWidth={1.5} opacity={0.5} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const h = [120, 186, 84, 224, 148, 196, 110][i];
        return (
          <rect
            key={i}
            x={124 + i * 42}
            y={444 - h}
            width={22}
            height={h}
            fill={i === 3 ? "var(--art-accent)" : "currentColor"}
            opacity={i === 3 ? 1 : 0.28}
          />
        );
      })}
      <path d="M492 400 l36-52 34 26 40-74 38 34 40-88" {...S} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="680" cy="246" r="6" fill="currentColor" opacity={0.4} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1="128" y1={540 + i * 66} x2="416" y2={540 + i * 66} {...S} strokeWidth={2} opacity={0.32} />
          <rect x="128" y={524 + i * 66} width={i === 1 ? 118 : 62} height={20} fill="currentColor" opacity={i === 1 ? 0.85 : 0.18} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={532 + i * 76} cy="600" r="34" {...S} strokeWidth={2} opacity={0.45} />
          <line x1={532 + i * 76} y1="600" x2={532 + i * 76 + (i === 1 ? 24 : -18)} y2={600 - (i === 1 ? 24 : 28)} {...S} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      <rect x="492" y="716" width="192" height="104" fill="var(--art-accent)" opacity={0.18} />
      <rect x="492" y="716" width="192" height="104" {...S} strokeWidth={2} />
    </g>
  );
}

/** 05 — A relationship that remembers: a lifecycle that returns to its centre. */
function Membership() {
  const ring = (r: number, opacity: number) => (
    <circle cx="400" cy="500" r={r} {...S} strokeWidth={1.25} opacity={opacity} />
  );
  const dot = (r: number, deg: number, size: number, accent = false) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    // Rounded so server and client render byte-identical coordinates.
    const round = (n: number) => Math.round(n * 100) / 100;
    return (
      <circle
        cx={round(400 + r * Math.cos(rad))}
        cy={round(500 + r * Math.sin(rad))}
        r={size}
        fill={accent ? "var(--art-accent)" : "currentColor"}
        opacity={accent ? 1 : 0.7}
      />
    );
  };
  return (
    <g>
      {ring(120, 0.55)}
      {ring(210, 0.4)}
      {ring(300, 0.28)}
      {ring(390, 0.16)}
      <circle cx="400" cy="500" r="20" fill="var(--art-accent)" />
      {dot(120, 42, 9)}
      {dot(120, 186, 9)}
      {dot(120, 300, 9)}
      {dot(210, 18, 11, true)}
      {dot(210, 132, 9)}
      {dot(210, 248, 9)}
      {dot(300, 74, 9)}
      {dot(300, 200, 12, true)}
      {dot(300, 320, 9)}
      {dot(390, 108, 9)}
      {dot(390, 262, 9)}
      <path d="M400 380 A120 120 0 0 1 480 608" stroke="var(--art-accent)" fill="none" strokeWidth={3} />
      <path d="M610 500 A210 210 0 0 1 330 700" stroke="var(--art-accent)" fill="none" strokeWidth={2} opacity={0.6} />
      <line x1="60" y1="500" x2="200" y2="500" {...S} strokeWidth={1.5} opacity={0.35} />
      <line x1="600" y1="500" x2="740" y2="500" {...S} strokeWidth={1.5} opacity={0.35} />
      <line x1="400" y1="60" x2="400" y2="180" {...S} strokeWidth={1.5} opacity={0.35} />
      <line x1="400" y1="820" x2="400" y2="940" {...S} strokeWidth={1.5} opacity={0.35} />
    </g>
  );
}

/** 06 — A room for hard decisions: one chosen path among stated alternatives. */
function Foresight() {
  const paths = [
    "M120 760 C 300 700 420 600 700 180",
    "M120 760 C 300 720 420 660 700 320",
    "M120 760 C 300 740 420 700 700 460",
    "M120 760 C 320 760 460 760 700 600",
    "M120 760 C 320 780 460 820 700 740",
    "M120 760 C 320 800 460 880 700 880",
  ];
  return (
    <g>
      <g opacity={0.12}>
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1={80} y1={120 + i * 80} x2={720} y2={120 + i * 80} {...S} strokeWidth={1} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={80 + i * 80} y1={120} x2={80 + i * 80} y2={920} {...S} strokeWidth={1} />
        ))}
      </g>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          {...S}
          strokeWidth={i === 1 ? 4 : 1.5}
          strokeDasharray={i === 1 ? undefined : "2 10"}
          strokeLinecap="round"
          stroke={i === 1 ? "var(--art-accent)" : "currentColor"}
          opacity={i === 1 ? 1 : 0.55}
        />
      ))}
      <circle cx="120" cy="760" r="13" fill="currentColor" />
      <circle cx="700" cy="320" r="13" fill="var(--art-accent)" />
      <line x1="80" y1="760" x2="720" y2="760" {...S} strokeWidth={2} opacity={0.5} />
      <line x1="700" y1="120" x2="700" y2="920" {...S} strokeWidth={1.5} opacity={0.35} />
    </g>
  );
}

const shapes: Record<ArtworkId, () => React.JSX.Element> = {
  "front-door": FrontDoor,
  knowledge: Knowledge,
  automation: Automation,
  instrument: Instrument,
  membership: Membership,
  foresight: Foresight,
};
