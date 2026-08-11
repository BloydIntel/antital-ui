import { ActivityLogs } from "@/app/(dashboard)/activity-logs/components/activity-logs"
import { AdminOnly } from "@/components/auth/require-user-type"

export default function ActivityLogsPage() {
  return (
    <AdminOnly>
      <ActivityLogs />
    </AdminOnly>
  )
}
