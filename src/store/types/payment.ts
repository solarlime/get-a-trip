import type { Status, StatusMini, Base } from './base';

export const providers = ['visa', 'mastercard', 'amex', 'jcb'] as const;
type Providers = typeof providers[number];

interface CardholderName extends Base { status: StatusMini }
interface Email extends Base { status: Status }
interface CardCvc extends Base { status: Status }
interface CardDate extends Base { status: Status }
interface CardNumber extends Base {
  status: Status,
  provider: Providers | null,
  focused: Boolean,
}

export interface Country {
  name: string,
  code: string,
  phoneCode: string
}

export interface PaymentState {
  countries: Array<Country>,
  email: Email,
  cardholderName: { value: string, status: StatusMini },
  cardNumber: CardNumber,
  cardCvc: { value: string, status: Status },
  cardDate: { value: string, status: Status },
}

export interface PaymentActions {
  getCountries: () => Promise<void>,
  setEmailState: (newState: Email) => void,
  setCardholderNameState: (newState: CardholderName) => void,
  setCardNumberState: (newState: CardNumber) => void,
  setCardCvcState: (newState: CardCvc) => void,
  setCardDateState: (newState: CardDate) => void,
  reset: () => void,
}
