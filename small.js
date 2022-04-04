const ethereumButton = document.querySelector('.ethButton');
let accounts = [];

var sendMoney = function() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(function(result) {
            console.log(result);
        });
       
    }
    alert("Please use a browser with MetaMask installed!");
    
}

ethereumButton.addEventListener('click', () => {
    sendMoney();
});