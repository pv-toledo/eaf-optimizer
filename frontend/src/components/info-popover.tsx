import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type InfoPopoverProps = {
    children: React.ReactNode
}

export function InfoPopover({ children }: InfoPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger
                aria-label="More information"
                className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground"
            >
                <Info className="h-3.5 w-3.5" />
            </PopoverTrigger>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    )
}