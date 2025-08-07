import React, { useState } from 'react';
import { Shield, Building, ShoppingCart, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  color: string;
}

interface FormData {
  gstin?: string;  // Optional - only for sellers
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  // Buyer specific
  companyName?: string;
  // Officer specific  
  officerID?: string;
  department?: string;
  jurisdiction?: string;
}

export default function Onboarding() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    gstin: '',
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    companyName: '',
    officerID: '',
    department: '',
    jurisdiction: ''
  });
  const { toast } = useToast();
  const router = useRouter();

  const roles: Role[] = [
    {
      id: 'seller',
      title: 'Seller',
      description: 'Create and manage GST invoices on blockchain',
      icon: Building,
      features: [
        'Create digital invoices',
        'Generate QR codes',
        'Track payment status',
        'GST compliance reporting'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'buyer',
      title: 'Buyer',
      description: 'Verify and validate received invoices',
      icon: ShoppingCart,
      features: [
        'Scan QR codes',
        'Verify invoice authenticity',
        'Confirm receipt',
        'Track purchase history'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'officer',
      title: 'GST Officer',
      description: 'Audit and monitor GST compliance',
      icon: UserCheck,
      features: [
        'Real-time audit trails',
        'Compliance monitoring',
        'Fraud detection alerts',
        'Generate compliance reports'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setFormData(prev => ({ ...prev, role: roleId }));
  };

  const handleNext = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Role-specific validation
    if (selectedRole === 'seller') {
      if (!formData.gstin || !formData.businessName || !formData.contactPerson || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields for seller registration.",
          variant: "destructive",
        });
        return;
      }

      // GSTIN validation for sellers only
      const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinPattern.test(formData.gstin)) {
        toast({
          title: "Invalid GSTIN",
          description: "Please enter a valid GSTIN number.",
          variant: "destructive",
        });
        return;
      }
    } else if (selectedRole === 'buyer') {
      if (!formData.companyName || !formData.contactPerson || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields for buyer registration.",
          variant: "destructive",
        });
        return;
      }
    } else if (selectedRole === 'officer') {
      if (!formData.officerID || !formData.department || !formData.contactPerson || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields for officer registration.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      // Store user role for dashboard routing
      localStorage.setItem('userRole', selectedRole);
      
      // Simulate registration process
      toast({
        title: "Registration Successful!",
        description: `Welcome to Block-GST as a ${roles.find(r => r.id === selectedRole)?.title}!`,
      });

      // Redirect to appropriate dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const RoleCard = ({ role }: { role: Role }) => {
    const Icon = role.icon;
    const isSelected = selectedRole === role.id;

    return (
      <Card 
        className={`shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
          isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20'
        }`}
        onClick={() => handleRoleSelect(role.id)}
      >
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
            <p className="text-muted-foreground">{role.description}</p>
          </div>
          <div className="space-y-2">
            {role.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {isSelected && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
              <span className="text-sm font-medium text-primary">Selected</span>
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`} />
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
              </div>
              <span className="text-sm text-muted-foreground">Step {step} of 2</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {step === 1 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Select your role to customize your Block-GST experience and access the right features for your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {roles.map(role => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={handleNext}
                disabled={!selectedRole}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 px-8"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Provide your business details to complete the registration process.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {selectedRole && (
                      <>
                        {React.createElement(roles.find(r => r.id === selectedRole)?.icon || Building, { className: "w-5 h-5" })}
                        {roles.find(r => r.id === selectedRole)?.title} Registration
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Enter your business information to get started with Block-GST
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Seller Form */}
                    {selectedRole === 'seller' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="gstin">GSTIN Number *</Label>
                            <Input
                              id="gstin"
                              value={formData.gstin}
                              onChange={(e) => setFormData(prev => ({ ...prev, gstin: e.target.value }))}
                              placeholder="22ABCDE1234F1Z5"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="businessName">Business Name *</Label>
                            <Input
                              id="businessName"
                              value={formData.businessName}
                              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                              placeholder="Your Business Name"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactPerson">Contact Person *</Label>
                            <Input
                              id="contactPerson"
                              value={formData.contactPerson}
                              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                              placeholder="Full Name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="contact@business.com"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Buyer Form */}
                    {selectedRole === 'buyer' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="companyName">Company Name *</Label>
                            <Input
                              id="companyName"
                              value={formData.companyName}
                              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                              placeholder="Your Company Name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactPerson">Contact Person *</Label>
                            <Input
                              id="contactPerson"
                              value={formData.contactPerson}
                              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                              placeholder="Full Name"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="contact@company.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="+91 9876543210"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* GST Officer Form */}
                    {selectedRole === 'officer' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="officerID">Officer ID *</Label>
                            <Input
                              id="officerID"
                              value={formData.officerID}
                              onChange={(e) => setFormData(prev => ({ ...prev, officerID: e.target.value }))}
                              placeholder="GST123456"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">Department *</Label>
                            <Input
                              id="department"
                              value={formData.department}
                              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                              placeholder="GST Department"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="jurisdiction">Jurisdiction</Label>
                            <Input
                              id="jurisdiction"
                              value={formData.jurisdiction}
                              onChange={(e) => setFormData(prev => ({ ...prev, jurisdiction: e.target.value }))}
                              placeholder="Mumbai Central"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactPerson">Officer Name *</Label>
                            <Input
                              id="contactPerson"
                              value={formData.contactPerson}
                              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                              placeholder="Full Name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Official Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="officer@gst.gov.in"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Common Fields */}
                    <div>
                      <Label htmlFor="address">
                        {selectedRole === 'officer' ? 'Office Address' : 
                         selectedRole === 'buyer' ? 'Company Address' : 'Business Address'}
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder={
                          selectedRole === 'officer' ? 'Government office address' : 
                          selectedRole === 'buyer' ? 'Complete company address' : 'Complete business address'
                        }
                        rows={3}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                      >
                        Complete Registration
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
