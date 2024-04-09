export type StatusMini = 'idle' | 'success';
export type Status = StatusMini | 'fail';

export interface Base { value: string }

interface Option { value: string, price?: number }

export interface Dropdown {
  option: Option, status: StatusMini, readonly options: Array<Option>,
}
