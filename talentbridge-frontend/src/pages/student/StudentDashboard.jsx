import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  FileText,
  Users,
  Briefcase,
  Award,
  Brain,
  Target,
  TrendingUp,
  Trophy,
  Activity,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

import { getStudentDashboard } from "../../services/dashborad.service";

import ResumeScoreCard from "../../components/dashboard/ResumeScoreCard";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import DashboardHero from "../../components/dashboard/DashBoardHero";
import AIInsightCard from "../../components/dashboard/AIIngsightCard";
import ApplicationPipeline from "../../components/dashboard/ApplicationPipeline";

function StudentDashboard() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const data =
            await getStudentDashboard();

          setDashboardData(data);
        } catch (error) {
          console.error(
            "Dashboard Error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const {
    resumeScore,
    applications,
    interviews,
    resumeInsights
  } = dashboardData;

  return (
    <div
  className="
    w-full
    space-y-6
  "
>
      <DashboardHero
        user={user}
        applications={applications}
        interviews={interviews}
        resumeScore={resumeScore}
      />

      {/* ATS + Quick Actions */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="lg:col-span-2">
          <ResumeScoreCard score={resumeScore} />
        </div>

        <QuickActions />
      </section>

      {/* AI Insights */}
      <section>
        <AIInsightCard
          insights={resumeInsights}
          score={resumeScore}
        />
      </section>

      {/* Application Pipeline */}
      <section>
        <ApplicationPipeline
          applied={applications.applied}
          shortlisted={applications.shortlisted}
          interview={applications.interview}
          hired={applications.hired}
        />
      </section>

      {/* Interview Performance */}
      <section>
        <h2
          className="
        mb-4
        text-xl
        font-semibold
        text-slate-900
      "
        >
          Interview Performance
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total"
            value={interviews.total}
            subtitle="Sessions attended"
            icon={Brain}
            color="blue"
          />

          <StatCard
            title="Completed"
            value={interviews.completed}
            subtitle="Finished interviews"
            icon={CheckCircle}
            color="green"
          />

          <StatCard
            title="Average"
            value={interviews.averageScore}
            subtitle="Performance"
            icon={TrendingUp}
            color="purple"
          />

          <StatCard
            title="Best"
            value={interviews.bestScore}
            subtitle="Highest score"
            icon={Trophy}
            color="amber"
          />

          <StatCard
            title="Latest"
            value={interviews.latestInterviewScore}
            subtitle="Recent result"
            icon={Activity}
            color="blue"
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <RecentActivity />
      </section>
    </div>
  );
}

export default StudentDashboard;