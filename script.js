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
  SLIPPAGE_TOLERANCE: 5, // 5%
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

  // Price display elements
  priceTokenA: document.getElementById("priceTokenA"),
  priceTokenB: document.getElementById("priceTokenB"),
  reserveTokenA: document.getElementById("reserveTokenA"),
  reserveTokenB: document.getElementById("reserveTokenB"),

  // Token management elements
  mintTokenA: document.getElementById("mintTokenA"),
  mintTokenB: document.getElementById("mintTokenB"),
  approveAllBtn: document.getElementById("approveAllBtn"),
  updatePricesBtn: document.getElementById("updatePricesBtn"),
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

  // Price update events
  if (elements.updatePricesBtn) {
    elements.updatePricesBtn.addEventListener("click", updatePrices);
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

      // Update balances and prices
      await updateBalances();
      await updatePrices();

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

  // Reset global variables
  provider = null;
  signer = null;
  userAddress = null;
  contracts = {};

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

    // Update balances and prices
    await updateBalances();
    await updatePrices();

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
 * Updates price displays and reserve information
 * @returns {Promise<void>}
 */
async function updatePrices() {
  if (!contracts.simpleSwap) return;

  try {
    console.log("Updating prices and reserves...");

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

    console.log("Prices updated successfully");
  } catch (error) {
    console.error("Error updating prices:", error);
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

    // Update balances and prices
    await updateBalances();
    await updatePrices();
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

    // Update balances and prices
    await updateBalances();
    await updatePrices();
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

// ===== 13. ENTRY POINT =====

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
