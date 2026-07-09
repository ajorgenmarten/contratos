import http from "@/configs/http"
import { type Contract } from "@/types/interfaces"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export default function useContractsDetails() {
  const [contract, setContract] = useState<Contract | null>(null)
  const params = useParams()
  const navigate = useNavigate()

  const fetchData = () => http.get("/v1/contracts/" + params.id)

  useEffect(() => {
    fetchData()
      .then((res) => {
        setContract(res.data)
      })
      .catch(() => navigate("/"))
  }, [])

  return { contract }
}
