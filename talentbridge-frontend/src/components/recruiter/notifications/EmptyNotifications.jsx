import { BellOff } from "lucide-react";

function EmptyNotifications() {

    return (

        <div
            style={{
                padding: "5rem 2rem",
            }}
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-slate-200
                bg-white
                text-center
            "
        >

            <div
                className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                "
            >

                <BellOff
                    size={36}
                    className="text-slate-400"
                />

            </div>

            <h2
                style={{
                    marginTop: "2rem",
                }}
                className="
                    text-2xl
                    font-bold
                    text-slate-900
                "
            >
                You're all caught up!
            </h2>

            <p
                style={{
                    marginTop: "0.75rem",
                }}
                className="
                    max-w-md
                    leading-7
                    text-slate-500
                "
            >
                You don't have any notifications right now.
                New application updates, hiring activity,
                and important platform alerts will appear here.
            </p>

        </div>

    );

}

export default EmptyNotifications;