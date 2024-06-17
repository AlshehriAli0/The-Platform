import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatTime } from "@/utils/helpers/date";
import Image from "next/image";

type FeedCards = {
  image: string;
  caption: string;
  avatar: string;
  userName: string;
  time: Date;
};

export function FeedCard({
  image,
  caption,
  avatar,
  userName,
  time,
}: FeedCards) {
  const formattedTime = formatTime(time);
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 p-4 px-12 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
      <div className="max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-950">
        <div className="relative">
          <Image
            src={image}
            alt="Post Image"
            width={600}
            height={400}
            className="h-60 w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="truncate text-sm font-medium text-white">{caption}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
