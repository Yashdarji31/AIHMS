import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status.toLowerCase()) {
    case "scheduled":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          Scheduled
        </Badge>
      );

    case "completed":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          Completed
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Pending
        </Badge>
      );

    case "cancelled":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          {status}
        </Badge>
      );
  }
}