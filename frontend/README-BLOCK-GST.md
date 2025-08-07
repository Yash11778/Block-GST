# Block-GST Frontend

A decentralized GST invoice verification system built with Next.js, TypeScript, and Stellar blockchain integration.

## 🚀 Features

### Complete Website Flow
- **Landing Page**: Professional homepage with feature overview and CTA
- **Wallet Connection**: Multi-wallet support (Freighter, Stellar Wallets, etc.)
- **User Onboarding**: Role-based registration (Seller, Buyer, GST Officer)
- **Dashboard**: Role-specific dashboard with GST invoice management
- **Invoice Management**: Create, verify, and track GST invoices
- **QR Code System**: Generate and scan QR codes for invoice verification
- **Payment Flow**: XLM (Stellar) payment integration
- **Transaction History**: Complete audit trail of all transactions

### User Roles
1. **Seller**: Create invoices, generate QR codes, track payments
2. **Buyer**: Scan QR codes, verify invoices, confirm transactions
3. **GST Officer**: Audit transactions, monitor compliance, generate reports

## 📁 Project Structure

```
frontend/
├── pages/                  # Next.js pages (routing)
│   ├── index.tsx          # Landing page
│   ├── connect-wallet.tsx # Wallet connection
│   ├── onboarding.tsx     # User registration
│   ├── dashboard.tsx      # Main dashboard
│   ├── upload.tsx         # Invoice upload
│   ├── verify.tsx         # QR verification
│   ├── payments.tsx       # Payment flow
│   ├── history.tsx        # Transaction history
│   └── wallet.tsx         # XLM wallet
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components
│   │   └── ui/           # UI components (shadcn/ui)
│   ├── pages/            # Page components
│   │   ├── Landing.tsx   # Landing page component
│   │   ├── ConnectWallet.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utilities
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **State Management**: React Query
- **Blockchain**: Stellar SDK (planned)
- **Wallet**: Freighter, Stellar Wallets

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Block-GST/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will run on `http://localhost:3001`

## 📱 User Flow

### 1. Landing Page (`/`)
- Hero section with project overview
- Features showcase
- Benefits for businesses
- "Get Started" CTA

### 2. Connect Wallet (`/connect-wallet`)
- Multiple wallet options
- Freighter wallet integration
- Security information
- Installation guides

### 3. Onboarding (`/onboarding`)
- Role selection (Seller/Buyer/Officer)
- Business registration form
- GSTIN validation
- Profile completion

### 4. Dashboard (`/dashboard`)
- Role-specific interface
- Invoice statistics
- Quick actions
- Recent transactions

### 5. Core Features
- **Upload Invoice** (`/upload`): Create and upload GST invoices
- **QR Verification** (`/verify`): Scan and verify invoice QR codes
- **Payments** (`/payments`): XLM payment processing
- **History** (`/history`): Transaction history and audit trail
- **Wallet** (`/wallet`): XLM wallet management

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup
The frontend is designed to work with:
- Stellar Testnet/Mainnet
- Freighter Wallet extension
- Soroban smart contracts (backend integration pending)

## 🎨 Design System

The project uses a consistent design system with:
- **Colors**: Primary blue gradient, semantic colors for status
- **Typography**: Clean, professional fonts
- **Components**: Consistent shadcn/ui components
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🔐 Security Features

- **Wallet Security**: No private key storage
- **Local Signing**: All transactions signed locally
- **HTTPS**: Secure communication
- **Input Validation**: Form validation and sanitization
- **GSTIN Validation**: Proper GSTIN format checking

## 🚧 Next Steps (Backend Integration)

1. **Stellar SDK Integration**: Connect to Stellar network
2. **Smart Contracts**: Deploy Soroban contracts
3. **Real Wallet Connection**: Implement actual wallet connectivity
4. **GSTIN API**: Integrate with GST systems
5. **Database**: Store user profiles and metadata
6. **APIs**: RESTful APIs for data management

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Homepage with features and CTA |
| Connect Wallet | `/connect-wallet` | Wallet connection flow |
| Onboarding | `/onboarding` | User registration and setup |
| Dashboard | `/dashboard` | Main application dashboard |
| Upload | `/upload` | Invoice creation and upload |
| Verify | `/verify` | QR code verification |
| Payments | `/payments` | XLM payment processing |
| History | `/history` | Transaction history |
| Wallet | `/wallet` | XLM wallet management |
| Settings | `/settings` | User settings |

## 🎯 Key Features Implemented

✅ **Complete Website Flow**  
✅ **Professional Landing Page**  
✅ **Multi-wallet Connection**  
✅ **Role-based Onboarding**  
✅ **Responsive Design**  
✅ **Modern UI/UX**  
✅ **QR Code Generation/Scanning**  
✅ **Payment Flow Simulation**  
✅ **Transaction History**  
✅ **Form Validation**  

## 📞 Support

For development support or questions:
1. Check the component documentation
2. Review the Next.js documentation
3. Check Stellar development docs for blockchain integration

---

**Block-GST** - Decentralized GST Invoice Verification System powered by Stellar Blockchain
