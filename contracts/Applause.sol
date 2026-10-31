// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Applause
 * @dev Decentralized appreciation board where users recognize developers, creators, and friends on-chain.
 * Tagline: Give good work its recognition.
 */
contract Applause {
    enum Category {
        GreatDesign,   // 0
        Helpful,       // 1
        Creative,      // 2
        ExcellentWork, // 3
        Inspiration    // 4
    }

    struct Appreciation {
        uint256 id;
        address sender;
        address recipient;
        uint8 category;
        string message;
        uint256 timestamp;
    }

    // All recorded appreciations
    Appreciation[] private _appreciations;

    // Track appreciation IDs by recipient and sender for efficient querying
    mapping(address => uint256[]) private _receivedAppreciationIds;
    mapping(address => uint256[]) private _sentAppreciationIds;

    // Maximum allowed message length in bytes/characters
    uint256 public constant MAX_MESSAGE_LENGTH = 120;

    event AppreciationSent(
        uint256 indexed id,
        address indexed sender,
        address indexed recipient,
        uint8 category,
        string message,
        uint256 timestamp
    );

    /**
     * @notice Publish an on-chain appreciation
     * @param recipient Target wallet address receiving the appreciation
     * @param category Appreciation category (0 to 4)
     * @param message Short appreciation message (max 120 characters)
     */
    function sendAppreciation(
        address recipient,
        uint8 category,
        string calldata message
    ) external {
        require(recipient != address(0), "Recipient cannot be zero address");
        require(recipient != msg.sender, "Cannot appreciate yourself");
        require(category <= uint8(Category.Inspiration), "Invalid category");
        require(bytes(message).length <= MAX_MESSAGE_LENGTH, "Message exceeds 120 characters");

        uint256 newId = _appreciations.length;
        uint256 currentTime = block.timestamp;

        Appreciation memory newAppreciation = Appreciation({
            id: newId,
            sender: msg.sender,
            recipient: recipient,
            category: category,
            message: message,
            timestamp: currentTime
        });

        _appreciations.push(newAppreciation);
        _receivedAppreciationIds[recipient].push(newId);
        _sentAppreciationIds[msg.sender].push(newId);

        emit AppreciationSent(
            newId,
            msg.sender,
            recipient,
            category,
            message,
            currentTime
        );
    }

    /**
     * @notice Retrieve all appreciation records
     * @return Array of all appreciations
     */
    function getAllAppreciations() external view returns (Appreciation[] memory) {
        return _appreciations;
    }

    /**
     * @notice Retrieve all appreciations received by a specific wallet
     * @param recipient The wallet address to query
     * @return Array of appreciations received by the wallet
     */
    function getReceivedAppreciations(address recipient) external view returns (Appreciation[] memory) {
        uint256[] storage ids = _receivedAppreciationIds[recipient];
        uint256 count = ids.length;
        Appreciation[] memory results = new Appreciation[](count);

        for (uint256 i = 0; i < count; i++) {
            results[i] = _appreciations[ids[i]];
        }

        return results;
    }

    /**
     * @notice Retrieve all appreciations sent by a specific wallet
     * @param sender The wallet address to query
     * @return Array of appreciations sent by the wallet
     */
    function getSentAppreciations(address sender) external view returns (Appreciation[] memory) {
        uint256[] storage ids = _sentAppreciationIds[sender];
        uint256 count = ids.length;
        Appreciation[] memory results = new Appreciation[](count);

        for (uint256 i = 0; i < count; i++) {
            results[i] = _appreciations[ids[i]];
        }

        return results;
    }

    /**
     * @notice Return the number of appreciations received by a wallet
     * @param recipient The wallet address to query
     * @return Count of received appreciations
     */
    function getReceivedCount(address recipient) external view returns (uint256) {
        return _receivedAppreciationIds[recipient].length;
    }

    /**
     * @notice Total number of appreciations published on the platform
     * @return Total count of appreciations
     */
    function getTotalCount() external view returns (uint256) {
        return _appreciations.length;
    }
}

