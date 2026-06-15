import http from "@/configs/http"
import { type Contract } from "@/types/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

const filterSchema = z.object({
  contractNumber: z.string(),
  search: z.string(),
  page: z.number().default(1),
})

export type FilterSchemaData = z.infer<typeof filterSchema>

export default function useList() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const { formState, register, getValues, watch } = useForm({
    resolver: zodResolver(filterSchema),
    mode: "all",
  })

  const filterProducts = useCallback(async () => {
    const objects = Object.entries(getValues()).map((arr) => [
      arr[0],
      arr[1].toString(),
    ])
    const params = new URLSearchParams(objects)
    const response = await http.get("/v1/contracts", { params: params })
    setTotalItems(response.data.totalItems)
    setTotalPages(response.data.totalPages)
    setContracts(response.data.results)
  }, [getValues])

  const searchWatched = watch("search")
  const contractWatched = watch("contractNumber")

  useEffect(() => {
    const timeout = setTimeout(filterProducts, 250)
    return () => clearTimeout(timeout)
  }, [searchWatched, contractWatched, filterProducts])

  return { contracts, totalItems, totalPages, formState, register }
}
