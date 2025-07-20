/**
 * SimpleSwap DApp - Decentralized Exchange Interface
 * @author Ivan Sarapura
 * @description Frontend application for token swapping and liquidity provision
 */

// ===== 1. CONFIGURATION AND IMPORTS =====

/**
 * Contract addresses on the blockchain
 * @constant {Object}
 */
const CONTRACT_ADDRESSES = {
  SIMPLE_SWAP: "0x957d727337297b649AE8df9Cad0b157cf04C3224",
  TOKEN_A: "0xCDBDDA06C8b9dF27a8502e57C8614d4EfAc5ED76",
  TOKEN_B: "0x11d6A5B61eE830b97C88b4Fc26849274517DfF94",
};

/**
 * Simplified ABIs - only the functions we need for the DApp
 * @constant {Object}
 */
const CONTRACT_ABIS = {
  SIMPLE_SWAP: [
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "uint256", name: "amountADesired", type: "uint256" },
        { internalType: "uint256", name: "amountBDesired", type: "uint256" },
        { internalType: "uint256", name: "amountAMin", type: "uint256" },
        { internalType: "uint256", name: "amountBMin", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "addLiquidity",
      outputs: [
        { internalType: "uint256", name: "amountA", type: "uint256" },
        { internalType: "uint256", name: "amountB", type: "uint256" },
        { internalType: "uint256", name: "liquidity", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "reserveIn", type: "uint256" },
        { internalType: "uint256", name: "reserveOut", type: "uint256" },
      ],
      name: "getAmountOut",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
      ],
      name: "getReserves",
      outputs: [
        { internalType: "uint256", name: "reserveA", type: "uint256" },
        { internalType: "uint256", name: "reserveB", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapExactTokensForTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "uint256", name: "liquidity", type: "uint256" },
        { internalType: "uint256", name: "amountAMin", type: "uint256" },
        { internalType: "uint256", name: "amountBMin", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "removeLiquidity",
      outputs: [
        { internalType: "uint256", name: "amountA", type: "uint256" },
        { internalType: "uint256", name: "amountB", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    // Events
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountA",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountB",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "liquidity",
          type: "uint256",
        },
      ],
      name: "LiquidityAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountA",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountB",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "liquidity",
          type: "uint256",
        },
      ],
      name: "LiquidityRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenIn",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenOut",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "Swap",
      type: "event",
    },
  ],

  TOKEN_A: [
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],

  TOKEN_B: [
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

// ===== 2. CONSTANTS FOR MAGIC NUMBERS =====

/**
 * Application constants
 * @constant {Object}
 */
const CONSTANTS = {
  DEADLINE_MINUTES: 10, // 10 minutes
  MINT_AMOUNT: "1000", // Default mint amount
  AUTO_HIDE_NOTIFICATION_MS: 5000, // 5 seconds
  DECIMAL_PLACES: {
    BALANCE: 2,
    LP_TOKENS: 16,
    PRICE: 2,
  },
  PERCENTAGE: {
    SLIPPAGE_MULTIPLIER: 95, // 95% for 5% slippage
    FULL: 100,
  },
  TOKEN_NAMES: {
    A: "TACC",
    B: "TBCC",
  },
  ADDRESS_DISPLAY_LENGTH: {
    START: 6,
    END: 4,
  },
};

// ===== 3. GLOBAL VARIABLES AND STATE =====

/**
 * Global blockchain connection variables
 */
let provider;
let signer;
let userAddress;
let contracts = {};

/**
 * Flag to prevent infinite loops in liquidity autofill
 * @type {boolean}
 */
let isAutoFillingLiquidity = false;

/**
 * Array to store wallet interactions
 * @type {Array}
 */
let walletInteractions = [];

/**
 * Maximum number of interactions to display
 * @type {number}
 */
const MAX_INTERACTIONS = 50;

// ===== 4. DOM ELEMENTS =====

/**
 * DOM elements cache for better performance
 * @constant {Object}
 */
const elements = {
  connectBtn: document.getElementById("connectBtn"),
  accountInfo: document.getElementById("accountInfo"),
  accountAddress: document.getElementById("accountAddress"),
  balanceTokenA: document.getElementById("balanceTokenA"),
  balanceTokenB: document.getElementById("balanceTokenB"),
  lpTokenBalanceAccount: document.getElementById("lpTokenBalanceAccount"),

  // Swap elements
  tokenFrom: document.getElementById("tokenFrom"),
  tokenTo: document.getElementById("tokenTo"),
  amountFrom: document.getElementById("amountFrom"),
  amountTo: document.getElementById("amountTo"),
  swapPrice: document.getElementById("swapPrice"),
  receiveAmount: document.getElementById("receiveAmount"),
  approveSwapBtn: document.getElementById("approveSwapBtn"),
  swapBtn: document.getElementById("swapBtn"),

  // Data display elements (prices and reserves)
  priceTokenA: document.getElementById("priceTokenA"),
  priceTokenB: document.getElementById("priceTokenB"),
  reserveTokenA: document.getElementById("reserveTokenA"),
  reserveTokenB: document.getElementById("reserveTokenB"),

  // Token management elements
  mintTokenA: document.getElementById("mintTokenA"),
  mintTokenB: document.getElementById("mintTokenB"),
  approveAllBtn: document.getElementById("approveAllBtn"),
  updateDataBtn: document.getElementById("updateDataBtn"),
  currentPrice: document.getElementById("currentPrice"),

  // Liquidity elements
  liquidityAmountA: document.getElementById("liquidityAmountA"),
  liquidityAmountB: document.getElementById("liquidityAmountB"),
  addLiquidityBtn: document.getElementById("addLiquidityBtn"),

  // Remove Liquidity elements
  removeLiquidityAmount: document.getElementById("removeLiquidityAmount"),
  removeLiquidityBtn: document.getElementById("removeLiquidityBtn"),
  lpTokenBalance: document.getElementById("lpTokenBalance"),
  previewAmountA: document.getElementById("previewAmountA"),
  previewAmountB: document.getElementById("previewAmountB"),

  // UI feedback elements
  loadingIndicator: document.getElementById("loadingIndicator"),
  notification: document.getElementById("notification"),
  notificationMessage: document.getElementById("notificationMessage"),

  // Wallet interactions elements
  interactionsList: document.getElementById("interactionsList"),

  // LP Supply display element
  totalLPSupplyDisplay: document.getElementById("totalLPSupplyDisplay"),
  loadEventHistoryBtn: document.getElementById("loadEventHistoryBtn"),
};

// ===== 5. MAIN INITIALIZATION =====

/**
 * Initializes the SimpleSwap DApp
 * Sets up event listeners and verifies dependencies
 * @returns {void}
 */
function initialize() {
  console.log("Initializing application...");

  // Verify ethers.js is loaded
  if (typeof ethers === "undefined") {
    console.error("ethers.js is not loaded");
    alert("Error: ethers.js failed to load correctly. Please reload the page.");
    return;
  }

  setupEvents();

  // Initialize interactions display
  updateInteractionsDisplay();

  console.log("Application initialized successfully");
}

// ===== 6. EVENT SETUP =====

/**
 * Sets up all event listeners for the application
 * Includes wallet, swap, liquidity, and MetaMask events
 * @returns {void}
 */
function setupEvents() {
  console.log("Setting up event listeners...");

  // Wallet connection button
  if (elements.connectBtn) {
    elements.connectBtn.addEventListener("click", () => {
      if (userAddress) {
        disconnect();
      } else {
        connect();
      }
    });
  }

  // Swap-related events
  if (elements.amountFrom) {
    elements.amountFrom.addEventListener("input", () => {
      calculateSwap();
      checkApproval();
    });
  }

  if (elements.tokenFrom) {
    elements.tokenFrom.addEventListener("change", () => {
      calculateSwap();
      checkApproval();
    });
  }

  if (elements.tokenTo) {
    elements.tokenTo.addEventListener("change", () => {
      calculateSwap();
      checkApproval();
    });
  }

  if (elements.approveSwapBtn) {
    elements.approveSwapBtn.addEventListener("click", approveToken);
  }

  if (elements.swapBtn) {
    elements.swapBtn.addEventListener("click", executeSwap);
  }

  // Token minting events
  if (elements.mintTokenA) {
    elements.mintTokenA.addEventListener("click", mintTokenA);
  }

  if (elements.mintTokenB) {
    elements.mintTokenB.addEventListener("click", mintTokenB);
  }

  // Token approval events
  if (elements.approveAllBtn) {
    elements.approveAllBtn.addEventListener("click", approveAllTokens);
  }

  // Data update events (prices, reserves, LP supply)
  if (elements.updateDataBtn) {
    elements.updateDataBtn.addEventListener("click", updateData);
  }

  // Event history loading
  if (elements.loadEventHistoryBtn) {
    elements.loadEventHistoryBtn.addEventListener("click", async () => {
      showLoading();
      try {
        // Load events from last 1000 blocks
        const currentBlock = await provider.getBlockNumber();
        await fetchRecentEvents(currentBlock - 1000, currentBlock);
        showNotification("Event history loaded successfully", "success");
      } catch (error) {
        console.error("Error loading event history:", error);
        showNotification("Error loading event history", "error");
      } finally {
        hideLoading();
      }
    });
  }

  // Liquidity events
  if (elements.addLiquidityBtn) {
    elements.addLiquidityBtn.addEventListener("click", addLiquidity);
  }

  // Liquidity autofill events
  if (elements.liquidityAmountA) {
    elements.liquidityAmountA.addEventListener("input", async () => {
      await autofillLiquidityFields("A");
    });
  }
  if (elements.liquidityAmountB) {
    elements.liquidityAmountB.addEventListener("input", async () => {
      await autofillLiquidityFields("B");
    });
  }

  // Remove liquidity events
  if (elements.removeLiquidityBtn) {
    elements.removeLiquidityBtn.addEventListener("click", removeLiquidity);
  }

  if (elements.removeLiquidityAmount) {
    elements.removeLiquidityAmount.addEventListener(
      "input",
      calculateRemoveLiquidityPreview
    );
  }

  // MetaMask events
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("Accounts changed:", accounts);
      if (accounts.length === 0) {
        disconnect();
      } else {
        connect();
      }
    });

    window.ethereum.on("chainChanged", () => {
      console.log("Network changed");
      window.location.reload();
    });
  }

  console.log("Event listeners configured");
}

