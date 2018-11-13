const { getWallet, getDepositAddress } = require("../util/wallet.js");
const { calculateWithdraw, convertToHNS } = require("../util/util.js");

async function homeHandler(request, h) {
  const wallet = getWallet();

  //Get balance, and conver to HNS units (BigNumber)
  let balanceData = await wallet.getBalance();
  let balance = convertToHNS(balanceData.confirmed);

  //Calculate available to withdraw
  let available = calculateWithdraw(balance);

  //Grab our receiving address for the faucet.
  let addressData = await getDepositAddress();
  let address = addressData.address;

  //Round to .01 precision.
  let balanceRounded = balance.toFixed(2);
  let availableRounded = available.toFixed(2);

  return h.view("home.pug", {
    balance: balanceRounded,
    available: availableRounded,
    address
  });
}

module.exports = homeHandler;
