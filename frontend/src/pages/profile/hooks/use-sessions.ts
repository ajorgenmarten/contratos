import http from "@/configs/http"
import type { Session } from "@/types/interfaces"
import { useEffect, useState } from "react"

export default function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])

  const fetchSessions = () => {
    return http.get("/v1/auth/my-sessions")
  }

  useEffect(() => {
    fetchSessions().then((res) => setSessions(res.data))
  }, [])

  return { sessions }
}