// ===== 7. UTILITY FUNCTIONS =====

/**
 * Shows the loading indicator
 * @returns {void}
 */
function showLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.classList.remove("hidden");
  }
}

/**
 * Hides the loading indicator
 * @returns {void}
 */
function hideLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.classList.add("hidden");
  }
}

/**
 * Shows a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - Type of notification (info, success, error)
 * @returns {void}
 */
function showNotification(message, type = "info") {
  console.log(`[${type.toUpperCase()}] ${message}`);
  if (elements.notificationMessage && elements.notification) {
    elements.notificationMessage.textContent = message;
    elements.notification.className = `notification ${type}`;
    elements.notification.classList.remove("hidden");

    // Auto-hide notification after configured time
    setTimeout(() => {
      elements.notification.classList.add("hidden");
    }, CONSTANTS.AUTO_HIDE_NOTIFICATION_MS);
  }
}

/**
 * Closes the notification manually
 * @returns {void}
 */
function closeNotification() {
  if (elements.notification) {
    elements.notification.classList.add("hidden");
  }
}

// ===== WALLET INTERACTIONS FUNCTIONS =====

/**
 * Adds a new wallet interaction to the list
 * @param {string} walletAddress - The wallet address that performed the action
 * @param {string} actionType - Type of action (approve, swap, add-liquidity, remove-liquidity)
 * @param {string} details - Details about the interaction
 * @param {string} amount - Amount involved in the interaction
 * @param {string} txHash - Transaction hash for Etherscan link
 * @returns {void}
 */
function addWalletInteraction(
  walletAddress,
  actionType,
  details,
  amount = "",
  txHash = ""
) {
  // Don't add interactions if no wallet is connected
  if (!userAddress) {
    console.log("Skipping interaction - no wallet connected");
    return;
  }

  // Check for duplicates based on transaction hash
  if (
    txHash &&
    walletInteractions.some((interaction) => interaction.txHash === txHash)
  ) {
    console.log("Skipping duplicate interaction for txHash:", txHash);
    return;
  }

  const interaction = {
    id: Date.now(),
    walletAddress,
    actionType,
    details,
    amount,
    txHash,
    timestamp: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
  };

  // Add to the beginning of the array
  walletInteractions.unshift(interaction);

  // Keep only the latest interactions
  if (walletInteractions.length > MAX_INTERACTIONS) {
    walletInteractions = walletInteractions.slice(0, MAX_INTERACTIONS);
  }

  // Save to localStorage per wallet
  saveInteractionsToStorage(walletAddress);

  // Update the display
  updateInteractionsDisplay();
}

/**
 * Updates the interactions display in the UI
 * @returns {void}
 */
function updateInteractionsDisplay() {
  if (!elements.interactionsList) return;

  if (walletInteractions.length === 0) {
    elements.interactionsList.innerHTML = `
      <div class="no-interactions">
        <i class="fas fa-info-circle"></i>
        <p>No interactions yet. Connect your wallet and start trading!</p>
      </div>
    `;
    return;
  }

  const interactionsHTML = walletInteractions
    .map((interaction) => {
      const truncatedAddress = `${interaction.walletAddress.slice(
        0,
        6
      )}...${interaction.walletAddress.slice(-4)}`;

      // Get icon and color based on action type
      const actionConfig = getActionConfig(interaction.actionType);

      // Format the amount text with compact column format and proper token names
      let formattedAmount = interaction.amount;
      if (interaction.amount) {
        if (interaction.actionType === "swap") {
          // Compact column format for swaps with proper token names
          const parts = interaction.amount.split(" → ");
          if (parts.length === 2) {
            // Extract amounts and determine token names
            const fromAmount = parts[0].trim();
            const toAmount = parts[1].trim();

            // Determine token names based on amounts (this is a simplified approach)
            // In a real implementation, you'd get this from the event data
            const fromToken = fromAmount.includes("Token A")
              ? "Token A"
              : fromAmount.includes("Token B")
              ? "Token B"
              : "Token";
            const toToken = toAmount.includes("Token A")
              ? "Token A"
              : toAmount.includes("Token B")
              ? "Token B"
              : "Token";

            const cleanFromAmount = fromAmount.replace(/Token [AB]/, "").trim();
            const cleanToAmount = toAmount.replace(/Token [AB]/, "").trim();

            formattedAmount = `From:   ${cleanFromAmount} ${fromToken}\nTo:        ${cleanToAmount} ${toToken}`;
          }
        } else if (interaction.actionType === "add-liquidity") {
          // Compact column format for add liquidity with proper token names
          const parts = interaction.amount.split(" + ");
          if (parts.length === 2) {
            const tokenAPart = parts[0].trim();
            const tokenBPart = parts[1].trim();

            const cleanTokenA = tokenAPart.replace(/Token A/, "").trim();
            const cleanTokenB = tokenBPart.replace(/Token B/, "").trim();

            formattedAmount = `From:   ${cleanTokenA} Token A\n            ${cleanTokenB} Token B\nTo:       LP`;
          }
        } else if (interaction.actionType === "remove-liquidity") {
          // Compact column format for remove liquidity with proper token names
          const parts = interaction.amount.split(" → ");
          if (parts.length === 2) {
            const fromPart = parts[0].trim();
            const toParts = parts[1].split(" + ");
            if (toParts.length === 2) {
              const cleanFrom = fromPart.replace(/LP/, "").trim();
              const cleanTokenA = toParts[0].replace(/Token A/, "").trim();
              const cleanTokenB = toParts[1].replace(/Token B/, "").trim();

              formattedAmount = `From:   ${cleanFrom} LP\nTo:       ${cleanTokenA} Token A\n            ${cleanTokenB} Token B`;
            }
          }
        }
      }

      return `
        <div class="interaction-item">
          <div class="interaction-header">
            <div class="action-badge">
              <i class="${actionConfig.icon}"></i>
              <span class="action-type ${
                interaction.actionType
              }">${interaction.actionType.replace("-", " ")}</span>
            </div>
            <span class="wallet-address">${truncatedAddress}</span>
          </div>
          <div class="interaction-time">
            <i class="fas fa-clock"></i>
            ${interaction.timestamp}
          </div>
          <div class="interaction-details">
            ${
              interaction.amount
                ? `<div class="amount-display">
                    <i class="fas fa-coins"></i>
                    <span class="interaction-amount">${formattedAmount}</span>
                   </div>`
                : ""
            }
            ${
              interaction.txHash
                ? `<div class="transaction-link">
                    <a href="https://sepolia.etherscan.io/tx/${interaction.txHash}" target="_blank" rel="noopener noreferrer">
                      <i class="fas fa-external-link-alt"></i>
                      View on Etherscan
                    </a>
                   </div>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");

  elements.interactionsList.innerHTML = interactionsHTML;

  // Auto-scroll to top when new interactions are added
  if (elements.interactionsList) {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      elements.interactionsList.scrollTop = 0;
    });
  }
}

