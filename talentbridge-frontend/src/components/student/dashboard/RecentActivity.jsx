import Card from "../../common/Card";

function RecentActivity() {
    return (
        <Card className="min-h-35">
            <div
                className="
      flex
      h-full
      flex-col
      items-center
      justify-center
      text-center
    "
            >
                <div
                    className="
        mb-4
        rounded-full
        bg-slate-100
        p-4
      "
                >
                    📈
                </div>

                <h3 className="font-semibold text-slate-900">
                    No Recent Activity
                </h3>

                <p className="mt-2 text-slate-500">
                    Start applying to jobs to
                    track your progress here.
                </p>
            </div>
        </Card>
    );
}

export default RecentActivity;