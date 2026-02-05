const riskColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  const { title, summary: shortSummary, key_points, risk_level } = summary;

  return (
    <div className="mt-3 space-y-3 rounded bg-gray-50 p-3">
      {/* Title */}
      {title && (
        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>
      )}

      {/* Risk Badge */}
      {risk_level && (
        <span
          className={`inline-block rounded px-2 py-1 text-xs font-medium ${
            riskColors[risk_level] || "bg-gray-200 text-gray-700"
          }`}
        >
          Risk Level: {risk_level}
        </span>
      )}

      {/* Summary Text */}
      {shortSummary && (
        <p className="text-sm text-gray-700">
          {shortSummary}
        </p>
      )}

      {/* Key Points */}
      {Array.isArray(key_points) && key_points.length > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          {key_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryCard;
