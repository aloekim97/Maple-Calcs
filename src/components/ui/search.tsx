import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-full border border-[#00000033] bg-transparent px-3 py-1 text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm justify-between",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    >
      <input
        type={type}
        data-slot="input"
        className="flex grow w-full focus-visible:border-ring-transparent outline-0"
        {...props}
      />
    <Image
    src={"/image/Search_Icon.svg"}
    height={16}
    width={16}
    alt="Search_Icon"
    role="img"
    style={{
      width: 'auto', 
      height: 'auto' 
    }}
    />
    </div>
  )
}

export { Input }
