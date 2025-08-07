import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  Hash, 
  Plus,
  Camera,
  Shield,
  FileText,
  BarChart3,
  Search,
  ShoppingBag
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const getRoleMenuItems = (role: string) => {
  switch (role) {
    case 'seller':
      return [
        { title: 'Dashboard', url: '/dashboard', icon: Home },
        { title: 'Create Invoice', url: '/create', icon: Plus },
        { title: 'My Invoices', url: '/invoices', icon: FileText },
        { title: 'QR Scanner', url: '/scan', icon: Camera },
      ];
    
    case 'buyer':
      return [
        { title: 'Dashboard', url: '/dashboard', icon: Home },
        { title: 'QR Scanner', url: '/scan', icon: Camera },
        { title: 'Hash Lookup', url: '/upload', icon: Hash },
        { title: 'My Purchases', url: '/purchases', icon: ShoppingBag },
      ];
    
    case 'officer':
      return [
        { title: 'Dashboard', url: '/dashboard', icon: Home },
        { title: 'QR Scanner', url: '/scan', icon: Camera },
        { title: 'Hash Lookup', url: '/upload', icon: Hash },
        { title: 'Audit Reports', url: '/audit', icon: BarChart3 },
        { title: 'Compliance Search', url: '/compliance', icon: Search },
      ];
    
    default:
      return [
        { title: 'Dashboard', url: '/dashboard', icon: Home },
        { title: 'QR Scanner', url: '/scan', icon: Camera },
        { title: 'Hash Lookup', url: '/upload', icon: Hash },
      ];
  }
};

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const currentPath = router.pathname;
  const isCollapsed = state === 'collapsed';
  
  // Get user role from localStorage (in real app, from context/auth)
  const [userRole, setUserRole] = useState<string>('seller');
  
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'seller';
    setUserRole(savedRole);
  }, []);
  
  const menuItems = getRoleMenuItems(userRole);

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (active: boolean) =>
    active
      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
      : 'hover:bg-accent hover:text-accent-foreground transition-colors';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-bold text-foreground">Block-GST</span>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Account</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(isActive(item.url))}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}