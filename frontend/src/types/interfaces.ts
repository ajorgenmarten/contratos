export enum RoleType {
  CONSULTOR = "CONSULTOR",
  ADMINISTRADOR = "ADMINISTRADOR",
  OPERADOR = "OPERADOR",
}

export enum ClientCategory {
  Cliente = "Cliente",
  Proveedor = "Proveedor",
}

export enum ClientDenomination {
  MIPYME = "MIPYME",
  CNA = "CNA",
  EMPRESA_ESTATAL = "EMPRESA_ESTATAL",
  EMPRESA_100_EXTRANJERA = "EMPRESA_100_EXTRANJERA",
  EMPRESA_100_CUBANA = "EMPRESA_100_CUBANA",
  EMPRESA_MIXTA = "EMPRESA_MIXTA",
  CCS = "CCS",
  UBPC = "UBPC",
  OTRAS_FORMAS = "OTRAS_FORMAS",
}

export enum ContractType {
  DIESEL = "DIESEL",
  GASOLINA = "GASOLINA",
  OTROS = "OTROS",
}

export enum ContractContainer {
  ISO_CONTENEDOR = "ISO_CONTENEDOR",
  ISO_MODULO = "ISO_MODULO",
  BUQUE = "BUQUE",
}

export interface User {
  id: string
  name: string
  username: string
  role: RoleType
  active: boolean
  createdAt: Date
}

export interface Contract {
  id: string
  clientName: string
  clientCategory: ClientCategory
  clientDenomination: ClientDenomination
  nationalityCompany: string

  agreementNumber: string
  agreementDate: Date

  contractTypeId: string
  contractType: ContractType
  contractContainer: ContractContainer
  contractNumber: string
  contractDate: Date
  contractValidity: Date

  observations: string | null
  Supplements?: Supplement[]
  ContractDetails?: ContractDetails
}

export interface ContractDetails {
  id: string
  name: string
  haveType: boolean
  haveContainer: boolean
  Contract: Contract[]
}

export interface Supplement {
  id: string
  supplementNumber: string
  supplementDate: Date
  supplementValidity: Date
  contractId: string
  Contract: Contract
}
