import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

export default function DatePicker() {
  const [date, setDate] = useState<Date>()

  return <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" data-empty={!date} className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
        {date ? format(date, "PPP") : <span>Seleccione una fecha</span>}
        <ChevronDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={date}
      />
    </PopoverContent>
  </Popover>
}
