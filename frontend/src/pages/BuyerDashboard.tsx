import React from 'react';
import { QrCode, CheckCircle, History, ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function BuyerDashboard() {
  const stats = [
    { title: 'Total Purchases', value: '456', change: '+18%', icon: ShoppingCart },
    { title: 'Verified Invoices', value: '423', change: '+16%', icon: CheckCircle },
    { title: 'Amount Spent', value: '₹8,45,000', change: '+22%', icon: Package },
    { title: 'Pending Verification', value: '12', change: '-8%', icon: AlertCircle },
  ];

  const recentPurchases = [
    { id: 'INV-001', seller: 'Tech Solutions Ltd', amount: '₹1,25,000', status: 'verified', date: '2024-01-15' },
    { id: 'INV-002', seller: 'Digital Services Co', amount: '₹89,500', status: 'pending', date: '2024-01-14' },
    { id: 'INV-003', seller: 'Software House Inc', amount: '₹1,56,800', status: 'verified', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Verify invoices and track your purchases</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/history">
              <History className="w-4 h-4 mr-2" />
              Purchase History
            </Link>
          </Button>
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link href="/verify">
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/verify">
          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <QrCode className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">Verify invoice authenticity</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/history">
          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <History className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Purchase History</h3>
              <p className="text-sm text-muted-foreground">View all transactions</p>
            </CardContent>
          </Card>
        </Link>
        
        <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Bulk Verify</h3>
            <p className="text-sm text-muted-foreground">Lookup multiple hashes</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Purchases */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
          <CardDescription>Your latest verified and pending invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{purchase.id}</p>
                    <p className="text-sm text-muted-foreground">{purchase.seller}</p>
                    <p className="text-xs text-muted-foreground">{purchase.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">{purchase.amount}</p>
                  <Badge variant={purchase.status === 'verified' ? 'default' : 'secondary'}>
                    {purchase.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/history">View All Purchases</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Pending Actions</CardTitle>
          <CardDescription>Invoices waiting for your verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">12 invoices need verification</p>
                  <p className="text-sm text-yellow-600">Click to scan QR codes</p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/verify">Verify Now</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
