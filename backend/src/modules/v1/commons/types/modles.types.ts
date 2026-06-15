export enum RoleType {
  CONSULTOR = 'CONSULTOR',
  ADMINISTRADOR = 'ADMINISTRADOR',
  OPERADOR = 'OPERADOR',
}

export enum ClientDenomination {
  MIPYME = 'MIPYME',
  CNA = 'CNA',
  EMPRESA_ESTATAL = 'EMPRESA_ESTATAL',
  EMPRESA_100_EXTRANJERA = 'EMPRESA_100_EXTRANJERA',
  EMPRESA_100_CUBANA = 'EMPRESA_100_CUBANA',
  EMPRESA_MIXTA = 'EMPRESA_MIXTA',
  CCS = 'CCS',
  UBPC = 'UBPC',
  OTRAS_FORMAS = 'OTRAS_FORMAS',
}

export enum ContractType {
  DIESEL = 'DIESEL',
  GASOLINA = 'GASOLINA',
  OTROS = 'OTROS',
}

export enum ContractContainer {
  ISO_CONTENEDOR = 'ISO_CONTENEDOR',
  ISO_MODULO = 'ISO_MODULO',
  BUQUE = 'BUQUE',
}

export enum ClientCategory {
  Cliente = 'Cliente',
  Proveedor = 'Proveedor',
}

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
  role: RoleType;
  createdAt: Date;
  Sessions?: Session[];
};

export type Session = {
  id: string;
  userId: string;
  createdAt: Date;
  User?: User;
};

export type Contract = {
  id: string;
  clientName: string;
  clientDenomination: ClientDenomination;
  clientCategory: ClientCategory;
  agreementNumber: string;
  agreementDate: Date;
  nationalityCompany: string;

  contractTypeId: string;
  contractType: ContractType | null;
  contractContainer: ContractContainer | null;
  contractNumber: string;
  contractDate: Date;
  contractValidity: Date;

  observations: string | null;

  ContractDetails?: ContractDetails;
  Supplements?: Supplement[];
};

export type ContractDetails = {
  id: string;
  name: string;
  haveType: boolean;
  haveContainer: boolean;
  Contract?: Contract[];
};

export type Supplement = {
  id: string;
  supplementNumber: string;
  supplementDate: Date;
  supplementObject: string;
  supplementValidity: Date;
  contractId: string;

  Contract?: Contract;
};