/**
 * Gets configuration for action types (icons and colors)
 * @param {string} actionType - Type of action
 * @returns {Object} Configuration object with icon and color
 */
function getActionConfig(actionType) {
  const configs = {
    approve: {
      icon: "fas fa-check-circle",
      color: "#ffd700",
    },
    swap: {
      icon: "fas fa-exchange-alt",
      color: "#32cd32",
    },
    "add-liquidity": {
      icon: "fas fa-plus-circle",
      color: "#4169e1",
    },
    "remove-liquidity": {
      icon: "fas fa-minus-circle",
      color: "#dc143c",
    },
  };

  return (
    configs[actionType] || {
      icon: "fas fa-info-circle",
      color: "#8b9caf",
    }
  );
}

// ===== 8. WALLET MANAGEMENT =====

/**
 * Connects to MetaMask wallet and initializes contracts
 * @returns {Promise<void>}
 */
async function connect() {
  console.log("Initiating wallet connection...");

  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask detected");

    try {
      showLoading();

      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create provider and signer
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();

      console.log("Connected address:", userAddress);

      // Clear any existing interactions first to prevent duplicates
      walletInteractions = [];

      // Load interactions for this wallet
      loadInteractionsFromStorage(userAddress);

      // Update UI with connected wallet info
      if (elements.accountAddress) {
        elements.accountAddress.textContent = `Connected: ${userAddress.slice(
          0,
          CONSTANTS.ADDRESS_DISPLAY_LENGTH.START
        )}...${userAddress.slice(-CONSTANTS.ADDRESS_DISPLAY_LENGTH.END)}`;
      }

      if (elements.accountInfo) {
        elements.accountInfo.classList.remove("hidden");
      }

      if (elements.connectBtn) {
        elements.connectBtn.textContent = "Disconnect";
      }

      // Initialize contract instances
      contracts.simpleSwap = new ethers.Contract(
        CONTRACT_ADDRESSES.SIMPLE_SWAP,
        CONTRACT_ABIS.SIMPLE_SWAP,
        signer
      );
      contracts.tokenA = new ethers.Contract(
        CONTRACT_ADDRESSES.TOKEN_A,
        CONTRACT_ABIS.TOKEN_A,
        signer
      );
      contracts.tokenB = new ethers.Contract(
        CONTRACT_ADDRESSES.TOKEN_B,
        CONTRACT_ABIS.TOKEN_B,
        signer
      );

      console.log("Contracts initialized");

      // Update balances and data
      await updateBalances();
      await updateData();
      await updateLPSupply();

      // Show loaded interactions
      updateInteractionsDisplay();

      // Set up contract event listeners
      setupContractEventListeners();

      hideLoading();
      showNotification("Wallet connected successfully", "success");
    } catch (error) {
      hideLoading();
      console.error("Error connecting wallet:", error);
      showNotification(`Error: ${error.message}`, "error");
    }
  } else {
    alert("Please install MetaMask");
    showNotification("MetaMask is not installed", "error");
  }
}

/**
 * Disconnects from the wallet and resets the application state
 * @returns {void}
 */
function disconnect() {
  console.log("Disconnecting wallet...");

  // Clean up contract event listeners first to prevent new interactions
  cleanupContractEventListeners();

  // Reset global variables
  provider = null;
  signer = null;
  userAddress = null;
  contracts = {};

  // Clear interactions array and display
  walletInteractions = [];

  // Clear the interactions display completely
  if (elements.interactionsList) {
    elements.interactionsList.innerHTML = `
      <div class="no-interactions">
        <i class="fas fa-info-circle"></i>
        <p>No interactions yet. Connect your wallet and start trading!</p>
      </div>
    `;
  }

  // Update UI elements
  if (elements.accountAddress) {
    elements.accountAddress.textContent = "Not connected";
  }

  if (elements.accountInfo) {
    elements.accountInfo.classList.add("hidden");
  }

  if (elements.connectBtn) {
    elements.connectBtn.textContent = "Connect MetaMask";
  }

  // Clear balance displays
  if (elements.balanceTokenA) elements.balanceTokenA.textContent = "0";
  if (elements.balanceTokenB) elements.balanceTokenB.textContent = "0";

  showNotification("Wallet disconnected", "info");
}

/**
 * Updates all token balances from the blockchain
 * @returns {Promise<void>}
 */
