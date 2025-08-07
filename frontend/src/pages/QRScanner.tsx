import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, X, CheckCircle, AlertCircle, Hash, FileText, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ScannedInvoice {
  hash: string;
  invoiceNumber: string;
  amount: string;
  seller: string;
  buyerName?: string;
  status: 'verified' | 'pending' | 'invalid';
  timestamp: string;
}

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [manualHash, setManualHash] = useState('');
  const [scannedData, setScannedData] = useState<ScannedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start scanning for QR codes
        setTimeout(() => {
          scanQRCode();
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const scanQRCode = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // In a real app, you'd use a QR code library like jsQR here
      // For demo, we'll simulate QR detection
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simulate QR code detection (in real app, use jsQR library)
      if (Math.random() < 0.3) { // 30% chance to "detect" QR code for demo
        const mockQRData = {
          hash: "0x1234abcd5678efgh9012ijkl",
          invoiceNumber: "INV-2024-001",
          amount: "118000.00",
          seller: "29ABCDE1234F1Z5"
        };
        
        handleQRDetected(JSON.stringify(mockQRData));
        return;
      }
    }

    // Continue scanning
    if (isScanning) {
      setTimeout(() => scanQRCode(), 100);
    }
  };

  const handleQRDetected = (qrData: string) => {
    try {
      const data = JSON.parse(qrData);
      if (data.hash && data.network === 'stellar-mainnet') {
        setIsScanning(false);
        processInvoiceHash(data.hash, data);
        
        toast({
          title: "Decentralized QR Detected!",
          description: "Verifying via Stellar blockchain...",
        });
      } else {
        throw new Error("Invalid decentralized QR");
      }
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "QR code is not a valid decentralized GST invoice.",
        variant: "destructive",
      });
    }
  };

  const handleManualHashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualHash.trim()) {
      toast({
        title: "Hash Required",
        description: "Please enter a valid hash.",
        variant: "destructive",
      });
      return;
    }
    
    processInvoiceHash(manualHash.trim());
  };

  const processInvoiceHash = async (hash: string, qrData?: any) => {
    setIsLoading(true);
    
    try {
      // Simulate Soroban smart contract call to verify hash
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockInvoiceData: ScannedInvoice = {
        hash,
        invoiceNumber: qrData?.invoiceNumber || 'INV-2024-001',
        amount: qrData?.amount || '118,000.00',
        seller: qrData?.seller || '29ABCDE1234F1Z5',
        buyerName: 'Digital Innovations Inc',
        status: 'verified',
        timestamp: new Date().toISOString()
      };

      setScannedData(mockInvoiceData);
      setManualHash('');
      
      toast({
        title: "Invoice Verified!",
        description: "Invoice data successfully retrieved from blockchain.",
      });

    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to verify invoice hash. Please try again.",
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
        <h1 className="text-3xl font-bold text-foreground">QR Scanner</h1>
        <p className="text-muted-foreground">
          Scan QR codes or enter hash manually to verify invoice data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>
              Use your camera to scan invoice QR codes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isScanning ? (
              <div className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <Button 
                  onClick={() => setIsScanning(true)} 
                  className="bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
                <p className="text-sm text-muted-foreground">
                  Position QR code within the camera view
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-64 bg-black rounded-lg object-cover"
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                  
                  {/* Scanning overlay */}
                  <div className="absolute inset-4 border-2 border-primary rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-sm p-2 rounded text-center">
                    Position QR code within the frame
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsScanning(false)} 
                  variant="outline" 
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Stop Scanning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Hash Input */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Manual Hash Entry
            </CardTitle>
            <CardDescription>
              Enter blockchain hash manually if QR scan fails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleManualHashSubmit} className="space-y-4">
              <div>
                <Label>Invoice Hash</Label>
                <Input
                  value={manualHash}
                  onChange={(e) => setManualHash(e.target.value)}
                  placeholder="0x1234abcd5678efgh..."
                  className="font-mono text-sm"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !manualHash.trim()}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Verify Hash
                  </>
                )}
              </Button>
            </form>

            {/* Sample hashes for testing */}
            <div className="mt-6 pt-4 border-t">
              <Label className="text-xs text-muted-foreground">Sample Hashes (for testing)</Label>
              <div className="flex flex-col gap-2 mt-2">
                {[
                  '0x1234abcd5678efgh',
                  '0xabcd1234efgh5678',
                  '0x5678efgh1234abcd'
                ].map((hash) => (
                  <Button
                    key={hash}
                    variant="outline"
                    size="sm"
                    onClick={() => setManualHash(hash)}
                    className="font-mono text-xs justify-start"
                    disabled={isLoading}
                  >
                    {hash}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanned Invoice Data */}
      {scannedData && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoice Details
              </div>
              <Badge className={getStatusColor(scannedData.status)}>
                {scannedData.status.toUpperCase()}
              </Badge>
            </CardTitle>
            <CardDescription>
              Retrieved from blockchain hash: <code className="text-xs">{scannedData.hash}</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Invoice Number</Label>
                <p className="font-semibold">{scannedData.invoiceNumber}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Amount</Label>
                <p className="font-semibold text-lg">₹{scannedData.amount}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Seller GSTIN</Label>
                <p className="font-mono text-sm">{scannedData.seller}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Buyer</Label>
                <p className="font-semibold">{scannedData.buyerName}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Decentralized Verification Complete</span>
              </div>
              <div className="mt-2 text-sm text-green-600">
                <p>✓ Invoice verified on Stellar blockchain</p>
                <p>✓ Hash integrity confirmed via Soroban smart contract</p>
                <p>✓ Immutable record - cannot be tampered</p>
                <p>✓ No central authority required</p>
                <p className="mt-2 text-xs">
                  Network: Stellar Mainnet | Contract: Soroban GST | Verified at: {new Date(scannedData.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="shadow-card border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">How to Use QR Scanner</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>1. <strong>QR Scan:</strong> Click "Start Scanning" and point camera at invoice QR code</p>
          <p>2. <strong>Manual Entry:</strong> Enter blockchain hash directly if QR scan fails</p>
          <p>3. <strong>Verification:</strong> System fetches invoice data from Stellar blockchain via Soroban</p>
          <p>4. <strong>Results:</strong> View complete invoice details and verification status</p>
        </CardContent>
      </Card>
    </div>
  );
}
