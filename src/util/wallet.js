const config = require("config");
const { WalletClient } = require("hs-client");
const { Network } = require("hsd");
const network = Network.get(config.get("node-network"));

const walletOptions = {
  network: network.type,
  host: config.get("wallet-host"),
  port: network.walletPort,
  apiKey: config.get("node-api-key")
};

let _walletClient = new WalletClient(walletOptions);
let _wallet;
let _address;

async function initWallet() {
  _walletClient = new WalletClient(walletOptions);
  _wallet = await _walletClient.wallet(config.get("wallet-id"));
  await _walletClient.open();
  await _wallet.open();
  //So this can be up for discussion, but I'm not sure if we want to do a new address
  //everytime someone visits the page. This will give us the first address, and then never generate a new one
  //While this is sometimes frowned upon, I think in this instance it's totally okay
  //And gives people confidence that it's the same address as always. - Sean
  _address = _wallet.createAddress("default");
}

function getWallet() {
  return _wallet;
}

function getWalletClient() {
  return _walletClient;
}

function getDepositAddress() {
  return _address;
}

module.exports = {
  getWallet: getWallet,
  getWalletClient: getWalletClient,
  initWallet: initWallet,
  network: network,
  getDepositAddress: getDepositAddress
};
