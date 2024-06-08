const validDate = `01 / ${(new Date().getFullYear() + 1).toString().slice(-2)}`;
const invalidDate1 = `01 / ${(new Date().getFullYear() - 1).toString().slice(-2)}`;
const invalidDate2 = '01 / 2';

export interface CardCase {
  number: string,
  isValidNumber: boolean,
  date: string,
  isValidDate: boolean,
  cvc: string,
  isValidCvc: boolean,
}

const cardCases: { [key: string]: CardCase } = {
  amex_all_ok: {
    number: '375520898980093', isValidNumber: true, date: validDate, isValidDate: true, cvc: '1024', isValidCvc: true,
  },
  mastercard_wrong_cvc: {
    number: '5491073231179294', isValidNumber: true, date: validDate, isValidDate: true, cvc: '64', isValidCvc: false,
  },
  visa_wrong_date: {
    number: '4088183012699253', isValidNumber: true, date: invalidDate1, isValidDate: false, cvc: '512', isValidCvc: true,
  },
  jcb_wrong_date: {
    number: '3529694058980430', isValidNumber: true, date: invalidDate2, isValidDate: false, cvc: '512', isValidCvc: true,
  },
  amex_wrong_cvc: {
    number: '375520898980093', isValidNumber: true, date: validDate, isValidDate: true, cvc: '512', isValidCvc: false,
  },
  mastercard_wrong_number: {
    number: '5491073231179293', isValidNumber: false, date: validDate, isValidDate: true, cvc: '512', isValidCvc: true,
  },
};

export default cardCases;
