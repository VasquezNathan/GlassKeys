var balanceOfDoa
// function sets/formats innerText of element with ticker id 
// declared as a function so it can be called after web3 promise.
var SetDoaBalance = function(balance) {
    var tickerText = balance;
    document.getElementById("ticker_ETH").innerText = tickerText;
}

// attempt to do web3 stuff.
try{
    // retrieve web3 from the a provider.
    // if there is no injected web3 from the browser (MetaMask or similar) then try infura remote node 
    var web3 = new Web3(Web3.givenProvider || window.ethereum || "https://mainnet.infura.io/v3/8c8df2a012ff47e99a72135c14177be2");
    web3.eth.getBalance("0xA1c93A449bD671818353F870Fbc86c6E9F1809FB").then(function(result){
        balanceOfDoa = (web3.utils.fromWei(result)).substr(0, 4);
        SetDoaBalance(balanceOfDoa);
    });
}
catch(error){
    console.error(error);
    document.getElementById("ticker").innerText = "There was an error retrieving information from Ethereum network.";
}