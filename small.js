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
                    to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
                    value: '0x3782DACE9D90000',
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