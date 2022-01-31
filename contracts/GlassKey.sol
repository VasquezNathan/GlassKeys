// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GlassKey is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private _customBaseURI;

    constructor(string memory customBaseURI_) ERC721("GlassKey", "KEY") {
        _customBaseURI = customBaseURI_;
    }

    function setBaseURI(string memory newBaseURI_) public {
        _customBaseURI = newBaseURI_;
    }

    function purchase(uint256 quantity) public payable returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        return newItemId;
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return _customBaseURI;
    }
}