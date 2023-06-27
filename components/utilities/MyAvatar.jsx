import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MyAvatar({ image, alt, fallback, className }) {
  return (
    <Avatar className={className}>
      <AvatarImage className="h-full w-full" src={image} alt={alt} />
      <AvatarFallback className="h-full w-full">
        <AvatarImage
          className="h-full w-full"
          src="https://github.com/shadcn.png"
          alt={alt}
        />
      </AvatarFallback>
    </Avatar>
  );
}
