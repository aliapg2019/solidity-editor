// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 

contract myNFT is ERC721 {


    uint256 rate = 0.01 ether;
    uint256 supply = 10000;

    uint256 minted = 0;

    constructor() ERC721("HERO_NFT", "HERO") {
 
        _mint(msg.sender, 1);
    }

    
    function mint() public payable {
        require(minted+1<=supply,"Exceeded maximum NFT supply");
        require(msg.value >= rate,"Not Enough Ether");
        _mint(msg.sender, 1);
        minted += 1 ;
    }

   

    receive() external payable {}

 
    
}