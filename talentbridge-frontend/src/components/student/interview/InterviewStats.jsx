import { useEffect, useState } from "react";
import { Brain, Target, TrendingUp, Trophy } from "lucide-react";

import Card from "../../common/Card";
import { getInterviewStats } from "../../../services/interview.service";

function StatCard({ title, value, icon: Icon, loading }) {
  return (
    <Card className="border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          {loading ? (
            <div
              className="h-8 w-12 animate-pulse rounded bg-slate-100"
              style={{
                marginTop: "0.5rem",
              }}
            />
          ) : (
            <h3
              className="text-3xl font-bold"
              style={{
                marginTop: "0.5rem",
              }}
            >
              {value}
            </h3>
          )}
        </div>

        <div
          className="rounded-2xl bg-indigo-50"
          style={{
            padding: "0.75rem",
          }}
        >
          <Icon
            size={24}
            className="text-indigo-600"
          />
        </div>
      </div>
    </Card>
  );
}

function InterviewStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getInterviewStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total =
    stats?.totalInterviews ?? 0;

  const completed =
    stats?.completedInterviews ?? 0;

  const avgScore =
    stats?.averageScore != null
      ? `${stats.averageScore}%`
      : "—";

  const bestScore =
    stats?.bestScore != null
      ? `${stats.bestScore}%`
      : "—";

  return (
    <div
      className="
        grid
        sm:grid-cols-2
        xl:grid-cols-4
      "
      style={{
        gap: "1.5rem",
      }}
    >
      <StatCard
        title="Total Interviews"
        value={total}
        icon={Brain}
        loading={loading}
      />

      <StatCard
        title="Completed"
        value={completed}
        icon={Target}
        loading={loading}
      />

      <StatCard
        title="Average Score"
        value={avgScore}
        icon={TrendingUp}
        loading={loading}
      />

      <StatCard
        title="Best Score"
        value={bestScore}
        icon={Trophy}
        loading={loading}
      />
    </div>
  );
}

export default InterviewStats;