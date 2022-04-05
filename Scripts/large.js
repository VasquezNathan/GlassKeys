const ethereumButton = document.querySelector('.ethButton');
let accounts = [];

var sendMoney = function() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(function(result) {
            accounts = result;
            ethereum.request({ method: 'eth_sendTransaction',
                params: [
                    {
                    from: accounts[0],
                    // just some dao's address
                    to: '0xA1c93A449bD671818353F870Fbc86c6E9F1809FB',
                    // value: '0x3782DACE9D90000', // 0.25 ETH
                    value: '0xDE0B6B3A7640000', //1 ETH
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        });
    }
    else{
        alert("Please use a browser with MetaMask installed!");
    }
    
}

ethereumButton.addEventListener('click', () => {
    sendMoney();
});