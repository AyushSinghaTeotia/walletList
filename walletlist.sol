// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletList {
    address public owner;
    mapping(address => bool) walletList;
    address[] allWallets;
    event  WalletAdded(address indexed wallet);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addWallet(address _wallet) public onlyOwner {
        require(!walletList[_wallet], "Wallet already listed");
        walletList[_wallet] = true;
        allWallets.push(_wallet);
        emit WalletAdded(_wallet);
    }

    function isWalletListed(address _wallet) public view returns (bool) {
        return walletList[_wallet];
    }
      function getAllWallets() public view returns (address[] memory) {
        return allWallets;
    }
}
