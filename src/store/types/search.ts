import type {
  StatusMini, Base, Dropdown, Status,
} from './base';

interface Destination extends Dropdown {}
interface CheckInDate extends Base { status: Status }
interface Duration extends Base { status: StatusMini }
interface Companions extends Base { status: StatusMini }

export interface SearchState {
  destination: Destination,
  checkInDate: CheckInDate,
  duration: Duration,
  companions: Companions,
}

export interface SearchActions {
  setDestination: (newState: Destination) => void,
  setCheckInDate: (newState: CheckInDate) => void,
  setDuration: (newState: Duration) => void,
  setCompanions: (newState: Companions) => void,
}
