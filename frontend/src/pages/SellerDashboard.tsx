import React from 'react';
import { Shield, Plus, QrCode, TrendingUp, FileText, Users, AlertTriangle, Hash, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function SellerDashboard() {
  const stats = [
    { title: 'Total Invoices', value: '1,234', change: '+12%', icon: FileText },
    { title: 'Verified', value: '987', change: '+8%', icon: Shield },
    { title: 'Revenue', value: '₹12,45,000', change: '+15%', icon: TrendingUp },
    { title: 'Pending', value: '23', change: '-3%', icon: AlertTriangle },
  ];

  const recentInvoices = [
    { id: 'INV-001', buyer: 'Techpoint Africa', amount: '₹1,25,000', status: 'verified' },
    { id: 'INV-002', buyer: 'Flutterwave Ltd', amount: '₹89,500', status: 'pending' },
    { id: 'INV-003', buyer: 'Paystack Inc', amount: '₹1,56,800', status: 'verified' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your GST invoices and track payments</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/scan">
              <Camera className="w-4 h-4 mr-2" />
              QR Scanner
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/upload">
              <Hash className="w-4 h-4 mr-2" />
              Hash Lookup
            </Link>
          </Button>
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link href="/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Link>
          </Button>
        </div>
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

      {/* Recent Invoices */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your latest created invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.buyer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">{invoice.amount}</p>
                  <Badge variant={invoice.status === 'verified' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/history">View All Invoices</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
