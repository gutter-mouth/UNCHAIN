// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstWords = ["BTC", "ETH", "USDT"];
    string[] secondWords = ["BNB", "USDC", "XRP"];
    string[] thirdWords = ["SOL", "ADA", "LUNA"];


    constructor() ERC721 ("SqureNFT", "SQUARE") {
        console.log("This is my NFT contract.");
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
        console.log("rand seed: ", rand);
        rand = rand % firstWords.length;
        console.log("rand first word: ", rand);
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
        console.log("rand seed: ", rand);
        rand = rand % secondWords.length;
        console.log("rand second word: ", rand);
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId))));
        console.log("rand seed: ", rand);
        rand = rand % thirdWords.length;
        console.log("rand third word: ", rand);
        return thirdWords[rand];
    }

    
    
    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory combinedWord = string(abi.encodePacked(first, " ", second, " ",third));

        string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

        console.log("\n---------------");
        console.log(finalSvg);
        console.log("---------------\n");

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', combinedWord, '","description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(finalSvg)), '"}'  
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n----- Token URI ----");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        _tokenIds.increment();
    }
}
