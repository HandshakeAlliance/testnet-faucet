const { getWallet } = require("../util/wallet.js");
const { convertToHNS, calculateWithdraw } = require("../util/util.js");
const { Address } = require("hsd");

async function withdrawHandler(request, h) {
  const wallet = getWallet();

  //Get balance, and conver to HNS units (BigNumber)
  let balanceData = await wallet.getBalance();
  let balance = convertToHNS(balanceData.confirmed);

  //Calculate available to withdraw
  let available = calculateWithdraw(balance);

  available = convertToHNS(available, false);

  let address = new Address(request.payload.address);

  //Expect this to be in subunit
  let amount = request.payload.amount;

  let tx;

  //Check if the address is valid.
  if (!address.isValid()) {
    return h.response("This address is not valid").code(401);
  }

  if (amount > available || amount == 0) {
    return h
      .response("You cannot withdraw this much. Please try again.")
      .code(401);
  }

  const options = {
    outputs: [{ value: amount, address: address.toString("testnet") }]
  };

  //We need error checking.

  try {
    tx = await wallet.send(options);
  } catch (e) {
    console.log(e);
  }

  let data = {
    hash: tx.hash
  };

  return h.response(data).code(200);
}

module.exports = withdrawHandler;
