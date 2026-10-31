export const APPLAUSE_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" },
      { "indexed": false, "internalType": "uint8", "name": "category", "type": "uint8" },
      { "indexed": false, "internalType": "string", "name": "message", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "AppreciationSent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_MESSAGE_LENGTH",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllAppreciations",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "sender", "type": "address" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint8", "name": "category", "type": "uint8" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct Applause.Appreciation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "getReceivedAppreciations",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "sender", "type": "address" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint8", "name": "category", "type": "uint8" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct Applause.Appreciation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "getReceivedCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }],
    "name": "getSentAppreciations",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "sender", "type": "address" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint8", "name": "category", "type": "uint8" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct Applause.Appreciation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint8", "name": "category", "type": "uint8" },
      { "internalType": "string", "name": "message", "type": "string" }
    ],
    "name": "sendAppreciation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

