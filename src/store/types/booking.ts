import type { StatusMini, Base, Dropdown } from './base';

interface FirstName extends Base { status: StatusMini }
interface LastName extends Base { status: StatusMini }

interface Room extends Dropdown { isRecurring: true }
interface Sim extends Dropdown { isRecurring: false }
interface Insurance extends Dropdown { isRecurring: true }
interface Phone {
  phoneNumber: string,
  phoneCode: string,
  phoneCountry: string,
  status: StatusMini,
}

export interface BookingState {
  firstName: FirstName,
  lastName: LastName,
  phone: Phone,
  room: Room,
  sim: Sim,
  insurance: Insurance,
}

export interface BookingActions {
  setFirstName: (newState: FirstName) => void,
  setLastName: (newState: LastName) => void,
  setPhone: (newState: Phone) => void,
  setRoom: (newState: Room) => void,
  setSim: (newState: Sim) => void,
  setInsurance: (newState: Insurance) => void,
}
