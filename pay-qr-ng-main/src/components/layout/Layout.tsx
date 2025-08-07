import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};
