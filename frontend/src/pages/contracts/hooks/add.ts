import {
  ClientCategory,
  ClientDenomination,
  ContractContainer,
  type ContractDetails,
  ContractType,
} from "@/types/interfaces"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import http from "@/configs/http"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const supplementSchema = z.object({
  supplementNumber: z.string().min(1, "El número de suplemento es requerido"),
  supplementDate: z.date("La fecha de suplemento es requerida"),
  supplementObject: z.string().min(1, "El objeto de suplemento es requerido"),
  supplementValidity: z.date("La validez de suplemento es requerida"),
})

const contractSchema = z.object({
  clientName: z.string().min(1, "El nombre del cliente es requerido"),
  clientDenomination: z.enum(
    ClientDenomination,
    "Por favor seleccione una denominación de cliente"
  ),
  clientCategory: z.enum(
    ClientCategory,
    "Por favor seleccione una categoría de cliente"
  ),
  nationalityCompany: z
    .string()
    .min(1, "La nacionalidad de la compañía es requerida"),

  agreementNumber: z.string().min(1, "El número de contrato es requerido"),
  agreementDate: z.date("La fecha de contrato es requerida"),

  contractTypeId: z.string("Por favor seleccione un tipo de contrato").uuid(),
  contractType: z
    .enum(ContractType, "Por favor seleccione un tipo de contrato")
    .optional(),
  contractContainer: z
    .enum(ContractContainer, "Por favor seleccione un contenedor de contrato")
    .optional(),
  contractNumber: z.string().min(1, "El número de contrato es requerido"),
  contractDate: z.date(),
  contractValidity: z.date(),

  observations: z.string().optional(),
  supplements: z.array(supplementSchema),
})

export type AddContractFormData = z.infer<typeof contractSchema>
export type SupplementData = z.infer<typeof supplementSchema>

export default function useAddContract() {
  const [contractContainer, setContractContainer] =
    useState<ContractContainer>()
  const [contractDetails, setContractDetails] = useState<ContractDetails[]>([])
  const [contractTypes, setContractTypes] = useState<ContractType>()

  const {
    formState,
    watch,
    setValue,
    register,
    getValues,
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(contractSchema),
    mode: "all",
    defaultValues: {
      clientCategory: undefined,
      clientDenomination: undefined,
      contractType: undefined,
      contractContainer: undefined,
      agreementDate: new Date(),
      contractDate: new Date(),
      contractValidity: new Date(),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplements",
  })

  const getContractTypes = async () => {
    const response = await http.get("/v1/contracts/contract-types")
    return response.data
  }

  const resetForm = () => {
    reset()
    setValue("supplements", [])
  }

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const response = await http.post("/v1/contracts/create", data)
        toast.success(response.data)
        setTimeout(() => {
          resetForm()
        }, 0)
      } catch {
        toast.error("No se puedo agregar el contrato")
      }
    },
    async (error) => {
      console.log(error)
    }
  )

  useEffect(() => {
    getContractTypes().then((data) => {
      setContractDetails(data.contractsDetails)
      setContractTypes(data.contractTypes)
      setContractContainer(data.contractContainers)
    })
  }, [])

  return {
    contractTypes,
    contractDetails,
    contractContainer,
    formState,
    register,
    watch,
    setValue,
    getValues,
    fields,
    remove,
    append,
    onSubmit,
    control,
  }
}
