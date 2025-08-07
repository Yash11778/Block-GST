import React from 'react';
import { ArrowRight, Shield, Users, Zap, CheckCircle, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50">
    <CardContent className="pt-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const StepCard = ({ step, title, description }: { step: number, title: string, description: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
      {step}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Block-GST</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
              <Button asChild variant="outline" size="sm">
                <Link href="/connect-wallet">Connect Wallet</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            🚀 Powered by Stellar Blockchain
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Decentralized GST Invoice Verification System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Secure, transparent, and efficient GST invoice management using blockchain technology. 
            Eliminate fraud, ensure compliance, and streamline your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
              <Link href="/connect-wallet">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#how-it-works">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Block-GST?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built on Stellar blockchain with Soroban smart contracts for maximum security and transparency
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Blockchain Security"
              description="Immutable invoice records on Stellar blockchain ensure tamper-proof GST compliance and fraud prevention."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Verification"
              description="Instant QR code scanning and verification system for seamless invoice authentication."
            />
            <FeatureCard
              icon={Users}
              title="Multi-role Access"
              description="Separate dashboards for sellers, buyers, and GST officers with role-based permissions."
            />
            <FeatureCard
              icon={Globe}
              title="GSTIN Integration"
              description="Seamless integration with GSTIN numbers for automated reconciliation and compliance."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Analytics Dashboard"
              description="Comprehensive reporting and analytics for better business insights and compliance tracking."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Automated Reconciliation"
              description="Smart contract-powered automatic reconciliation of invoice data across parties."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple three-step process for secure GST invoice management
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-card border-0">
              <CardContent className="pt-8">
                <StepCard
                  step={1}
                  title="Connect Wallet & Register"
                  description="Connect your Stellar wallet and register with your GSTIN to get started securely."
                />
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="pt-8">
                <StepCard
                  step={2}
                  title="Create & Verify Invoices"
                  description="Sellers create invoices on blockchain, buyers scan QR codes to verify authenticity."
                />
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="pt-8">
                <StepCard
                  step={3}
                  title="Auto Reconciliation"
                  description="Smart contracts automatically reconcile verified invoices for compliance reporting."
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Benefits for Your Business</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Eliminate Invoice Fraud</h4>
                  <p className="text-sm text-muted-foreground">Blockchain immutability prevents fake invoices and double spending</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Faster Reconciliation</h4>
                  <p className="text-sm text-muted-foreground">Automated matching reduces manual work and processing time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Real-time Transparency</h4>
                  <p className="text-sm text-muted-foreground">All parties can track invoice status in real-time</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Compliance Ready</h4>
                  <p className="text-sm text-muted-foreground">Built-in GST compliance features for easy reporting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Cost Effective</h4>
                  <p className="text-sm text-muted-foreground">Reduce administrative costs with automated processes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Audit Trail</h4>
                  <p className="text-sm text-muted-foreground">Complete immutable audit trail for all transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of businesses already using Block-GST for secure invoice management
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/connect-wallet">
              Connect Your Wallet Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Block-GST</span>
              </div>
              <p className="text-gray-400 text-sm">
                Decentralized GST invoice verification system powered by Stellar blockchain.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>How it Works</div>
                <div>Pricing</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Support</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About Us</div>
                <div>Contact</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Block-GST. All rights reserved. Built on Stellar Network.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
