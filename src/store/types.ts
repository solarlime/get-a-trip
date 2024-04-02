type StatusMini = 'idle' | 'success';
type Status = StatusMini | 'fail';

export const providers = ['visa', 'mastercard', 'amex', 'jcb'] as const;
type Providers = typeof providers[number];

interface Base { value: string }
interface CardholderName extends Base { status: StatusMini }
interface Email extends Base { status: Status }
interface CardCvc extends Base { status: Status }
interface CardDate extends Base { status: Status }
interface CardNumber extends Base {
  status: Status,
  provider: Providers | null,
  focused: Boolean,
}

export interface PaymentState {
  countries: Array<string>,
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

export interface TourState {
  image: { [key: string]: Base },
}

export interface TourActions {
  getImage: (id: string) => Promise<void>,
}
