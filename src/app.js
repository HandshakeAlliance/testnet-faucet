//Default imports
const initServer = require("./server.js");

//Non-default imports
const { initWallet } = require("./util/wallet.js");

const startup = async () => {
  //Initialize our clients to the nodes and wallet.
  await initWallet();

  //Initializes the http server to handle incoming requests.
  initServer();
};

//Run the app
startup();
