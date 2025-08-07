import React, { useState, useEffect } from 'react';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import OfficerDashboard from './OfficerDashboard';

export default function Dashboard() {
  const [userRole, setUserRole] = useState<'seller' | 'buyer' | 'officer'>('seller');

  useEffect(() => {
    // In a real app, this would come from user session/context
    // For demo purposes, we can simulate role detection
    const savedRole = localStorage.getItem('userRole') as 'seller' | 'buyer' | 'officer';
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Role switcher for demo purposes (would be removed in production)
  const RoleSwitcher = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo: Switch Role</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setUserRole('seller');
              localStorage.setItem('userRole', 'seller');
            }}
            className={`px-2 py-1 text-xs rounded ${userRole === 'seller' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            Seller
          </button>
          <button
            onClick={() => {
              setUserRole('buyer');
              localStorage.setItem('userRole', 'buyer');
            }}
            className={`px-2 py-1 text-xs rounded ${userRole === 'buyer' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
          >
            Buyer
          </button>
          <button
            onClick={() => {
              setUserRole('officer');
              localStorage.setItem('userRole', 'officer');
            }}
            className={`px-2 py-1 text-xs rounded ${userRole === 'officer' ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
          >
            Officer
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case 'seller':
        return <SellerDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'officer':
        return <OfficerDashboard />;
      default:
        return <SellerDashboard />;
    }
  };

  return (
    <>
      {renderDashboard()}
      <RoleSwitcher />
    </>
  );
}