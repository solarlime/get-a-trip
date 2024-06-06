const validDate = `01 / ${(new Date().getFullYear() + 1).toString().slice(-2)}`;
const invalidDate1 = `01 / ${(new Date().getFullYear() - 1).toString().slice(-2)}`;
const invalidDate2 = '01 / 2';

const cardCases = [
  {
    type: 'Amex (all ok)', number: '375520898980093', isValidNumber: true, date: validDate, isValidDate: true,
  },
  {
    type: 'Mastercard (wrong cvc)', number: '5491073231179294', isValidNumber: true, date: validDate, isValidDate: true,
  },
  {
    type: 'Visa (wrong date)', number: '4088183012699253', isValidNumber: true, date: invalidDate1, isValidDate: false,
  },
  {
    type: 'JCB (wrong date)', number: '3529694058980430', isValidNumber: true, date: invalidDate2, isValidDate: false,
  },
  {
    type: 'Amex (wrong cvc)', number: '375520898980093', isValidNumber: true, date: validDate, isValidDate: true,
  },
  {
    type: 'Mastercard (wrong number)', number: '5491073231179293', isValidNumber: false, date: validDate, isValidDate: true,
  },
];

export default cardCases;
