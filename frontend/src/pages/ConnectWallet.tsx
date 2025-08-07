import React, { useState } from 'react';
import { Wallet, Shield, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'available' | 'coming-soon' | 'installed' | 'not-installed';
}

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const walletOptions: WalletOption[] = [
    {
      id: 'freighter',
      name: 'Freighter',
      icon: '🌟',
      description: 'The most popular Stellar wallet extension',
      status: typeof window !== 'undefined' && (window as any).freighter ? 'installed' : 'not-installed'
    },
    {
      id: 'stellar-wallets',
      name: 'Stellar Wallets',
      icon: '⭐',
      description: 'Connect via Stellar wallet ecosystem',
      status: 'available'
    },
    {
      id: 'albedo',
      name: 'Albedo',
      icon: '🔷',
      description: 'Browser-based Stellar wallet',
      status: 'available'
    },
    {
      id: 'rabet',
      name: 'Rabet',
      icon: '🦊',
      description: 'Stellar wallet with advanced features',
      status: 'coming-soon'
    }
  ];

  const handleConnectWallet = async (walletId: string) => {
    setIsConnecting(walletId);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (walletId === 'freighter') {
        // Check if Freighter is installed
        if (typeof window !== 'undefined' && (window as any).freighter) {
          // Simulate successful connection
          setConnectedWallet(walletId);
          toast({
            title: "Wallet Connected!",
            description: "Freighter wallet connected successfully.",
          });
          
          // Redirect to onboarding after short delay
          setTimeout(() => {
            router.push('/onboarding');
          }, 1500);
        } else {
          toast({
            title: "Freighter Not Installed",
            description: "Please install Freighter extension first.",
            variant: "destructive",
          });
        }
      } else {
        // For demo purposes, show success for other wallets
        setConnectedWallet(walletId);
        toast({
          title: "Wallet Connected!",
          description: `${walletOptions.find(w => w.id === walletId)?.name} connected successfully.`,
        });
        
        setTimeout(() => {
          router.push('/onboarding');
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(null);
    }
  };

  const WalletCard = ({ wallet }: { wallet: WalletOption }) => {
    const isWalletConnecting = isConnecting === wallet.id;
    const isConnected = connectedWallet === wallet.id;
    const isDisabled = wallet.status === 'coming-soon' || isWalletConnecting;

    return (
      <Card className={`shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
        isConnected ? 'border-green-200 bg-green-50' : 'border-transparent hover:border-primary/20'
      } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={() => !isDisabled && handleConnectWallet(wallet.id)}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{wallet.icon}</span>
              <div>
                <h3 className="font-semibold">{wallet.name}</h3>
                <p className="text-sm text-muted-foreground">{wallet.description}</p>
              </div>
            </div>
            {wallet.status === 'not-installed' && (
              <Badge variant="outline" className="text-xs">Not Installed</Badge>
            )}
            {wallet.status === 'coming-soon' && (
              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
            )}
            {isConnected && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {isWalletConnecting && (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            )}
          </div>
          
          {wallet.id === 'freighter' && wallet.status === 'not-installed' && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 mb-2">Freighter extension required</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://freighter.app/', '_blank');
                }}
                className="text-xs"
              >
                Install Freighter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Block-GST</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Connect Your Stellar Wallet</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your preferred Stellar wallet to get started with Block-GST. Your wallet will be used to sign transactions and manage your GST invoices securely.
          </p>
        </div>

        {/* Security Notice */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Your Security is Our Priority</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>We never store your private keys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>All transactions are signed locally in your wallet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Open source and audited smart contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {walletOptions.map(wallet => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>

        {/* What Happens Next */}
        <Card className="shadow-card border-0 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              What Happens Next?
            </CardTitle>
            <CardDescription>
              After connecting your wallet, you'll be guided through the setup process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                1
              </div>
              <span className="text-sm">Choose your role (Seller, Buyer, or GST Officer)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                2
              </div>
              <span className="text-sm">Register your GSTIN and business details</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                3
              </div>
              <span className="text-sm">Start creating and verifying invoices</span>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Don't have a Stellar wallet yet?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://freighter.app/', '_blank')}
            >
              Download Freighter
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://stellarwallets.com/', '_blank')}
            >
              Explore Other Wallets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
