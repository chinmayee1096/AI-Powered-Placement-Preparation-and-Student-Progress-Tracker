import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ConsistencyChart({ data = [] }) {
  return (
    <div className="chart-card">
      <h3>Weekly Consistency</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { weekday: "short" })} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
