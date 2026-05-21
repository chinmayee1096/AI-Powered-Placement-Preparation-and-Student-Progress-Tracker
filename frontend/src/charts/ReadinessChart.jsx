import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ReadinessChart({ score = 0 }) {
  const data = [
    { name: "Ready", value: score },
    { name: "Gap", value: Math.max(0, 100 - score) }
  ];
  return (
    <div className="chart-card">
      <h3>Readiness Score</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie innerRadius={70} outerRadius={96} data={data} dataKey="value">
            <Cell fill="#16a34a" />
            <Cell fill="#e5e7eb" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="center-score">{score}%</div>
    </div>
  );
}
