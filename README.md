# SimpleSwap DEX

A decentralized exchange (DEX) implementation built on Ethereum that enables seamless token swapping and liquidity provision using an Automated Market Maker (AMM) with constant product formula.

| **Component**           | **Links**                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Live Frontend**       | [https://simpleswap-dex-dapp.vercel.app/](https://simpleswap-dex-dapp.vercel.app/)                                            |
| **SimpleSwap Contract** | [0x957d727337297b649AE8df9Cad0b157cf04C3224](https://sepolia.etherscan.io/address/0x957d727337297b649AE8df9Cad0b157cf04C3224) |
| **Token A Contract**    | [0xCDBDDA06C8b9dF27a8502e57C8614d4EfAc5ED76](https://sepolia.etherscan.io/address/0xCDBDDA06C8b9dF27a8502e57C8614d4EfAc5ED76) |
| **Token B Contract**    | [0x11d6A5B61eE830b97C88b4Fc26849274517DfF94](https://sepolia.etherscan.io/address/0x11d6A5B61eE830b97C88b4Fc26849274517DfF94) |

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [How to Use](#how-to-use)
3. [Deployment Instructions](#deployment-instructions)
4. [Smart Contract Documentation](#smart-contract-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [Test Documentation](#test-documentation)
7. [Coverage Analysis](#coverage-analysis)
8. [Error Handling](#error-handling)

---

## Project Overview

SimpleSwap is a decentralized exchange (DEX) implementation built on Ethereum that provides:

- **Automated Market Maker (AMM)** functionality using constant product formula (`x * y = k`)
- **Liquidity Provision** with LP token rewards for liquidity providers
- **Token Swapping** with real-time price calculations and slippage protection
- **ERC20 Token Management** with minting capabilities for testing
- **Modern Web3 Frontend** with MetaMask integration and responsive design
- **Event-Driven Architecture** with real-time blockchain event monitoring
- **Advanced Interaction Tracking** with duplicate prevention and localStorage persistence

### Key Features

- **Constant Product Formula**: Implements `x * y = k` for automatic price discovery
- **LP Token System**: Mint/burn LP tokens representing liquidity pool shares
- **Slippage Protection**: Minimum amount guarantees for all operations
- **Deadline Protection**: Transaction expiration timestamps prevent stale trades
- **Token Sorting**: Consistent token pair ordering prevents duplicate pools
- **Comprehensive Testing**: Function coverage with edge cases and access control
- **Real-Time Event Monitoring**: Automatic detection of swaps and liquidity operations
- **Smart Interaction Management**: Duplicate prevention and wallet-specific history

---

## How to Use

### 1. Connect Your Wallet

- Click "Connect MetaMask" in the top navigation
- Approve the connection request in your wallet
- Ensure you're on Sepolia testnet

### 2. Get Test Tokens

- Click "Mint 1000 Token A"
- Confirm the transaction in MetaMask
- "Mint 1000 Token B"
- Confirm the transaction in MetaMask
- Your balance will update automatically

### 3. Approve Tokens

- Click "Approve All Tokens" to enable add liquidity and swapping
- This allows the DEX to spend your tokens

### 4. Add Liquidity

- Enter amounts for both Token A and Token B
- Click "Add Liquidity" to receive LP tokens

### 5. Swap Tokens

- Enter the amount you want to swap
- Select source and destination tokens
- Review the exchange rate and expected output
- Click "Execute Swap" and confirm transaction

### 6. Remove Liquidity

- Enter the amount of LP tokens to remove
- Preview shows the tokens you'll receive
- Click "Remove Liquidity" to get back your tokens

### 7. View Wallet Interactions

- **Real-Time Tracking**: All transactions are automatically detected and displayed
- **Transaction Details**: View amounts, timestamps, and Etherscan links
- **Duplicate Prevention**: System automatically prevents duplicate entries

---

## Deployment Instructions

### Clone repository

```bash
git clone git@github.com:IvanSarapura/SimpleSwapDApp.git
```

### Prerequisites

```bash
npm install
```

### Compilation

```bash
npx hardhat compile
```

### Testing

```bash
npx hardhat test
npx hardhat coverage
```

---

## Smart Contract Documentation

### Architecture Overview

The project consists of three main smart contracts:

1. **SimpleSwap.sol** - Main DEX contract with AMM functionality
2. **TokenA.sol** - ERC20 token for testing and liquidity provision
3. **TokenB.sol** - ERC20 token for testing and liquidity provision

### SimpleSwap Contract

**Network**: Sepolia Testnet | **Compiler**: Solidity ^0.8.28 | **License**: MIT

#### Core Functions

| Function                     | Description                       | Gas Usage     |
| ---------------------------- | --------------------------------- | ------------- |
| `addLiquidity()`             | Adds liquidity to token pair      | ~179,282      |
| `removeLiquidity()`          | Removes liquidity from token pair | ~64,513       |
| `swapExactTokensForTokens()` | Swaps exact input tokens          | ~69,405       |
| `getAmountOut()`             | Calculates output amount          | View Function |
| `getReserves()`              | Returns current reserves          | View Function |
| `getPrice()`                 | Returns current token price       | View Function |

#### Contract Events

| Event              | Parameters                                    | Description                       |
| ------------------ | --------------------------------------------- | --------------------------------- |
| `Swap`             | `tokenIn, tokenOut, amountIn, amountOut, to`  | Emitted when tokens are swapped   |
| `LiquidityAdded`   | `tokenA, tokenB, amountA, amountB, liquidity` | Emitted when liquidity is added   |
| `LiquidityRemoved` | `tokenA, tokenB, amountA, amountB, liquidity` | Emitted when liquidity is removed |

#### Key Implementation Details

- **Liquidity Calculation**: `sqrt(amountA * amountB)` for initial liquidity
- **Swap Calculation**: `amountOut = (amountIn * reserveOut) / (reserveIn + amountIn)`
- **Price Calculation**: `price = (reserveB * 10^18) / reserveA`

**Security Features**:

- Zero address validation
- Same token prevention
- Deadline validation
- Slippage protection with minimum amounts
- Token sorting for consistent pair ordering

### Token Contracts (TokenA & TokenB)

**Properties**:

- **Initial Supply**: 1,000,000 tokens each
- **Symbols**: "TACC" and "TBCC"
- **Decimals**: 18
- **Mintable**: Yes (owner only)

**Key Functions**:

- `mint(address to, uint256 amount)` - Owner-only minting
- Standard ERC20 functions (transfer, approve, etc.)

---

## Frontend Documentation

### Technology Stack

| Component      | Technology         | Version |
| -------------- | ------------------ | ------- |
| **Frontend**   | Vanilla JavaScript | ES6+    |
| **Blockchain** | Ethers.js          | v5.7.2  |
| **Styling**    | Custom CSS         | -       |
| **Wallet**     | MetaMask           | Latest  |

### Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete styling system
├── script.js           # Core application logic
└── contracts/          # Smart contract files
```

### Key Features

#### Core Functionality

- **Wallet Integration**: MetaMask connection and account management
- **Token Operations**: Minting, approval, and balance tracking
- **DEX Operations**: Swapping and liquidity management
- **Price Display**: Real-time price feeds and reserve information
- **Responsive Design**: Mobile-first approach with modern UI
- **Event-Driven Architecture**: Real-time blockchain event monitoring
- **Advanced Interaction Management**: Smart duplicate prevention and localStorage persistence
- **Data Management**: Fresh blockchain reads with cache clearing for accurate data

#### User Experience

- **Loading States**: Visual feedback during transactions
- **Error Handling**: Comprehensive error messages and recovery guidance
- **Real-time Updates**: Automatic balance and price updates
- **Transaction History**: Complete wallet interaction tracking with Etherscan links
- **Data Persistence**: Interactions saved per wallet address in localStorage
- **Cache Management**: Fresh blockchain reads to ensure data accuracy
- **24-Hour Time Format**: All timestamps displayed in 24-hour format

### Event-Driven System

The application implements an event-driven architecture that automatically detects and tracks all blockchain interactions:

#### Event Listener Setup

```javascript
// Automatic event listener setup on wallet connection
setupContractEventListeners();

// Event listener cleanup on wallet disconnect
cleanupContractEventListeners();

// Fetch historical events from blockchain
fetchRecentEvents(fromBlock, toBlock);
```

#### Supported Events

| Event Type           | Contract Event     | Description           |
| -------------------- | ------------------ | --------------------- |
| **Swap**             | `Swap`             | Token swap operations |
| **Add Liquidity**    | `LiquidityAdded`   | Liquidity provision   |
| **Remove Liquidity** | `LiquidityRemoved` | Liquidity removal     |

#### Smart Event Processing

**Duplicate Prevention**:

- Transaction hash-based duplicate detection
- Wallet connection verification before processing
- Automatic cleanup on disconnect

**Real-Time Features**:

- Automatic interaction recording
- Real-time UI updates
- Balance and data refresh on events
- Notification system for user transactions

#### Historical Event Loading

```javascript
// Load recent events from blockchain
fetchRecentEvents(fromBlock, toBlock);

// Manual event history loading via UI
// Click "Load Event History" button
```

**Features**:

- Configurable block range (default: last 1000 blocks)
- Automatic interaction population
- Error handling and user feedback
- Loading states and progress indicators

### Interaction Display Format

The system displays interactions in a structured format with proper token names:

**Swap Operations**:

```
From:   1,000.00 Token A
To:     1,050.00 Token B
```

**Add Liquidity**:

```
From:   1,000.00 Token A
        1,000.00 Token B
To:     LP
```

**Remove Liquidity**:

```
From:   1,638.96 LP
To:     1,678.59 Token A
        1,600.26 Token B
```

### Time Format

All timestamps are displayed in **24-hour format** for better readability:

- **Format**: `MM/DD/YYYY, HH:MM:SS`
- **Example**: `12/15/2023, 14:30:45`

### Blockchain Integration Functions

#### Wallet Management

- `connect()`: Initializes Web3Provider with MetaMask, creates contract instances, sets up event listeners
- `disconnect()`: Resets global variables, clears UI state, disconnects from blockchain, cleans up event listeners
- `updateBalances()`: Fetches token balances (TokenA, TokenB, LP) from contracts and updates UI display

#### Swap Operations

- `calculateSwap()`: Real-time price calculation using `getReserves()` and `getAmountOut()` from SimpleSwap contract
- `checkApproval()`: Validates token allowance against SimpleSwap contract before swaps
- `approveToken()`: Approves specific token amount for SimpleSwap contract spending
- `executeSwap()`: Executes `swapExactTokensForTokens()` with **⚠️ No slippage protection** (uses `amountOutMin = 0`)
- `swapAddress()`: UI function to reverse token selection direction

#### Liquidity Operations

- `addLiquidity()`: Calls `addLiquidity()` contract function with 5% slippage protection, validates positive amounts
- `removeLiquidity()`: Calls `removeLiquidity()` contract function with 5% slippage protection, validates LP token balance
- `calculateRemoveLiquidityPreview()`: Estimates withdrawal amounts using pool reserves and total supply (view only)
- `autofillLiquidityFields()`: Automatically calculates optimal token ratios based on current pool reserves

#### Token Management

- `mintTokenA()/mintTokenB()`: Calls `mint()` function to mint 1000 tokens (owner only), updates UI with loading states
- `approveAllTokens()`: Sets maximum allowance (`MaxUint256`) for both tokens to SimpleSwap contract

#### Wallet Interactions System

- `addWalletInteraction()`: Records wallet interactions with timestamps, transaction hashes, and formatted amounts with duplicate prevention
- `updateInteractionsDisplay()`: Renders interaction history with action badges, wallet addresses, and Etherscan links
- `saveInteractionsToStorage()`: Persists interactions in localStorage per wallet address
- `loadInteractionsFromStorage()`: Loads interaction history when wallet connects
- `fetchRecentEvents()`: Loads historical blockchain events to populate interaction history
- Supports up to 50 interactions with automatic cleanup and localStorage persistence

#### Data Update Functions

- `updateData()`: Fetches current reserves using `getReserves()`, calculates and displays exchange rates, calls `updateLPSupply()` for LP token supply
- `updateLPSupply()`: Fetches LP token supply using `totalSupply()` function with fresh blockchain reads to avoid cache issues
- `forceUpdateLPSupply()`: Forces complete refresh of LP supply data with cache clearing
- `calculateRealPrices()`: Calculates accurate prices using `getAmountOut()` for 1 token standard amounts
- Real-time data updates in navigation bar showing Token A to Token B ratio

#### Contract Interaction Map

**Core Contract Calls**:

- `SimpleSwap`: `getReserves()`, `getAmountOut()`, `swapExactTokensForTokens()`, `addLiquidity()`, `removeLiquidity()`, `balanceOf()`, `totalSupply()`
- `TokenA/TokenB`: `balanceOf()`, `allowance()`, `approve()`, `mint()`

**Event Monitoring**:

- `Swap`: Real-time swap event detection with automatic interaction recording
- `LiquidityAdded`: Automatic liquidity addition tracking
- `LiquidityRemoved`: Automatic liquidity removal tracking

**Utility Functions**:

- `showLoading()` / `hideLoading()`: Visual feedback during transactions
- `showNotification()`: Toast notifications with auto-hide and multiple types (success, error, info, warning)
- `closeNotification()`: Manual notification dismissal

**Transaction Flow**:

1. **User Input** → Basic validation (amount > 0, sufficient balance)
2. **Approval Check** → `allowance()` vs required amount
3. **Contract Call** → Direct smart contract interaction with proper parameters
4. **Transaction Wait** → `await tx.wait()` for confirmation
5. **Event Detection** → Automatic event listener processing
6. **UI Update** → Balance refresh, notification display, loading state management

**Error Handling**:

- MetaMask detection and connection errors
- Transaction rejection handling
- Contract revert messages display
- Network validation and switching
- Insufficient balance and allowance errors
- Event listener cleanup and error recovery

---

## Test Documentation

### Test Framework

- **Framework**: Hardhat + Chai
- **Language**: JavaScript
- **Coverage**: solidity-coverage
- **Network**: Hardhat Network

### Test Folder Structure

```
test/
├── SimpleSwapTest.js        # Core DEX functionality tests
└── TokensTest.js            # Token contract access control tests
```

#### SimpleSwapTest.js

**Primary test file covering complete SimpleSwap contract functionality**

**Test Categories**:

- **Input Validation Tests** (3 tests)

  - Zero amount validation in `getAmountOut()`
  - Invalid reserves handling
  - Same token prevention in `addLiquidity()`

- **Core Functionality Tests** (5 tests)

  - LP token minting via `addLiquidity()`
  - Price calculations using `getPrice()`
  - Token swapping with `swapExactTokensForTokens()`
  - Liquidity removal with `removeLiquidity()`
  - Reserve tracking via `getReserves()`

- **Edge Case Tests** (15 tests)
  - No liquidity scenarios
  - Insufficient amount validations
  - Deadline expiration (3 scenarios)
  - Zero address validation (4 scenarios)
  - Slippage protection testing
  - Invalid path validation
  - Zero liquidity prevention

#### TokensTest.js

**Access control tests for token contracts**

**Test Categories**:

- **Access Control Tests** (2 tests)
  - TokenA mint function - owner-only access with `OwnableUnauthorizedAccount` error
  - TokenB mint function - owner-only access with `OwnableUnauthorizedAccount` error

### Test Coverage Overview

| Test Category          | Count  | Description                                       |
| ---------------------- | ------ | ------------------------------------------------- |
| **Input Validation**   | 3      | Zero amounts, invalid reserves, same tokens       |
| **Core Functionality** | 5      | Add/remove liquidity, swap, price calculation     |
| **Edge Cases**         | 15     | Insufficient amounts, expired deadlines, slippage |
| **Access Control**     | 2      | Owner-only functions, permission validation       |
| **Total**              | **25** | **Complete test coverage**                        |

### Key Test Scenarios

**Core Functionality**:

- ✓ Add liquidity and mint LP tokens
- ✓ Remove liquidity and burn LP tokens
- ✓ Execute token swaps with proper price calculation
- ✓ Calculate exchange rates and reserves

**Edge Cases**:

- ✓ Handle insufficient liquidity scenarios
- ✓ Validate slippage protection mechanisms
- ✓ Test deadline expiration handling
- ✓ Verify zero address validation

**Security Tests**:

- ✓ Owner-only mint function access control
- ✓ Proper error handling for invalid inputs

---

## Coverage Analysis

### Coverage Summary

```bash
File             |  % Stmts | % Branch |  % Funcs |  % Lines |
-----------------|----------|----------|----------|----------|
contracts/       |    98.65 |    87.88 |      100 |    95.83 |
SimpleSwap.sol   |    98.57 |    87.10 |      100 |    95.65 |
TokenA.sol       |      100 |      100 |      100 |      100 |
TokenB.sol       |      100 |      100 |      100 |      100 |
-----------------|----------|----------|----------|----------|
All files        |    98.65 |    87.88 |      100 |    95.83 |
-----------------|----------|----------|----------|----------|
```

### Gas Usage Analysis

#### Average Gas Costs

```bash
| Contract / Method          | Min Gas | Max Gas | Avg Gas | # Calls | Description                  |
| -------------------------- | ------- | ------- | ------- | ------- | ---------------------------- |
| **SimpleSwap**             |         |         |         |         |                              |
| `addLiquidity`             | 82,480  | 196,896 | 179,282 | 13      | Add liquidity to token pairs |
| `approve`                  | -       | -       | 46,012  | 1       | Approve LP token spending    |
| `removeLiquidity`          | -       | -       | 64,513  | 1       | Remove liquidity from pairs  |
| `swapExactTokensForTokens` | -       | -       | 69,405  | 1       | Execute token swaps          |
| **TokenA**                 |         |         |         |         |                              |
| `approve`                  | 45,962  | 45,974  | 45,970  | 20      | Approve token spending       |
| `mint`                     | -       | -       | 36,086  | 27      | Mint new tokens (owner only) |
| **TokenB**                 |         |         |         |         |                              |
| `approve`                  | 45,962  | 45,974  | 45,973  | 15      | Approve token spending       |
| `mint`                     | -       | -       | 36,086  | 27      | Mint new tokens (owner only) |
```

#### Deployment Costs

```bash
| Contract   | Gas Cost  | % of Block Limit | Description       |
| ---------- | --------- | ---------------- | ----------------- |
| SimpleSwap | 1,419,056 | 4.7%             | Main DEX contract |
| TokenA     | 644,865   | 2.1%             | Test token A      |
| TokenB     | 644,865   | 2.1%             | Test token B      |
```

---

## Error Handling

Common errors that may occur when interacting with the contracts:

| Error Message                     | Cause                         | Solution                            |
| --------------------------------- | ----------------------------- | ----------------------------------- |
| `"Same token"`                    | Identical token addresses     | Use different token addresses       |
| `"Zero address"`                  | Using address(0)              | Provide valid token addresses       |
| `"Expired"`                       | Transaction deadline passed   | Use current timestamp + buffer      |
| `"Low amountA"` / `"Low amountB"` | Slippage protection triggered | Increase slippage tolerance         |
| `"No liquidity"`                  | Empty liquidity pool          | Add liquidity first                 |
| `"Low output"`                    | Swap output below minimum     | Adjust amountOutMin parameter       |
| `"Invalid path"`                  | Wrong path length             | Use exactly 2 addresses in path     |
| `"Low liquidity"`                 | Trying to mint zero LP tokens | Provide non-zero amounts            |
| `"Invalid reserves"`              | Pool reserves are zero        | Ensure pool is properly initialized |
| `"Zero amount"`                   | Input amount is zero          | Enter valid amount > 0              |

### Frontend-Specific Errors

| Error Type                   | Cause                                     | Solution                            |
| ---------------------------- | ----------------------------------------- | ----------------------------------- |
| **Event Listener Errors**    | Contract events not found in ABI          | Ensure events are included in ABI   |
| **Duplicate Interactions**   | Same transaction processed multiple times | Duplicate prevention system active  |
| **Wallet Connection Issues** | MetaMask not installed or wrong network   | Install MetaMask, switch to Sepolia |
| **Cache Issues**             | Stale blockchain data                     | Use "Update Data" button            |

---

_Developed as part of ETH KIPU Module 4_
