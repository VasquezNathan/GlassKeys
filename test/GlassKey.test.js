const truffleAssert = require('truffle-assertions');
const GlassKey = artifacts.require("./GlassKey.sol");

contract("GlassKey", accounts => {
    it("allows a person to buy an NFT", async () => {
        var contract_owner = accounts[0]
        let buyer = accounts[8];
        var glasskey = await GlassKey.deployed();

        // eth blance of contract deployer before selling
        var owner_starting_balance = await web3.eth.getBalance(contract_owner);
        owner_starting_balance =  parseFloat(web3.utils.fromWei(owner_starting_balance, 'ether'));

        // do the actual purchase
        await glasskey.purchase(6, {
            from: buyer, 
            value: web3.utils.toWei("0.30", "ether")
        });

        // eth balance of contract deployer after selling
        var owner_ending_balance = await web3.eth.getBalance(contract_owner);
        owner_ending_balance = parseFloat(web3.utils.fromWei(owner_ending_balance, 'ether')); 

        // ensure the balance increases
        assert.isAbove(owner_ending_balance, owner_starting_balance);

        // display the before and after balance
        console.log("Starting balance: ", owner_starting_balance);
        console.log("Ending balance: ", owner_ending_balance);

        // ensure that the buyer is now the owner of the token (buyer buys first token so he owns token with id 1)
        var owner = await glasskey.ownerOf(1);
        assert.equal(owner, buyer);
        
        // ensure the token URI is getting set properly
        var token_uri = await glasskey.tokenURI(1);
        assert.equal(token_uri, "https://TPF.com/glasskeys/1");

        // get the token balance and make sure that 4 tokens were bought
        var token_balance = parseInt(await glasskey.balanceOf(buyer));
        assert.equal(token_balance, 6);
    
    });

    it("allows a person to change the base URI", async () => {
        let buyer = accounts[8];
        var glasskey = await GlassKey.deployed();

        await glasskey.purchase(1, {
            from: buyer, 
            value: web3.utils.toWei("0.05", "ether")
        });

        var owner = await glasskey.ownerOf(1);
        assert.equal(owner, buyer);
        
        await glasskey.setBaseURI("https://new-TPF.com/glasskeys/");
        var token_uri = await glasskey.tokenURI(1);
        assert.equal(token_uri, "https://new-TPF.com/glasskeys/1");
    });

    it("does not allow someone who is not the owner to change the URI", async () => {
        var glasskey = await GlassKey.deployed();
        
        // makes sure it fails if the sender is not the owner of the contract
        await truffleAssert.reverts(glasskey.setBaseURI("https://attack-uri.com",{
            from: accounts[1]
        }));
    });

});