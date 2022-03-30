var balanceOfDoa
        // function sets/formats innerText of element with ticker id 
        // declared as a function so it can be called after web3 promise.
        var SetDoaBalance = function(balance) {
            var tickerText = "DOA Balance: " + balance + " ETH";
            document.getElementById("ticker").innerText = tickerText;
        }
        
        // attempt to do web3 stuff.
        try{
            // retrieve web3 from the a provider.
            // if there is no injected web3 from the browser (MetaMask or similar) then try infura remote node 
            var web3 = new Web3(Web3.givenProvider || window.ethereum || "https://mainnet.infura.io/v3/8c8df2a012ff47e99a72135c14177be2");
            web3.eth.getBalance("0x9c555c1dE936feDDe75a57c3f07ffeb984FC3EBd").then(function(result){
                balanceOfDoa = web3.utils.fromWei(result);
                SetDoaBalance(balanceOfDoa);
            });
        }
        catch(error){
            console.error(error);
            document.getElementById("ticker").innerText = "If you are seeing this then MetaMask (or other hotwallet) is either not installed or is outdated.";
        }