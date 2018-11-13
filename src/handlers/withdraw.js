const { getWallet } = require("../util/wallet.js");
const { convertToHNS } = require("../util/util.js");

async function withdrawHandler(request, h) {
  let wallet = getWallet();

  //Need address validation here.
  //use hsd address.isValid()
  let address = request.payload.address;
  //Expect this to be in subunit
  let amount = request.payload.amount;
  let tx;

  const options = {
    outputs: [{ value: amount, address: address }]
  };

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
