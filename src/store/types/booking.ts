import type { StatusMini, Base } from './base';

interface FirstName extends Base { status: StatusMini }
interface LastName extends Base { status: StatusMini }
interface Phone {
  phoneNumber: string,
  phoneCode: string,
  phoneCountry: string,
}

export interface BookingState {
  firstName: FirstName,
  lastName: LastName,
  phone: Phone,
}

export interface BookingActions {
  setFirstName: (newState: FirstName) => void,
  setLastName: (newState: LastName) => void,
  setPhone: (newState: Phone) => void
}
