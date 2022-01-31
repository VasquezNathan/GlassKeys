const TruffleAssert = require("truffle-assertions");
const GlassKey = artifacts.require("./GlassKey.sol");

contract("SimpleStorage", accounts => {
    it("allows a person to buy an NFT", async () => {
        let buyer = accounts[8];
        var glasskey = await GlassKey.deployed();

        await glasskey.purchase(1, {
            from: buyer, 
            value: web3.utils.toWei("0.05", "ether")
        });

        var owner = await glasskey.ownerOf(1);
        assert.equal(owner, buyer);
        
        var token_uri = await glasskey.tokenURI(1);
        assert.equal(token_uri, "https://TPF.com/glasskeys/1");


    
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
        
        TruffleAssert.reverts(glasskey.setBaseURI("https://attack-uri.com"));
    });

});