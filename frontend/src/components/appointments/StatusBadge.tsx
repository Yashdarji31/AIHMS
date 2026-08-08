import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {

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

    case "cancelled":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          Cancelled
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          Pending
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

