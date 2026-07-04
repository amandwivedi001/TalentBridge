import ApplicationCard from "./ApplicationCard";
import EmptyApplications from "./EmptyApplications";

function ApplicationList({
    applications = [],
}) {

    if (applications.length === 0) {

        return <EmptyApplications />;

    }

    return (

        <section>

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
                style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >

                <div className="flex items-center gap-3">

                    <h2
                        className="text-2xl font-bold text-slate-900"
                    >
                        Applications
                    </h2>

                    <span
                        className="inline-flex items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700"
                        style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                            paddingTop: "0.25rem",
                            paddingBottom: "0.25rem",
                        }}
                    >
                        {applications.length}{" "}
                        {applications.length === 1
                            ? "Application"
                            : "Applications"}
                    </span>

                </div>

            </div>

            <div
                className="
                    space-y-6
                "
            >

                {applications.map((application) => (

                    <ApplicationCard
                        key={application.id}
                        application={application}
                    />

                ))}

            </div>

        </section>

    );

}

export default ApplicationList;