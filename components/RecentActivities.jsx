import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDateString } from "@/modules/timecalculation";

const RecentActivities = ({ activities }) => {
  return (
    <div className="space-y-5">
      {activities &&
        activities.map((activity) => {
          return (
            <div
              key={activity.id}
              className="flex items-center last:border-b-0 border-b pb-2"
            >
              <Avatar className="h-9 w-9" key={activity.id}>
                <AvatarImage src={activity.image} alt="Avatar" />
                <AvatarFallback>
                  {activity.Activity[0].toUpperCase() +
                    activity.Activity[1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1" key={`act${activity.id}`}>
                <p className="text-sm font-medium leading-none">
                  {activity.Activity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {getDateString(activity?.Date)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const PendingTasks = ({ tasks }) => {
  return (
    <div className="space-y-5">
      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="flex items-center last:border-b-0 border-b pb-2"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={task.image} alt="Avatar" />
              <AvatarFallback>
                {task.title.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1" key={`pending${task.id}`}>
              <p className="text-sm font-medium leading-none">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                Deadline: {task.deadline}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
