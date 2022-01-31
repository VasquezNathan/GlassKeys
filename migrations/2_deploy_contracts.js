var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GlassKey = artifacts.require("./GlassKey.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(GlassKey, "https://TPF.com/glasskeys/");
};
