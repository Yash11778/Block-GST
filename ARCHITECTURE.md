# Block-GST - Decentralized Architecture

## 🎯 Core Concept
Decentralized GST invoice system on Stellar blockchain using Soroban smart contracts.

## 🔗 User Flow
1. **Landing** (`/`) → Professional homepage
2. **Connect Wallet** (`/connect-wallet`) → Stellar wallet integration  
3. **Onboarding** (`/onboarding`) → Role selection (Seller/Buyer/Officer)
4. **Dashboard** (`/dashboard`) → Role-specific interface

## 📱 Essential Pages

### **Core Pages**:
- **Landing.tsx** - Entry point with features
- **ConnectWallet.tsx** - Stellar wallet connection
- **Onboarding.tsx** - Role-based registration
- **Dashboard.tsx** - Role detection & routing

### **Role Dashboards**:
- **SellerDashboard.tsx** - Invoice creation, stats
- **BuyerDashboard.tsx** - Verification, scanning
- **OfficerDashboard.tsx** - Compliance monitoring

### **Functional Pages**:
- **CreateInvoice.tsx** - Create & store on blockchain
- **QRScanner.tsx** - Camera scanning + hash extraction
- **HashLookup.tsx** - Manual hash verification

## 🛠 Technical Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI**: shadcn/ui components
- **Blockchain**: Stellar network + Soroban contracts
- **Wallet**: Freighter, XBULL, Rabet integration

## 🔒 Decentralized Features
- ✅ No central database
- ✅ Stellar blockchain storage
- ✅ Hash-based verification  
- ✅ QR codes with blockchain pointers
- ✅ Immutable audit trails
- ✅ Global access without permissions

## 📊 Navigation Structure
```
Dashboard
├── Create Invoice (Sellers)
├── QR Scanner (Universal)
└── Hash Lookup (Universal)
```

## 🎉 Complete Flow
```
Seller: Create Invoice → Blockchain Hash → QR Code
     ↓
Buyer: Scan QR → Extract Hash → Verify on Chain → Invoice Data
     ↓
Officer: Monitor → Audit Trails → Compliance Reports
```

All components optimized for decentralized GST compliance!
