const BigNumber = require("bignumber.js");

function calculateWithdraw(balance) {
  if (balance === 0) {
    return 0;
  }

  // Hardcode this number into config or somewhere so it's not magic.
  if (balance < 1000) {
    return 0;
  }

  return balance.dividedBy(1000);
}

//hasZeros tells us whether or not to multiple by the exponent
function convertToHNS(value, hasZeros = true) {
  //XXX Check these config values, and possibly pull them out somewhere.
  BigNumber.config({ DECIMAL_PLACES: 6, ROUND_MODE: BigNumber.ROUND_DOWN });

  temp = new BigNumber(value);
  let valueBN;

  if (hasZeros) {
    valueBN = temp.dividedBy(1000000);
  } else {
    valueBN = temp.multipliedBy(1000000);
  }

  return valueBN;
}

module.exports = {
  calculateWithdraw: calculateWithdraw,
  convertToHNS: convertToHNS
};
