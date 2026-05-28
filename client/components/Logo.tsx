export function Logo() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      {/* Optimized coverage zones + network connections */}

      {/* Top-left coverage zone - hexagon */}
      <polygon
        points="10,12 14,10 18,12 18,16 14,18 10,16"
        fill="currentColor"
        className="text-spectrum-cyan"
        style={{ opacity: 0.3 }}
      />

      {/* Top-right coverage zone - hexagon */}
      <polygon
        points="22,12 26,10 30,12 30,16 26,18 22,16"
        fill="currentColor"
        className="text-spectrum-purple"
        style={{ opacity: 0.3 }}
      />

      {/* Bottom-left coverage zone - hexagon */}
      <polygon
        points="10,24 14,22 18,24 18,28 14,30 10,28"
        fill="currentColor"
        className="text-spectrum-magenta"
        style={{ opacity: 0.3 }}
      />

      {/* Bottom-right coverage zone - hexagon */}
      <polygon
        points="22,24 26,22 30,24 30,28 26,30 22,28"
        fill="currentColor"
        className="text-spectrum-cyan"
        style={{ opacity: 0.3 }}
      />

      {/* Central optimization node - bold diamond */}
      <polygon
        points="20,16 24,20 20,24 16,20"
        fill="currentColor"
        className="text-spectrum-cyan"
      />

      {/* Network connection lines - connecting coverage zones */}
      <line
        x1="14"
        y1="14"
        x2="18"
        y2="18"
        stroke="currentColor"
        strokeWidth="1"
        className="text-spectrum-cyan"
        style={{ opacity: 0.5 }}
      />

      <line
        x1="26"
        y1="14"
        x2="22"
        y2="18"
        stroke="currentColor"
        strokeWidth="1"
        className="text-spectrum-purple"
        style={{ opacity: 0.5 }}
      />

      <line
        x1="14"
        y1="26"
        x2="18"
        y2="22"
        stroke="currentColor"
        strokeWidth="1"
        className="text-spectrum-magenta"
        style={{ opacity: 0.5 }}
      />

      <line
        x1="26"
        y1="26"
        x2="22"
        y2="22"
        stroke="currentColor"
        strokeWidth="1"
        className="text-spectrum-cyan"
        style={{ opacity: 0.5 }}
      />

      {/* Coverage zone outline emphasis - thicker borders for clarity */}
      <polygon
        points="10,12 14,10 18,12 18,16 14,18 10,16"
        stroke="currentColor"
        strokeWidth="0.7"
        className="text-spectrum-cyan"
        fill="none"
      />

      <polygon
        points="22,12 26,10 30,12 30,16 26,18 22,16"
        stroke="currentColor"
        strokeWidth="0.7"
        className="text-spectrum-purple"
        fill="none"
      />

      <polygon
        points="10,24 14,22 18,24 18,28 14,30 10,28"
        stroke="currentColor"
        strokeWidth="0.7"
        className="text-spectrum-magenta"
        fill="none"
      />

      <polygon
        points="22,24 26,22 30,24 30,28 26,30 22,28"
        stroke="currentColor"
        strokeWidth="0.7"
        className="text-spectrum-cyan"
        fill="none"
      />
    </svg>
  );
}
