import Web3 from "https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.1/web3.min.js";

// "Web3.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  web3.ethereum.request({ method: 'eth_requestAccounts' });
});
