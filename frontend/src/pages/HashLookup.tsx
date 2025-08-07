import React, { useState } from 'react';
import { Hash, Search, CheckCircle, AlertCircle, FileText, Calendar, DollarSign, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface InvoiceData {
  hash: string;
  invoiceNumber: string;
  sellerGSTIN: string;
  sellerName: string;
  buyerName: string;
  amount: string;
  gstAmount: string;
  totalAmount: string;
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  status: 'verified' | 'pending' | 'invalid';
  blockchainTxId: string;
}

export default function HashLookup() {
  const [hashInput, setHashInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleHashSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hashInput.trim()) {
      toast({
        title: "Hash Required",
        description: "Please enter a valid blockchain hash.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError('');
    setInvoiceData(null);

    try {
      // Simulate Soroban contract call to fetch invoice data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response (in real app, this would call Soroban)
      const mockInvoiceData: InvoiceData = {
        hash: hashInput,
        invoiceNumber: 'INV-2024-001',
        sellerGSTIN: '29ABCDE1234F1Z5',
        sellerName: 'Tech Solutions Pvt Ltd',
        buyerName: 'Digital Innovations Inc',
        amount: '100,000.00',
        gstAmount: '18,000.00',
        totalAmount: '118,000.00',
        date: '2024-01-15',
        dueDate: '2024-02-15',
        items: [
          {
            description: 'Software Development Services',
            quantity: 1,
            rate: 100000,
            amount: 100000
          }
        ],
        status: 'verified',
        blockchainTxId: 'TXN_ABC123XYZ789'
      };

      setInvoiceData(mockInvoiceData);
      
      toast({
        title: "Invoice Found!",
        description: "Successfully retrieved invoice data from blockchain.",
      });

    } catch (err) {
      setError('Failed to fetch invoice data. Please check the hash and try again.');
      toast({
        title: "Lookup Failed",
        description: "Unable to fetch invoice data from the provided hash.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'invalid': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Invoice Hash Lookup</h1>
        <p className="text-muted-foreground">
          Enter blockchain hash to fetch and verify invoice details using Soroban smart contracts
        </p>
      </div>

      {/* Hash Input Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Blockchain Hash Input
          </CardTitle>
          <CardDescription>
            Enter the blockchain hash to retrieve invoice data from Stellar network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleHashSubmit} className="space-y-4">
            <div>
              <Label htmlFor="hash">Blockchain Hash</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="hash"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Enter blockchain hash (e.g., 0x1234abcd...)"
                  className="font-mono text-sm"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !hashInput.trim()}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Lookup
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {error && (
            <div className="flex items-center gap-2 p-3 mt-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Data Display */}
      {invoiceData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Header */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Invoice Details
                  </div>
                  <Badge className={getStatusColor(invoiceData.status)}>
                    {invoiceData.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Invoice Number</Label>
                    <p className="font-semibold">{invoiceData.invoiceNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Invoice Date</Label>
                    <p className="font-semibold">{invoiceData.date}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Due Date</Label>
                    <p className="font-semibold">{invoiceData.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Blockchain TX ID</Label>
                    <p className="font-mono text-sm text-primary">{invoiceData.blockchainTxId}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Seller Information</Label>
                    <div className="mt-1">
                      <p className="font-semibold">{invoiceData.sellerName}</p>
                      <p className="text-sm text-muted-foreground">GSTIN: {invoiceData.sellerGSTIN}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Buyer Information</Label>
                    <div className="mt-1">
                      <p className="font-semibold">{invoiceData.buyerName}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Rate</th>
                        <th className="text-right py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3">{item.description}</td>
                          <td className="text-right py-3">{item.quantity}</td>
                          <td className="text-right py-3">₹{item.rate.toLocaleString()}</td>
                          <td className="text-right py-3 font-semibold">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amount Summary */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Amount Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{invoiceData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span className="font-semibold">₹{invoiceData.gstAmount}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{invoiceData.totalAmount}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Blockchain Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Verified on Stellar</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Hash: <span className="font-mono text-xs">{invoiceData.hash}</span></p>
                  <p>Status: Immutable record confirmed</p>
                  <p>Network: Stellar Mainnet</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Sample Hashes for Demo */}
      <Card className="shadow-card border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">Demo Hashes</CardTitle>
          <CardDescription>Use these sample hashes for testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              '0x1234abcd5678efgh',
              '0xabcd1234efgh5678',
              '0x5678efgh1234abcd'
            ].map((hash) => (
              <Button
                key={hash}
                variant="outline"
                size="sm"
                onClick={() => setHashInput(hash)}
                className="font-mono text-xs"
              >
                {hash}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
