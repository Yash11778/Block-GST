import React from 'react';
import { Shield, TrendingUp, AlertTriangle, Users, FileText, Eye, Search, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function OfficerDashboard() {
  const stats = [
    { title: 'Total Transactions', value: '12,456', change: '+24%', icon: FileText },
    { title: 'Compliance Rate', value: '94.2%', change: '+2%', icon: Shield },
    { title: 'Flagged Invoices', value: '23', change: '-12%', icon: AlertTriangle },
    { title: 'Active Businesses', value: '1,889', change: '+8%', icon: Users },
  ];

  const flaggedTransactions = [
    { 
      id: 'TXN-001', 
      seller: 'ABC Enterprises', 
      buyer: 'XYZ Corp',
      amount: '₹5,00,000', 
      flag: 'High Amount',
      severity: 'medium',
      date: '2024-01-15' 
    },
    { 
      id: 'TXN-002', 
      seller: 'Tech Solutions', 
      buyer: 'Digital Ltd',
      amount: '₹12,00,000', 
      flag: 'Duplicate GSTIN',
      severity: 'high',
      date: '2024-01-14' 
    },
    { 
      id: 'TXN-003', 
      seller: 'Services Inc', 
      buyer: 'Global Co',
      amount: '₹3,50,000', 
      flag: 'Unusual Pattern',
      severity: 'low',
      date: '2024-01-13' 
    },
  ];

  const recentAudits = [
    { business: 'TechCorp Ltd', gstin: '27ABCDE1234F1Z5', status: 'completed', issues: 2 },
    { business: 'Digital Services', gstin: '19FGHIJ5678K2L6', status: 'in-progress', issues: 0 },
    { business: 'Software House', gstin: '24MNOPQ9012R3S7', status: 'pending', issues: 5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GST Officer Dashboard</h1>
          <p className="text-muted-foreground">Monitor compliance and audit GST transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Search className="w-4 h-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input placeholder="Search by GSTIN, Business Name, or Transaction ID..." className="flex-1" />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/history">
          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Audit Trail</h3>
              <p className="text-sm text-muted-foreground">View all transactions</p>
            </CardContent>
          </Card>
        </Link>
        
        <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="font-semibold mb-2">Fraud Detection</h3>
            <p className="text-sm text-muted-foreground">AI-powered alerts</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Compliance Reports</h3>
            <p className="text-sm text-muted-foreground">Generate reports</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Business Registry</h3>
            <p className="text-sm text-muted-foreground">Manage businesses</p>
          </CardContent>
        </Card>
      </div>

      {/* Flagged Transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Flagged Transactions
          </CardTitle>
          <CardDescription>Transactions requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.severity === 'high' ? 'bg-red-500' : 
                    transaction.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium">{transaction.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.seller} → {transaction.buyer}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <Badge variant={transaction.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {transaction.flag}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View All Flagged Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Audits */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
          <CardDescription>Latest business compliance audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{audit.business}</p>
                    <p className="text-sm text-muted-foreground font-mono">{audit.gstin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={audit.status === 'completed' ? 'default' : audit.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {audit.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {audit.issues} {audit.issues === 1 ? 'issue' : 'issues'} found
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View All Audits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
