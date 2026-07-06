import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { TableCell, TableRow } from "@/components/ui/table"
import http from "@/configs/http"
import type { User } from "@/types/interfaces"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { toast } from "react-toastify"

export default function ListUserRow({ user }: ListUserRowProps) {
  const [userState, setUserState] = useState(user.active)

  const disableUser = async () => {
    http
      .post("/v1/users/disable-user", {
        userId: user.id,
        active: !userState,
      })
      .then((res) => {
        toast.success(res.data.message)
        setUserState(!userState)
      })
      .catch(() => toast.error("Ha ocurrido un error"))
  }

  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Switch onCheckedChange={disableUser} checked={userState} />
      </TableCell>
      <TableCell>{format(user.createdAt, "PPP")}</TableCell>
      <TableCell>
        <Button variant="ghost" asChild>
          <Link to={`/users/${user.id}`}>
            <Eye />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}

type ListUserRowProps = {
  user: User
}
