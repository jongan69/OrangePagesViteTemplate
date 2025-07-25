import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { 
  Home, 
  Search, 
  Network, 
  Wallet, 
  ShoppingCart, 
  Settings, 
  User, 
  LogOut,
  Menu,
  Zap,
  Plus
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function Layout({ children, currentView, onNavigate, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'asset-discovery', icon: Search, label: 'Asset Discovery' },
    { id: 'node-explorer', icon: Network, label: 'Node Explorer' },
    { id: 'manage-assets', icon: Wallet, label: 'Manage Assets' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const Sidebar = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Orange Pages</h1>
            <p className="text-xs text-muted-foreground">Taproot Asset Explorer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-12"
              onClick={() => {
                onNavigate(item.id);
                if (isMobile) setIsMobileMenuOpen(false);
              }}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-12 mb-2"
          onClick={() => {
            onNavigate('node-claim-wizard');
            if (isMobile) setIsMobileMenuOpen(false);
          }}
        >
          <Plus className="w-5 h-5" />
          Claim Node
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-10" /> {/* Spacer for mobile menu button */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                Lightning Network
              </Badge>
              <Badge variant="outline" className="text-xs">
                Mainnet
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('settings')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}