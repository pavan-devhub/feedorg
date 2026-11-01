// Renders text stored as an array of lines. Each line is its own block on wide
// screens (see `.locked-line` in Discover.css) and flows as normal text on
// narrower ones.
export default function Lines({ lines }) {
  return lines.map((line) => (
    <span key={line} className="locked-line">
      {`${line} `}
    </span>
  ))
}
