import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MyDialog({ title, description, children, className }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white w-max" variant="outline">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
