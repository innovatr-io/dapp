export function PieChart({ percentage }: { percentage: number }) {
  // Calculate the circumference of the circle
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on the percentage
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="inline-flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 30 30">
        {/* Background circle */}
        <circle
          cx="15"
          cy="15"
          r={radius}
          className="stroke-base-300"
          fill="transparent"
          strokeWidth="3"
        />
        {/* Percentage circle */}
        <circle
          cx="15"
          cy="15"
          r={radius}
          className="stroke-primary"
          fill="transparent"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 15 15)"
        />
      </svg>
    </div>
  );
}
