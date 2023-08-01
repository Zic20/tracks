import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RecentActivities = ({ activities }) => {
  return (
    <div className="space-y-5">
      {activities.map((activity) => {
        return (
          <div
            key={activity.id}
            className="flex items-center last:border-b-0 border-b pb-2"
          >
            <Avatar className="h-9 w-9" key={activity.id}>
              <AvatarImage src={activity.image} alt="Avatar" />
              <AvatarFallback>
                {activity.title[0].toUpperCase() +
                  activity.title[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1" key={`d${activity.id}`}>
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Deadline: {activity.deadline}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
