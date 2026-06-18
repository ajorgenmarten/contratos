import {
  User as UserType,
  ClientDenomination,
  ContractContainer,
  ContractType,
  RoleType,
  ClientCategory,
} from './modles.types';
import { hashSync, compareSync } from 'bcrypt';
import { User as UserPrisma } from 'generated/prisma/client';

export class User implements UserType {
  constructor(
    private readonly _id: string,
    private _name: string,
    private readonly _username: string,
    private _password: string,
    private _role: RoleType,
    private _active: boolean,
    private readonly _createdAt: Date,
    private _Sessions?: Session[],
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get role(): RoleType {
    return this._role;
  }

  get active(): boolean {
    return this._active;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get Sessions(): Session[] | undefined {
    return this._Sessions;
  }

  comparePassword(password: string) {
    return compareSync(password, this._password);
  }

  static new(
    name: string,
    username: string,
    password: string,
    role: RoleType,
    active: boolean = true,
  ) {
    const hashedPassword = hashSync(password, 12);
    return new User(
      crypto.randomUUID(),
      name,
      username,
      hashedPassword,
      role,
      active,
      new Date(),
    );
  }
  toObject() {
    return {
      id: this._id,
      name: this._name,
      username: this._username,
      active: this._active,
      role: this._role,
      createdAt: this._createdAt,
    } as Omit<UserType, 'password'>;
  }

  static fromPrisma(user: UserPrisma) {
    return new User(
      user.id,
      user.name,
      user.username,
      user.password,
      user.role as RoleType,
      user.active,
      user.createdAt,
    );
  }
}

export class Session {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _createdAt: Date,
    private readonly _User?: User,
  ) {}

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get User(): User | undefined {
    return this._User;
  }

  static new(user: User | string) {
    return new Session(
      crypto.randomUUID(),
      typeof user == 'string' ? user : user.id,
      new Date(),
    );
  }
}

export class Contract {
  constructor(
    private readonly _id: string,
    private _clientName: string,
    private _clientDenomination: ClientDenomination,
    private _clientCategory: ClientCategory,
    private _agreementNumber: string,
    private _agreementDate: Date,
    private _nationalityCompany: string,

    private _contractTypeId: string,
    private _contractType: ContractType | null,
    private _contractContainer: ContractContainer | null,
    private _contractNumber: string,
    private _contractDate: Date,
    private _contractValidity: Date,

    private _observations: string | null,

    private _ContractDetails?: ContractDetails,
    private _Supplements?: Supplement[],
  ) {}

  get id(): string {
    return this._id;
  }

  get clientName(): string {
    return this._clientName;
  }

  get clientDenomination(): ClientDenomination {
    return this._clientDenomination;
  }

  get clientCategory(): ClientCategory {
    return this._clientCategory;
  }

  get agreementNumber(): string {
    return this._agreementNumber;
  }

  get agreementDate(): Date {
    return this._agreementDate;
  }

  get nationalityCompany(): string {
    return this._nationalityCompany;
  }

  get contractTypeId(): string {
    return this._contractTypeId;
  }

  get contractType(): ContractType | null {
    return this._contractType;
  }

  get contractContainer(): ContractContainer | null {
    return this._contractContainer;
  }

  get contractNumber(): string {
    return this._contractNumber;
  }

  get contractDate(): Date {
    return this._contractDate;
  }

  get contractValidity(): Date {
    return this._contractValidity;
  }

  get observations(): string | null {
    return this._observations;
  }

  get ContractDetails(): ContractDetails | undefined {
    return this._ContractDetails;
  }

  get Supplements(): Supplement[] | undefined {
    return this._Supplements;
  }

  addSupplement(
    supplement: Omit<Supplement, 'id' | 'contractId' | 'Contract'>,
  ) {
    if (!this._Supplements) this._Supplements = [];
    this._Supplements.push(
      Supplement.new(
        this._id,
        supplement.supplementNumber,
        supplement.supplementObject,
        supplement.supplementValidity,
        supplement.supplementDate,
      ),
    );
  }

  addManySupplements(
    supplements: Omit<Supplement, 'id' | 'contractId' | 'Contract'>[],
  ) {
    supplements.forEach((data) => this.addSupplement(data));
  }

  static new(
    clientName: string,
    clientDenomination: ClientDenomination,
    clientCategory: ClientCategory,
    agreementNumber: string,
    agreementDate: Date,
    nationalityCompany: string,
    contractTypeId: string,
    contractType: ContractType | null,
    contractContainer: ContractContainer | null,
    contractNumber: string,
    contractDate: Date,
    contractValidity: Date,
    observations: string | null,
  ) {
    return new Contract(
      crypto.randomUUID(),
      clientName,
      clientDenomination,
      clientCategory,
      agreementNumber,
      agreementDate,
      nationalityCompany,
      contractTypeId,
      contractType,
      contractContainer,
      contractNumber,
      contractDate,
      contractValidity,
      observations,
    );
  }
}

export class ContractDetails {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _haveType: boolean,
    private readonly _haveContainer: boolean,
    private readonly _Contract?: Contract[],
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get haveType(): boolean {
    return this._haveType;
  }

  get haveContainer(): boolean {
    return this._haveContainer;
  }

  get Contract(): Contract[] | undefined {
    return this._Contract;
  }
}

export class Supplement {
  constructor(
    private readonly _id: string,
    private readonly _supplementNumber: string,
    private readonly _supplementDate: Date,
    private readonly _supplementObject: string,
    private readonly _supplementValidity: Date,
    private readonly _contractId: string,

    private readonly _Contract?: Contract,
  ) {}

  get id(): string {
    return this._id;
  }

  get supplementNumber(): string {
    return this._supplementNumber;
  }

  get supplementDate(): Date {
    return this._supplementDate;
  }

  get supplementObject(): string {
    return this._supplementObject;
  }

  get supplementValidity(): Date {
    return this._supplementValidity;
  }

  get contractId(): string {
    return this._contractId;
  }

  get Contract(): Contract | undefined {
    return this._Contract;
  }

  static new(
    contract: Contract | string,
    number: string,
    object: string,
    validity: Date,
    date: Date,
  ) {
    return new Supplement(
      crypto.randomUUID(),
      number,
      date,
      object,
      validity,
      typeof contract === 'string' ? contract : contract.id,
    );
  }
}
