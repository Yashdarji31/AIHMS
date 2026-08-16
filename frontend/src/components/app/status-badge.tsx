import { cn } from "@/lib/utils";


export function StatusBadge({
  status
}: {
  status: string
}) {


  const styles: any = {

    active:
      "bg-green-500/10 text-green-600",

    completed:
      "bg-blue-500/10 text-blue-600",

    pending:
      "bg-yellow-500/10 text-yellow-600",

    cancelled:
      "bg-red-500/10 text-red-600",

  };


  return (

    <span

      className={cn(

        "rounded-full",

        "px-3",

        "py-1",

        "text-xs",

        "font-medium",

        styles[status.toLowerCase()]
        ||
        "bg-muted"

      )}

    >

      {status}

    </span>

  )

}