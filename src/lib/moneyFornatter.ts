// input = 150000
// return "Rp150.000"
const moneyFornatter = (input: number): string => {
  return 'Rp' + input.toLocaleString('id-ID');
};

export default moneyFornatter;
