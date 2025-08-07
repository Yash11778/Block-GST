import React, { useState } from 'react';
import { Plus, Save, Building, Calculator, FileText, CheckCircle, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  gstRate: number;
  gstAmount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  buyerName: string;
  buyerAddress: string;
  buyerGSTIN?: string;
  sellerGSTIN: string;
  sellerName: string;
  sellerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  totalGST: number;
  total: number;
  notes?: string;
}

export default function CreateInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    buyerName: '',
    buyerAddress: '',
    buyerGSTIN: '',
    sellerGSTIN: '29ABCDE1234F1Z5', // From user profile
    sellerName: 'Tech Solutions Pvt Ltd', // From user profile
    sellerAddress: 'Mumbai, Maharashtra', // From user profile
    items: [],
    subtotal: 0,
    totalGST: 0,
    total: 0,
    notes: ''
  });

  const [currentItem, setCurrentItem] = useState<Partial<InvoiceItem>>({
    description: '',
    quantity: 1,
    rate: 0,
    gstRate: 18
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHash, setGeneratedHash] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const { toast } = useToast();

  const addItem = () => {
    if (!currentItem.description || !currentItem.rate) {
      toast({
        title: "Incomplete Item",
        description: "Please fill in description and rate.",
        variant: "destructive",
      });
      return;
    }

    const amount = (currentItem.quantity || 1) * (currentItem.rate || 0);
    const gstAmount = (amount * (currentItem.gstRate || 0)) / 100;

    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: currentItem.description || '',
      quantity: currentItem.quantity || 1,
      rate: currentItem.rate || 0,
      amount,
      gstRate: currentItem.gstRate || 18,
      gstAmount
    };

    const updatedItems = [...invoiceData.items, newItem];
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const totalGST = updatedItems.reduce((sum, item) => sum + item.gstAmount, 0);

    setInvoiceData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      totalGST,
      total: subtotal + totalGST
    }));

    setCurrentItem({
      description: '',
      quantity: 1,
      rate: 0,
      gstRate: 18
    });
  };

  const removeItem = (itemId: string) => {
    const updatedItems = invoiceData.items.filter(item => item.id !== itemId);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const totalGST = updatedItems.reduce((sum, item) => sum + item.gstAmount, 0);

    setInvoiceData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      totalGST,
      total: subtotal + totalGST
    }));
  };

  const generateInvoiceOnBlockchain = async () => {
    if (invoiceData.items.length === 0) {
      toast({
        title: "No Items",
        description: "Please add at least one item to the invoice.",
        variant: "destructive",
      });
      return;
    }

    if (!invoiceData.buyerName) {
      toast({
        title: "Missing Buyer Details",
        description: "Please enter buyer name.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate blockchain transaction via Soroban
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock hash (in real app, this comes from Soroban contract)
      const mockHash = `0x${Math.random().toString(16).substr(2, 16)}${Math.random().toString(16).substr(2, 16)}`;
      setGeneratedHash(mockHash);

      // Generate QR code URL (contains the hash)
      const qrData = JSON.stringify({
        hash: mockHash,
        invoiceNumber: invoiceData.invoiceNumber,
        amount: invoiceData.total,
        seller: invoiceData.sellerGSTIN,
        network: 'stellar-mainnet',  // Blockchain network
        contract: 'SOROBAN_GST_CONTRACT_ID'  // Smart contract address
      });
      
      // Mock QR code URL
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);

      toast({
        title: "Invoice Created Successfully!",
        description: "Invoice has been stored on Stellar blockchain via Soroban.",
      });

    } catch (error) {
      toast({
        title: "Blockchain Error",
        description: "Failed to store invoice on blockchain. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(generatedHash);
    toast({
      title: "Hash Copied!",
      description: "Blockchain hash copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
        <p className="text-muted-foreground">
          Create a new GST invoice and store it securely on Stellar blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Invoice Number</Label>
                  <Input
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label>Invoice Date</Label>
                  <Input
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Buyer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Buyer Name *</Label>
                  <Input
                    value={invoiceData.buyerName}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, buyerName: e.target.value }))}
                    placeholder="Company/Person Name"
                  />
                </div>
                <div>
                  <Label>Buyer GSTIN (Optional)</Label>
                  <Input
                    value={invoiceData.buyerGSTIN}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, buyerGSTIN: e.target.value }))}
                    placeholder="22ABCDE1234F1Z5"
                  />
                </div>
              </div>
              <div>
                <Label>Buyer Address</Label>
                <Textarea
                  value={invoiceData.buyerAddress}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, buyerAddress: e.target.value }))}
                  placeholder="Complete buyer address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Invoice Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Item Form */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Item description"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Quantity</Label>
                  <Input
                    type="number"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    min="1"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rate (₹)</Label>
                  <Input
                    type="number"
                    value={currentItem.rate}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, rate: Number(e.target.value) }))}
                    min="0"
                    step="0.01"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">GST %</Label>
                  <Select 
                    value={currentItem.gstRate?.toString()} 
                    onValueChange={(value) => setCurrentItem(prev => ({ ...prev, gstRate: Number(value) }))}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addItem} size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Items List */}
              {invoiceData.items.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Rate</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-right py-2">GST</th>
                        <th className="text-right py-2">Total</th>
                        <th className="text-center py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.description}</td>
                          <td className="text-right py-2">{item.quantity}</td>
                          <td className="text-right py-2">₹{item.rate.toLocaleString()}</td>
                          <td className="text-right py-2">₹{item.amount.toLocaleString()}</td>
                          <td className="text-right py-2">₹{item.gstAmount.toLocaleString()}</td>
                          <td className="text-right py-2 font-semibold">₹{(item.amount + item.gstAmount).toLocaleString()}</td>
                          <td className="text-center py-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              ×
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes or terms..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          {/* Amount Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Amount Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{invoiceData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total GST:</span>
                <span className="font-semibold">₹{invoiceData.totalGST.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{invoiceData.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Generate Invoice */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Blockchain Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={generateInvoiceOnBlockchain}
                disabled={isGenerating || invoiceData.items.length === 0}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Storing on Blockchain...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Create Invoice on Blockchain
                  </>
                )}
              </Button>

              {generatedHash && (
                <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Decentralized Invoice Created!</span>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-green-600">Blockchain Hash:</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 text-xs bg-white p-2 rounded border font-mono break-all">
                        {generatedHash}
                      </code>
                      <Button size="sm" variant="outline" onClick={copyHashToClipboard}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {qrCodeUrl && (
                    <div className="text-center">
                      <Label className="text-xs text-green-600">QR Code for Buyer:</Label>
                      <div className="mt-2">
                        <img 
                          src={qrCodeUrl} 
                          alt="Invoice QR Code" 
                          className="mx-auto border rounded"
                        />
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        🔗 Decentralized QR: Contains blockchain hash for trustless verification. No central servers needed!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Business Name</Label>
                  <p className="font-semibold">{invoiceData.sellerName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">GSTIN</Label>
                  <p className="font-mono">{invoiceData.sellerGSTIN}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Address</Label>
                  <p>{invoiceData.sellerAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
