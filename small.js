const ethereumButton = document.querySelector('.ethButton');

ethereumButton.addEventListener('click', () => {
    sendMoney();
});

var sendMoney = function() {
    try {
        var web3 = new Web3(Web3.givenProvider || window.ethereum || "https://mainnet.infura.io/v3/8c8df2a012ff47e99a72135c14177be2");
        console.log(window.ethereum);
        web3.eth.personal.getAccounts()
            .then(console.log)
    }
    catch(error){
        console.error(error);
    }
}