async function updateBalances() {
  if (
    !userAddress ||
    !contracts.tokenA ||
    !contracts.tokenB ||
    !contracts.simpleSwap
  ) {
    console.log("Cannot update balances - missing data");
    return;
  }

  try {
    console.log("Updating token balances...");

    // Fetch balances from contracts
    const balanceA = await contracts.tokenA.balanceOf(userAddress);
    const balanceB = await contracts.tokenB.balanceOf(userAddress);
    const lpBalance = await contracts.simpleSwap.balanceOf(userAddress);

    // Update UI with formatted balances
    if (elements.balanceTokenA) {
      elements.balanceTokenA.textContent = parseFloat(
        ethers.utils.formatEther(balanceA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    if (elements.balanceTokenB) {
      elements.balanceTokenB.textContent = parseFloat(
        ethers.utils.formatEther(balanceB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    if (elements.lpTokenBalance) {
      elements.lpTokenBalance.textContent = parseFloat(
        ethers.utils.formatEther(lpBalance)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.LP_TOKENS,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.LP_TOKENS,
      });
    }

    if (elements.lpTokenBalanceAccount) {
      elements.lpTokenBalanceAccount.textContent = parseFloat(
        ethers.utils.formatEther(lpBalance)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    console.log("Balances updated successfully");
  } catch (error) {
    console.error("Error updating balances:", error);
    showNotification("Error updating balances", "error");
  }
}

// ===== 9. SWAP FUNCTIONS =====

/**
 * Calculates the output amount for a token swap
 * @returns {Promise<void>}
 */
async function calculateSwap() {
  // Check if required elements and values are available
  if (
    !contracts.simpleSwap ||
    !elements.amountFrom ||
    !elements.amountFrom.value
  ) {
    if (elements.amountTo) elements.amountTo.value = "";
    if (elements.receiveAmount) elements.receiveAmount.textContent = "0";
    return;
  }

  try {
    // Parse input amount
    const amountIn = ethers.utils.parseEther(elements.amountFrom.value);

    // Get current reserves from the contract
    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    // Determine swap direction and reserves
    const isAtoB = elements.tokenFrom.value === "tokenA";
    const reserveIn = isAtoB ? reserveA : reserveB;
    const reserveOut = isAtoB ? reserveB : reserveA;

    // Check if liquidity exists
    if (reserveIn.isZero() || reserveOut.isZero()) {
      if (elements.amountTo) elements.amountTo.value = "0";
      if (elements.receiveAmount) elements.receiveAmount.textContent = "0";
      return;
    }

    // Calculate expected output amount
    const amountOut = await contracts.simpleSwap.getAmountOut(
      amountIn,
      reserveIn,
      reserveOut
    );
    const formattedAmount = parseFloat(
      ethers.utils.formatEther(amountOut)
    ).toFixed(CONSTANTS.DECIMAL_PLACES.BALANCE);

    // Update UI with calculated amounts
    if (elements.amountTo) elements.amountTo.value = formattedAmount;
    if (elements.receiveAmount)
      elements.receiveAmount.textContent = parseFloat(
        ethers.utils.formatEther(amountOut)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });

    // Calculate and display exchange rate
    const price = (
      parseFloat(ethers.utils.formatEther(amountOut)) /
      parseFloat(elements.amountFrom.value)
    ).toLocaleString("en-US", {
      minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
      maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
    });
    if (elements.swapPrice) {
      elements.swapPrice.textContent = `1 ${
        elements.tokenFrom.value === "tokenA"
          ? CONSTANTS.TOKEN_NAMES.A
          : CONSTANTS.TOKEN_NAMES.B
      } = ${price} ${
        elements.tokenTo.value === "tokenA"
          ? CONSTANTS.TOKEN_NAMES.A
          : CONSTANTS.TOKEN_NAMES.B
      }`;
    }
  } catch (error) {
    console.error("Error calculating swap:", error);
    if (elements.amountTo) elements.amountTo.value = "0";
    if (elements.receiveAmount) elements.receiveAmount.textContent = "0";
  }
}

/**
 * Checks if token approval is needed for the swap
 * @returns {Promise<void>}
 */
async function checkApproval() {
  // Check if required data is available
  if (
    !userAddress ||
    !contracts.tokenA ||
    !contracts.tokenB ||
    !elements.amountFrom ||
    !elements.amountFrom.value
  ) {
    if (elements.approveSwapBtn)
      elements.approveSwapBtn.classList.add("hidden");
    if (elements.swapBtn) elements.swapBtn.disabled = true;
    return;
  }

  try {
    const amountIn = ethers.utils.parseEther(elements.amountFrom.value);
    const tokenContract =
      elements.tokenFrom.value === "tokenA"
        ? contracts.tokenA
        : contracts.tokenB;

    // Check current allowance and balance
    const allowance = await tokenContract.allowance(
      userAddress,
      CONTRACT_ADDRESSES.SIMPLE_SWAP
    );
    const balance = await tokenContract.balanceOf(userAddress);

    // Determine if approval is needed
    const needsApproval = allowance.lt(amountIn);
    const hasBalance = balance.gte(amountIn);

    // Update UI based on approval status
    if (elements.approveSwapBtn) {
      elements.approveSwapBtn.classList.toggle("hidden", !needsApproval);
    }

    if (elements.swapBtn) {
      elements.swapBtn.disabled = needsApproval || !hasBalance;
    }
  } catch (error) {
    console.error("Error checking approval:", error);
  }
}

/**
 * Approves tokens for swap transactions
 * @returns {Promise<void>}
 */
async function approveToken() {
  if (!userAddress || !elements.amountFrom || !elements.amountFrom.value)
    return;

  try {
    showLoading();
    const amountIn = ethers.utils.parseEther(elements.amountFrom.value);
    const tokenContract =
      elements.tokenFrom.value === "tokenA"
        ? contracts.tokenA
        : contracts.tokenB;

    console.log("Approving token...");

    // Execute approval transaction
    const tx = await tokenContract.approve(
      CONTRACT_ADDRESSES.SIMPLE_SWAP,
      amountIn
    );
    await tx.wait();

    // Update approval status
    await checkApproval();
    hideLoading();
    showNotification("Token approved successfully", "success");
  } catch (error) {
    hideLoading();
    console.error("Error approving token:", error);
    showNotification(`Error approving token: ${error.message}`, "error");
  }
}

/**
 * Executes a token swap transaction
 * @returns {Promise<void>}
 */
async function executeSwap() {
  if (!userAddress || !elements.amountFrom || !elements.amountFrom.value)
    return;

  try {
    showLoading();
    console.log("Executing swap...");

    // Prepare swap parameters
    const amountIn = ethers.utils.parseEther(elements.amountFrom.value);
    const tokenInAddress =
      elements.tokenFrom.value === "tokenA"
        ? CONTRACT_ADDRESSES.TOKEN_A
        : CONTRACT_ADDRESSES.TOKEN_B;
    const tokenOutAddress =
      elements.tokenTo.value === "tokenA"
        ? CONTRACT_ADDRESSES.TOKEN_A
        : CONTRACT_ADDRESSES.TOKEN_B;

    const path = [tokenInAddress, tokenOutAddress];
    const deadline =
      Math.floor(Date.now() / 1000) + CONSTANTS.DEADLINE_MINUTES * 60;

    // Execute swap transaction
    const tx = await contracts.simpleSwap.swapExactTokensForTokens(
      amountIn,
      0, // amountOutMin (no slippage protection for simplicity)
      path,
      userAddress,
      deadline
    );

    await tx.wait();

    // Clear input fields
    if (elements.amountFrom) elements.amountFrom.value = "";
    if (elements.amountTo) elements.amountTo.value = "";
    if (elements.receiveAmount) elements.receiveAmount.textContent = "0";

    // Update balances and data
    await updateBalances();
    await updateData();

    hideLoading();
    showNotification("Swap executed successfully", "success");
  } catch (error) {
    hideLoading();
    console.error("Error executing swap:", error);
    showNotification(`Error executing swap: ${error.message}`, "error");
  }
}

/**
 * Swaps the selected tokens (From <-> To)
 * @returns {void}
 */
function swapAddress() {
  if (!elements.tokenFrom || !elements.tokenTo) return;

  // Swap token selection
  const fromValue = elements.tokenFrom.value;
  const toValue = elements.tokenTo.value;

  elements.tokenFrom.value = toValue;
  elements.tokenTo.value = fromValue;

  // Clear amount fields
  if (elements.amountFrom) elements.amountFrom.value = "";
  if (elements.amountTo) elements.amountTo.value = "";
  if (elements.receiveAmount) elements.receiveAmount.textContent = "0";

  // Update approval status for new token direction
  checkApproval();
}

// ===== 10. PRICE FUNCTIONS =====

/**
 * Updates data displays including prices, reserves, and LP supply
 * @returns {Promise<void>}
 */
async function updateData() {
  if (!contracts.simpleSwap) return;

  try {
    console.log("Updating data (prices, reserves, and LP supply)...");

    // Get current reserves from the contract
    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    // Update reserve displays
    if (elements.reserveTokenA) {
      elements.reserveTokenA.textContent = parseFloat(
        ethers.utils.formatEther(reserveA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    if (elements.reserveTokenB) {
      elements.reserveTokenB.textContent = parseFloat(
        ethers.utils.formatEther(reserveB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    // Calculate and display exchange rates
    if (!reserveA.isZero() && !reserveB.isZero()) {
      // Get real prices using getAmountOut() for accuracy
      const realPrices = await calculateRealPrices(reserveA, reserveB);

      // Update price displays
      if (elements.priceTokenA) {
        elements.priceTokenA.textContent = realPrices.priceA.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
            maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
          }
        );
      }
      if (elements.priceTokenB) {
        elements.priceTokenB.textContent = realPrices.priceB.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
            maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
          }
        );
      }

      // Update current price display in navigation
      if (elements.currentPrice) {
        elements.currentPrice.textContent = `1 Token A = ${realPrices.priceA.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
            maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.PRICE,
          }
        )} Token B`;
      }
    } else {
      // Handle case when no liquidity exists
      if (elements.priceTokenA) elements.priceTokenA.textContent = "-";
      if (elements.priceTokenB) elements.priceTokenB.textContent = "-";
      if (elements.currentPrice)
        elements.currentPrice.textContent = "Price: No liquidity";
    }

    console.log("Data updated successfully");

    // Update LP supply information
    await updateLPSupply();
  } catch (error) {
    console.error("Error updating prices:", error);
  }
}

/**
 * Forces a complete refresh of LP supply data
 * @dev Can be called manually to force update
 * @returns {Promise<void>}
 */
async function forceUpdateLPSupply() {
  console.log("=== FORCE UPDATE LP SUPPLY ===");
  console.log("Current user address:", userAddress);
  console.log("Current provider:", provider);

  try {
    // Clear any potential cache
    if (window.ethereum) {
      console.log("Forcing MetaMask cache refresh...");
      await window.ethereum.request({
        method: "eth_getBlockByNumber",
        params: ["latest", false],
      });
    }

    await updateLPSupply();
    console.log("Force update completed");
  } catch (error) {
    console.error("Error in force update:", error);
  }
}

/**
 * Updates LP Token Supply by getting the total supply from the contract
 * @dev Forces a fresh blockchain read to avoid all cache issues
 * @returns {Promise<void>}
 */
async function updateLPSupply() {
  if (!contracts.simpleSwap) {
    console.log("Cannot update LP supply - missing contract");
    return;
  }

  try {
    console.log("Updating LP supply...");

    // Force a completely fresh provider and contract instance
    const freshProvider = new ethers.providers.Web3Provider(window.ethereum);

    // Force provider to get latest block
    await freshProvider.getNetwork();

    const readOnlyContract = new ethers.Contract(
      CONTRACT_ADDRESSES.SIMPLE_SWAP,
      [
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      freshProvider
    );

    // Force a fresh call with explicit block number
    const latestBlock = await freshProvider.getBlockNumber();
    const totalSupply = await readOnlyContract.totalSupply({
      blockTag: latestBlock,
    });

    console.log("Latest block:", latestBlock);
    console.log("Raw totalSupply:", totalSupply.toString());
    console.log(
      "Formatted totalSupply:",
      ethers.utils.formatEther(totalSupply)
    );

    // Update total supply display
    if (elements.totalLPSupplyDisplay) {
      const formattedValue = parseFloat(
        ethers.utils.formatEther(totalSupply)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });

      console.log("Setting display to:", formattedValue);
      elements.totalLPSupplyDisplay.textContent = formattedValue;
    } else {
      console.log("ERROR: totalLPSupplyDisplay element not found!");
    }

    console.log("LP supply updated successfully");
  } catch (error) {
    console.error("Error updating LP supply:", error);
    console.error("Error details:", error.message);
  }
}

/**
 * Calculates real prices using the AMM formula
 * @param {ethers.BigNumber} reserveA - Reserve amount for token A
 * @param {ethers.BigNumber} reserveB - Reserve amount for token B
 * @returns {Promise<Object>} Object containing priceA and priceB
 */
async function calculateRealPrices(reserveA, reserveB) {
  try {
    // Use 1 token as standard amount for price calculation
    const oneToken = ethers.utils.parseEther("1");

    // Calculate real price A to B using getAmountOut()
    const realAmountOutB = await contracts.simpleSwap.getAmountOut(
      oneToken,
      reserveA,
      reserveB
    );

    // Calculate real price B to A using getAmountOut()
    const realAmountOutA = await contracts.simpleSwap.getAmountOut(
      oneToken,
      reserveB,
      reserveA
    );

    const realPriceA = parseFloat(ethers.utils.formatEther(realAmountOutB));
    const realPriceB = parseFloat(ethers.utils.formatEther(realAmountOutA));

    return {
      priceA: realPriceA,
      priceB: realPriceB,
    };
  } catch (error) {
    console.error("Error calculating real prices:", error);
    // Fallback to theoretical prices if getAmountOut fails
    const theoreticalPriceA =
      parseFloat(ethers.utils.formatEther(reserveB)) /
      parseFloat(ethers.utils.formatEther(reserveA));
    const theoreticalPriceB =
      parseFloat(ethers.utils.formatEther(reserveA)) /
      parseFloat(ethers.utils.formatEther(reserveB));

    return {
      priceA: theoreticalPriceA,
      priceB: theoreticalPriceB,
    };
  }
}

// ===== 11. TOKEN FUNCTIONS =====

/**
 * Mints test tokens A for the connected wallet
 * @returns {Promise<void>}
 */
async function mintTokenA() {
  if (!userAddress || !contracts.tokenA) {
    showNotification("Connect your wallet first", "error");
    return;
  }

  try {
    showLoading();

    // Mint configured amount of tokens
    const mintAmount = ethers.utils.parseEther(CONSTANTS.MINT_AMOUNT);

    console.log(`Minting ${CONSTANTS.MINT_AMOUNT} Token A...`);

    // Update button state
    if (elements.mintTokenA) {
      elements.mintTokenA.disabled = true;
      elements.mintTokenA.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Minting...';
    }

    // Execute mint transaction
    const tx = await contracts.tokenA.mint(userAddress, mintAmount);
    await tx.wait();

    showNotification(
      `${CONSTANTS.MINT_AMOUNT} Token A minted successfully!`,
      "success"
    );

    // Update balance display
    await updateBalances();
  } catch (error) {
    console.error("Error minting Token A:", error);
    showNotification(`Error minting: ${error.message}`, "error");
  } finally {
    hideLoading();
    if (elements.mintTokenA) {
      elements.mintTokenA.disabled = false;
      elements.mintTokenA.innerHTML = `<i class="fas fa-coins"></i> Mint ${CONSTANTS.MINT_AMOUNT} Token A`;
    }
  }
}

/**
 * Mints test tokens B for the connected wallet
 * @returns {Promise<void>}
 */
async function mintTokenB() {
  if (!userAddress || !contracts.tokenB) {
    showNotification("Connect your wallet first", "error");
    return;
  }

  try {
    showLoading();

    // Mint configured amount of tokens
    const mintAmount = ethers.utils.parseEther(CONSTANTS.MINT_AMOUNT);

    console.log(`Minting ${CONSTANTS.MINT_AMOUNT} Token B...`);

    // Update button state
    if (elements.mintTokenB) {
      elements.mintTokenB.disabled = true;
      elements.mintTokenB.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Minting...';
    }

    // Execute mint transaction
    const tx = await contracts.tokenB.mint(userAddress, mintAmount);
    await tx.wait();

    showNotification(
      `${CONSTANTS.MINT_AMOUNT} Token B minted successfully!`,
      "success"
    );

    // Update balance display
    await updateBalances();
  } catch (error) {
    console.error("Error minting Token B:", error);
    showNotification(`Error minting: ${error.message}`, "error");
  } finally {
    hideLoading();
    if (elements.mintTokenB) {
      elements.mintTokenB.disabled = false;
      elements.mintTokenB.innerHTML = `<i class="fas fa-coins"></i> Mint ${CONSTANTS.MINT_AMOUNT} Token B`;
    }
  }
}

/**
 * Approves maximum amount of both tokens for the swap contract
 * @returns {Promise<void>}
 */
async function approveAllTokens() {
  if (!userAddress || !contracts.tokenA || !contracts.tokenB) {
    showNotification("Connect your wallet first", "error");
    return;
  }

  try {
    showLoading();

    // Update button state
    if (elements.approveAllBtn) {
      elements.approveAllBtn.disabled = true;
      elements.approveAllBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Approving...';
    }

    console.log("Approving Token A...");

    // Approve maximum amount for both tokens
    const maxAmount = ethers.constants.MaxUint256;
    const txA = await contracts.tokenA.approve(
      CONTRACT_ADDRESSES.SIMPLE_SWAP,
      maxAmount
    );
    await txA.wait();

    console.log("Approving Token B...");

    const txB = await contracts.tokenB.approve(
      CONTRACT_ADDRESSES.SIMPLE_SWAP,
      maxAmount
    );
    await txB.wait();

    showNotification("Tokens approved successfully!", "success");

    // Update approval status
    await checkApproval();
  } catch (error) {
    console.error("Error approving tokens:", error);
    showNotification(`Error approving tokens: ${error.message}`, "error");
  } finally {
    hideLoading();
    if (elements.approveAllBtn) {
      elements.approveAllBtn.disabled = false;
      elements.approveAllBtn.innerHTML =
        '<i class="fas fa-check-circle"></i> Approve All Tokens';
    }
  }
}

// ===== 12. LIQUIDITY FUNCTIONS =====

/**
 * Autofills liquidity input fields based on pool ratio
 * @param {string} changedField - Which field was changed ("A" or "B")
 * @returns {Promise<void>}
 */
async function autofillLiquidityFields(changedField) {
  if (isAutoFillingLiquidity) return;
  isAutoFillingLiquidity = true;

  try {
    if (!contracts.simpleSwap) return;

    const inputA = elements.liquidityAmountA?.value;
    const inputB = elements.liquidityAmountB?.value;

    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    // If pool is empty, don't autofill
    if (reserveA.isZero() || reserveB.isZero()) {
      return;
    }

    if (changedField === "A" && inputA && parseFloat(inputA) > 0) {
      // Calculate optimal B for given A
      const amountA = ethers.utils.parseEther(inputA.toString());
      const optimalAmountB = amountA.mul(reserveB).div(reserveA);
      const optimalBFormatted = parseFloat(
        ethers.utils.formatEther(optimalAmountB)
      ).toFixed(CONSTANTS.DECIMAL_PLACES.BALANCE);

      if (elements.liquidityAmountB)
        elements.liquidityAmountB.value = optimalBFormatted;
    } else if (changedField === "B" && inputB && parseFloat(inputB) > 0) {
      // Calculate optimal A for given B
      const amountB = ethers.utils.parseEther(inputB.toString());
      const optimalAmountA = amountB.mul(reserveA).div(reserveB);
      const optimalAFormatted = parseFloat(
        ethers.utils.formatEther(optimalAmountA)
      ).toFixed(CONSTANTS.DECIMAL_PLACES.BALANCE);

      if (elements.liquidityAmountA)
        elements.liquidityAmountA.value = optimalAFormatted;
    }
  } catch (error) {
    console.error("Error autofilling liquidity fields:", error);
  } finally {
    isAutoFillingLiquidity = false;
  }
}

/**
 * Adds liquidity to the pool
 * @returns {Promise<void>}
 */
async function addLiquidity() {
  if (!userAddress || !contracts.simpleSwap) {
    showNotification("Connect your wallet first", "error");
    return;
  }

  // Validate input amounts
  const amountA = elements.liquidityAmountA?.value;
  const amountB = elements.liquidityAmountB?.value;

  if (
    !amountA ||
    !amountB ||
    parseFloat(amountA) <= 0 ||
    parseFloat(amountB) <= 0
  ) {
    showNotification("Enter valid amounts", "error");
    return;
  }

  try {
    showLoading();

    // Update button state
    if (elements.addLiquidityBtn) {
      elements.addLiquidityBtn.disabled = true;
      elements.addLiquidityBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Adding Liquidity...';
    }

    console.log("Adding liquidity...");

    // Parse amounts
    const amountADesired = ethers.utils.parseEther(amountA);
    const amountBDesired = ethers.utils.parseEther(amountB);

    // Get current reserves to calculate optimal amounts
    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    let finalAmountA = amountADesired;
    let finalAmountB = amountBDesired;

    // If liquidity already exists, calculate optimal amounts
    if (!reserveA.isZero() && !reserveB.isZero()) {
      console.log(
        "Existing liquidity detected, calculating optimal amounts..."
      );

      // Calculate optimal amount B for given amount A
      const optimalAmountB = amountADesired.mul(reserveB).div(reserveA);
      // Calculate optimal amount A for given amount B
      const optimalAmountA = amountBDesired.mul(reserveA).div(reserveB);

      // Choose the pair that uses the maximum amount without exceeding desired amounts
      if (optimalAmountB.lte(amountBDesired)) {
        finalAmountA = amountADesired;
        finalAmountB = optimalAmountB;
      } else {
        finalAmountA = optimalAmountA;
        finalAmountB = amountBDesired;
      }

      // Notify user about the adjustment
      showNotification(
        `Amounts adjusted to pool ratio: ${parseFloat(
          ethers.utils.formatEther(finalAmountA)
        ).toLocaleString("en-US", {
          minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
          maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        })} ${CONSTANTS.TOKEN_NAMES.A} + ${parseFloat(
          ethers.utils.formatEther(finalAmountB)
        ).toLocaleString("en-US", {
          minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
          maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        })} ${CONSTANTS.TOKEN_NAMES.B}`,
        "info"
      );
    }

    // Set slippage tolerance
    const amountAMin = finalAmountA
      .mul(CONSTANTS.PERCENTAGE.SLIPPAGE_MULTIPLIER)
      .div(CONSTANTS.PERCENTAGE.FULL);
    const amountBMin = finalAmountB
      .mul(CONSTANTS.PERCENTAGE.SLIPPAGE_MULTIPLIER)
      .div(CONSTANTS.PERCENTAGE.FULL);

    // Set deadline
    const deadline =
      Math.floor(Date.now() / 1000) + CONSTANTS.DEADLINE_MINUTES * 60;

    // Check token balances
    const balanceA = await contracts.tokenA.balanceOf(userAddress);
    const balanceB = await contracts.tokenB.balanceOf(userAddress);

    if (balanceA.lt(finalAmountA)) {
      throw new Error(
        `Insufficient Token A balance. Need: ${ethers.utils.formatEther(
          finalAmountA
        )}, Have: ${ethers.utils.formatEther(balanceA)}`
      );
    }

    if (balanceB.lt(finalAmountB)) {
      throw new Error(
        `Insufficient Token B balance. Need: ${ethers.utils.formatEther(
          finalAmountB
        )}, Have: ${ethers.utils.formatEther(balanceB)}`
      );
    }

    // Check token approvals
    const allowanceA = await contracts.tokenA.allowance(
      userAddress,
      CONTRACT_ADDRESSES.SIMPLE_SWAP
    );
    const allowanceB = await contracts.tokenB.allowance(
      userAddress,
      CONTRACT_ADDRESSES.SIMPLE_SWAP
    );

    if (allowanceA.lt(finalAmountA)) {
      throw new Error(
        "Insufficient Token A allowance. Please approve tokens first."
      );
    }

    if (allowanceB.lt(finalAmountB)) {
      throw new Error(
        "Insufficient Token B allowance. Please approve tokens first."
      );
    }

    // Execute add liquidity transaction
    const tx = await contracts.simpleSwap.addLiquidity(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B,
      finalAmountA,
      finalAmountB,
      amountAMin,
      amountBMin,
      userAddress,
      deadline
    );

    await tx.wait();

    showNotification("Liquidity added successfully!", "success");

    // Clear input fields
    if (elements.liquidityAmountA) elements.liquidityAmountA.value = "";
    if (elements.liquidityAmountB) elements.liquidityAmountB.value = "";

    // Update balances, data, and LP supply
    await updateBalances();
    await updateData();
    await updateLPSupply();
  } catch (error) {
    console.error("Error adding liquidity:", error);

    // Provide user-friendly error messages
    let errorMessage = error.message;
    if (error.message.includes("allowance")) {
      errorMessage =
        "Please approve tokens first by clicking 'Approve All Tokens'.";
    }

    showNotification(`Error adding liquidity: ${errorMessage}`, "error");
  } finally {
    hideLoading();
    if (elements.addLiquidityBtn) {
      elements.addLiquidityBtn.disabled = false;
      elements.addLiquidityBtn.innerHTML =
        '<i class="fas fa-plus-circle"></i> Add Liquidity';
    }
  }
}

/**
 * Removes liquidity from the pool
 * @returns {Promise<void>}
 */
async function removeLiquidity() {
  if (!userAddress || !contracts.simpleSwap) {
    showNotification("Connect your wallet first", "error");
    return;
  }

  // Validate input amount
  const liquidityAmount = elements.removeLiquidityAmount?.value;

  if (!liquidityAmount || parseFloat(liquidityAmount) <= 0) {
    showNotification("Enter a valid liquidity amount", "error");
    return;
  }

  try {
    showLoading();

    // Update button state
    if (elements.removeLiquidityBtn) {
      elements.removeLiquidityBtn.disabled = true;
      elements.removeLiquidityBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Removing Liquidity...';
    }

    console.log("Removing liquidity...");

    // Parse liquidity amount
    const liquidityToRemove = ethers.utils.parseEther(liquidityAmount);

    // Check if user has enough LP tokens
    const lpBalance = await contracts.simpleSwap.balanceOf(userAddress);
    if (lpBalance.lt(liquidityToRemove)) {
      throw new Error("Insufficient LP tokens");
    }

    // Get current reserves to calculate expected amounts
    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    const totalSupply = await contracts.simpleSwap.totalSupply();

    // Calculate expected amounts (for slippage protection)
    const expectedAmountA = liquidityToRemove.mul(reserveA).div(totalSupply);
    const expectedAmountB = liquidityToRemove.mul(reserveB).div(totalSupply);

    // Set slippage tolerance
    const amountAMin = expectedAmountA
      .mul(CONSTANTS.PERCENTAGE.SLIPPAGE_MULTIPLIER)
      .div(CONSTANTS.PERCENTAGE.FULL);
    const amountBMin = expectedAmountB
      .mul(CONSTANTS.PERCENTAGE.SLIPPAGE_MULTIPLIER)
      .div(CONSTANTS.PERCENTAGE.FULL);

    // Set deadline
    const deadline =
      Math.floor(Date.now() / 1000) + CONSTANTS.DEADLINE_MINUTES * 60;

    // Execute remove liquidity transaction
    const tx = await contracts.simpleSwap.removeLiquidity(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B,
      liquidityToRemove,
      amountAMin,
      amountBMin,
      userAddress,
      deadline
    );

    await tx.wait();

    showNotification("Liquidity removed successfully!", "success");

    // Clear input field
    if (elements.removeLiquidityAmount)
      elements.removeLiquidityAmount.value = "";

    // Update balances, data, and LP supply
    await updateBalances();
    await updateData();
    await updateLPSupply();
    await calculateRemoveLiquidityPreview();
  } catch (error) {
    console.error("Error removing liquidity:", error);
    showNotification(`Error removing liquidity: ${error.message}`, "error");
  } finally {
    hideLoading();
    if (elements.removeLiquidityBtn) {
      elements.removeLiquidityBtn.disabled = false;
      elements.removeLiquidityBtn.innerHTML =
        '<i class="fas fa-minus-circle"></i> Remove Liquidity';
    }
  }
}

/**
 * Calculates and displays preview of remove liquidity operation
 * @returns {Promise<void>}
 */
async function calculateRemoveLiquidityPreview() {
  if (
    !contracts.simpleSwap ||
    !elements.removeLiquidityAmount ||
    !elements.removeLiquidityAmount.value
  ) {
    // Clear preview displays
    if (elements.previewAmountA) elements.previewAmountA.textContent = "0";
    if (elements.previewAmountB) elements.previewAmountB.textContent = "0";
    return;
  }

  try {
    const liquidityAmount = ethers.utils.parseEther(
      elements.removeLiquidityAmount.value
    );

    // Get current reserves and total supply
    const [reserveA, reserveB] = await contracts.simpleSwap.getReserves(
      CONTRACT_ADDRESSES.TOKEN_A,
      CONTRACT_ADDRESSES.TOKEN_B
    );

    const totalSupply = await contracts.simpleSwap.totalSupply();

    if (totalSupply.isZero()) {
      return;
    }

    // Calculate expected amounts
    const expectedAmountA = liquidityAmount.mul(reserveA).div(totalSupply);
    const expectedAmountB = liquidityAmount.mul(reserveB).div(totalSupply);

    // Update preview displays
    if (elements.previewAmountA) {
      elements.previewAmountA.textContent = parseFloat(
        ethers.utils.formatEther(expectedAmountA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }

    if (elements.previewAmountB) {
      elements.previewAmountB.textContent = parseFloat(
        ethers.utils.formatEther(expectedAmountB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
        maximumFractionDigits: CONSTANTS.DECIMAL_PLACES.BALANCE,
      });
    }
  } catch (error) {
    console.error("Error calculating remove liquidity preview:", error);
  }
}

/**
 * Saves interactions to localStorage for a wallet
 */
function saveInteractionsToStorage(walletAddress) {
  try {
    const key = `wallet_interactions_${walletAddress.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(walletInteractions));
  } catch (error) {
    console.error("Error saving interactions to localStorage:", error);
  }
}

/**
 * Loads interactions from localStorage for a wallet
 */
function loadInteractionsFromStorage(walletAddress) {
  try {
    const key = `wallet_interactions_${walletAddress.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      walletInteractions = JSON.parse(stored);
    } else {
      walletInteractions = [];
    }
  } catch (error) {
    console.error("Error loading interactions from localStorage:", error);
    walletInteractions = [];
  }
}

// ===== 13. EVENT-BASED INTERACTIONS SYSTEM =====

/**
 * Sets up contract event listeners for real-time updates
 * @returns {void}
 */
function setupContractEventListeners() {
  if (!contracts.simpleSwap) return;

  console.log("Setting up contract event listeners...");

  // Listen for Swap events
  contracts.simpleSwap.on(
    "Swap",
    async (tokenIn, tokenOut, amountIn, amountOut, to, event) => {
      console.log("Swap event detected:", {
        tokenIn,
        tokenOut,
        amountIn: ethers.utils.formatEther(amountIn),
        amountOut: ethers.utils.formatEther(amountOut),
        to,
      });

      // Only process if wallet is connected
      if (!userAddress) {
        console.log("Skipping swap event - no wallet connected");
        return;
      }

      // Determine token names based on addresses
      const tokenInName =
        tokenIn.toLowerCase() === CONTRACT_ADDRESSES.TOKEN_A.toLowerCase()
          ? "Token A"
          : "Token B";
      const tokenOutName =
        tokenOut.toLowerCase() === CONTRACT_ADDRESSES.TOKEN_A.toLowerCase()
          ? "Token A"
          : "Token B";

      // Add interaction record for the swap
      const amountInFormatted = parseFloat(
        ethers.utils.formatEther(amountIn)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountOutFormatted = parseFloat(
        ethers.utils.formatEther(amountOut)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        to,
        "swap",
        "",
        `${amountInFormatted} ${tokenInName} → ${amountOutFormatted} ${tokenOutName}`,
        event.transactionHash
      );

      // Auto-update data when swap occurs
      await updateData();
      await updateBalances();

      // Show notification for user's swaps
      if (to.toLowerCase() === userAddress.toLowerCase()) {
        showNotification("Swap completed successfully!", "success");
      }
    }
  );

  // Listen for LiquidityAdded events
  contracts.simpleSwap.on(
    "LiquidityAdded",
    async (tokenA, tokenB, amountA, amountB, liquidity, event) => {
      console.log("LiquidityAdded event detected:", {
        tokenA,
        tokenB,
        amountA: ethers.utils.formatEther(amountA),
        amountB: ethers.utils.formatEther(amountB),
        liquidity: ethers.utils.formatEther(liquidity),
      });

      // Only process if wallet is connected
      if (!userAddress) {
        console.log("Skipping liquidity added event - no wallet connected");
        return;
      }

      // Add interaction record for liquidity addition
      const amountAFormatted = parseFloat(
        ethers.utils.formatEther(amountA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountBFormatted = parseFloat(
        ethers.utils.formatEther(amountB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        userAddress,
        "add-liquidity",
        "",
        `${amountAFormatted} Token A + ${amountBFormatted} Token B`,
        event.transactionHash
      );

      // Auto-update LP supply and data
      await forceUpdateLPSupply();
      await updateData();
      await updateBalances();
    }
  );

  // Listen for LiquidityRemoved events
  contracts.simpleSwap.on(
    "LiquidityRemoved",
    async (tokenA, tokenB, amountA, amountB, liquidity, event) => {
      console.log("LiquidityRemoved event detected:", {
        tokenA,
        tokenB,
        amountA: ethers.utils.formatEther(amountA),
        amountB: ethers.utils.formatEther(amountB),
        liquidity: ethers.utils.formatEther(liquidity),
      });

      // Only process if wallet is connected
      if (!userAddress) {
        console.log("Skipping liquidity removed event - no wallet connected");
        return;
      }

      // Add interaction record for liquidity removal
      const liquidityFormatted = parseFloat(
        ethers.utils.formatEther(liquidity)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountAFormatted = parseFloat(
        ethers.utils.formatEther(amountA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountBFormatted = parseFloat(
        ethers.utils.formatEther(amountB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        userAddress,
        "remove-liquidity",
        "",
        `${liquidityFormatted} LP → ${amountAFormatted} Token A + ${amountBFormatted} Token B`,
        event.transactionHash
      );

      // Auto-update LP supply and data
      await forceUpdateLPSupply();
      await updateData();
      await updateBalances();
    }
  );
}

/**
 * Cleans up contract event listeners
 * @returns {void}
 */
function cleanupContractEventListeners() {
  if (!contracts.simpleSwap) return;

  console.log("Cleaning up contract event listeners...");

  // Remove all listeners
  contracts.simpleSwap.removeAllListeners("Swap");
  contracts.simpleSwap.removeAllListeners("LiquidityAdded");
  contracts.simpleSwap.removeAllListeners("LiquidityRemoved");
}

/**
 * Fetches and displays recent contract events
 * @param {number} fromBlock - Starting block number
 * @param {number} toBlock - Ending block number (optional)
 * @returns {Promise<void>}
 */
async function fetchRecentEvents(fromBlock = 0, toBlock = "latest") {
  if (!contracts.simpleSwap) return;

  try {
    console.log("Fetching recent contract events...");

    // Get recent Swap events
    const swapEvents = await contracts.simpleSwap.queryFilter(
      contracts.simpleSwap.filters.Swap(),
      fromBlock,
      toBlock
    );

    // Get recent LiquidityAdded events
    const liquidityAddedEvents = await contracts.simpleSwap.queryFilter(
      contracts.simpleSwap.filters.LiquidityAdded(),
      fromBlock,
      toBlock
    );

    // Get recent LiquidityRemoved events
    const liquidityRemovedEvents = await contracts.simpleSwap.queryFilter(
      contracts.simpleSwap.filters.LiquidityRemoved(),
      fromBlock,
      toBlock
    );

    console.log("Recent events found:", {
      swaps: swapEvents.length,
      liquidityAdded: liquidityAddedEvents.length,
      liquidityRemoved: liquidityRemovedEvents.length,
    });

    // Process events and add to interactions
    swapEvents.forEach((event) => {
      const { tokenIn, tokenOut, amountIn, amountOut, to } = event.args;

      // Determine token names based on addresses
      const tokenInName =
        tokenIn.toLowerCase() === CONTRACT_ADDRESSES.TOKEN_A.toLowerCase()
          ? "Token A"
          : "Token B";
      const tokenOutName =
        tokenOut.toLowerCase() === CONTRACT_ADDRESSES.TOKEN_A.toLowerCase()
          ? "Token A"
          : "Token B";

      const amountInFormatted = parseFloat(
        ethers.utils.formatEther(amountIn)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountOutFormatted = parseFloat(
        ethers.utils.formatEther(amountOut)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        to,
        "swap",
        "",
        `${amountInFormatted} ${tokenInName} → ${amountOutFormatted} ${tokenOutName}`,
        event.transactionHash
      );
    });

    liquidityAddedEvents.forEach((event) => {
      const { tokenA, tokenB, amountA, amountB, liquidity } = event.args;
      const amountAFormatted = parseFloat(
        ethers.utils.formatEther(amountA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountBFormatted = parseFloat(
        ethers.utils.formatEther(amountB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        userAddress,
        "add-liquidity",
        "",
        `${amountAFormatted} Token A + ${amountBFormatted} Token B`,
        event.transactionHash
      );
    });

    liquidityRemovedEvents.forEach((event) => {
      const { tokenA, tokenB, amountA, amountB, liquidity } = event.args;
      const liquidityFormatted = parseFloat(
        ethers.utils.formatEther(liquidity)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountAFormatted = parseFloat(
        ethers.utils.formatEther(amountA)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const amountBFormatted = parseFloat(
        ethers.utils.formatEther(amountB)
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      addWalletInteraction(
        userAddress,
        "remove-liquidity",
        "",
        `${liquidityFormatted} LP → ${amountAFormatted} Token A + ${amountBFormatted} Token B`,
        event.transactionHash
      );
    });

    showNotification("Event history loaded successfully", "success");
  } catch (error) {
    console.error("Error fetching recent events:", error);
    showNotification("Error loading event history", "error");
  }
}

// ===== 14. ENTRY POINT =====

/**
 * Initialize when DOM is ready
 */
document.addEventListener("DOMContentLoaded", initialize);

// ===== 14. GLOBAL EXPOSURE =====

/**
 * Expose functions to global scope for HTML usage
 */
window.swapTokenAddress = swapAddress;
window.closeNotification = closeNotification;
window.calculateRealPrices = calculateRealPrices;
window.forceUpdateLPSupply = forceUpdateLPSupply;
