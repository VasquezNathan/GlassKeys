// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GlassKey is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _customBaseURI;
    uint256 private _price;
    uint256 private _maxSupply;

    constructor(string memory customBaseURI_) ERC721("GlassKey", "KEY") {
        _customBaseURI = customBaseURI_;
        _price = 0.05 ether;
        _maxSupply = 256;
    }

    function setBaseURI(string memory newBaseURI_) public onlyOwner {
        _customBaseURI = newBaseURI_;
    }

    function purchase(uint256 quantity) public payable {
        require(msg.value >= (_price* quantity), "Not enough ETH sent");
        require(balanceOf(msg.sender) <= 10, "Cannot mint more than 10");
        payable(owner()).transfer(msg.value);
        for (uint i = 0; i < quantity; i++) {
            mintForPurchase(msg.sender);
        }
    }

    function mintForPurchase(address buyer) private {
        require (_tokenIds.current() <= _maxSupply, "256 keys already created");
        _tokenIds.increment();
        
        uint256 newItemId = _tokenIds.current();
        _mint(buyer, newItemId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _customBaseURI;
    }
}