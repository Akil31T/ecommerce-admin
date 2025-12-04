
import Image from "next/image";

import {
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"


export default function PreView({
  preview,
}: {
  preview: string
}) {
  return (
    <>
 <DialogContent className="[button[data-slot='dialog-close']]:hidden">
      <DialogDescription>
       <Image src={preview} alt="preview" width={600} height={100} />
      </DialogDescription>
  </DialogContent>
  </>

  );
}
