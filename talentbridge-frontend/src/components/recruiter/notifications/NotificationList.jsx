import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

function NotificationList({

    notifications = [],

    onNotificationClick,

}) {

    if (notifications.length === 0) {

        return <EmptyNotifications />;

    }

    return (

        <div
            style={{
                gap: "1.25rem",
            }}
            className="flex flex-col"
        >

            {notifications.map(

                (notification) => (

                    <NotificationCard

                        key={notification.id}

                        notification={notification}

                        onClick={onNotificationClick}

                    />

                )

            )}

        </div>

    );

}

export default NotificationList;