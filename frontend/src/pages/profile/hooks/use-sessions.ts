import http from "@/configs/http"
import type { Session } from "@/types/interfaces"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])

  const fetchSessions = () => {
    return http.get("/v1/auth/my-sessions")
  }

  const deleteSession = (id: string) =>
    http
      .delete(`/v1/auth/session/${id}`)
      .then((res) => {
        toast.success(res.data.message)
        setSessions((sessions) => sessions.filter((s) => s.id != id))
      })
      .catch(() => toast.error("Ha ocurrido un error"))

  useEffect(() => {
    fetchSessions().then((res) => setSessions(res.data))
  }, [])

  return { sessions, deleteSession }
}
