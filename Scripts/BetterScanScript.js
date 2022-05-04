const SearchButton = document.querySelector('.button');
let accounts = [];

var queryChain = function(_address) {
    console.log(address);
    try {
        var web3 = new Web3(Web3.givenProvider || window.ethereum || "https://mainnet.infura.io/v3/8c8df2a012ff47e99a72135c14177be2");
        web3.eth.getPastLogs({address: "0xA1c93A449bD671818353F870Fbc86c6E9F1809FB"})
            .then(console.log);
    }
    catch(error) {
        console.error(error);
    }
}

SearchButton.addEventListener('click', () => {
    address = document.querySelector('.input').innerText;
    queryChain(address);
});