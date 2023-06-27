import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DUMMY_ACTIVITIES = [
  {
    id: 1,
    image: "",
    title: "Choir practice",
    date: "Thursday June 19, 2023",
  },
  {
    id: 2,
    image: "",
    title: "Choir practice",
    date: "Thursday June 19, 2023",
  },
  {
    id: 3,
    image: "",
    title: "Choir practice",
    date: "Thursday June 19, 2023",
  },
  {
    id: 4,
    image: "",
    title: "Choir practice",
    date: "Thursday June 19, 2023",
  },
];

const RecentActivities = () => {
  return (
    <div className="space-y-5">
      {DUMMY_ACTIVITIES.map((activity) => {
        return (
          <div
            key={activity.id}
            className="flex items-center last:border-b-0 border-b pb-2"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.image} alt="Avatar" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
            {/* <div className="ml-auto font-medium">+$99.00</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
