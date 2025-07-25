import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AssetDiscovery } from './components/AssetDiscovery';
import { NodeExplorer } from './components/NodeExplorer';
import { AssetDetails } from './components/AssetDetails';
import { NodeProfile } from './components/NodeProfile';
import { ManageAssets } from './components/ManageAssets';
import { Orders } from './components/Orders';
import { Settings } from './components/Settings';
import { Checkout } from './components/Checkout';
import { OrderStatus } from './components/OrderStatus';
import { NodeClaimWizard } from './components/NodeClaimWizard';
import { Layout } from './components/Layout';

// Define types for better type safety
interface Credentials {
  type: string;
  email?: string;
  password?: string;
  nodeId?: string;
  privateKey?: string;
}

interface Asset {
  id?: number;
  name?: string;
  symbol?: string;
  price?: string;
  change?: string;
  volume?: string;
  marketCap?: string;
  trending?: 'up' | 'down';
  category?: string;
  description?: string;
  holders?: number;
  totalSupply?: string;
  circulatingSupply?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  isFavorite?: boolean;
}

interface Node {
  id?: number;
  name?: string;
  alias?: string;
  pubkey?: string;
  status?: string;
  capacity?: string;
  channels?: number;
  uptime?: string;
  location?: string;
  fees?: string;
  lastUpdate?: string;
  isOwned?: boolean;
}

interface Order {
  id?: string;
  type?: string;
  asset?: string;
  symbol?: string;
  amount?: string;
  price?: string;
  total?: string;
  status?: string;
  date?: string;
  fee?: string;
}

type ViewType = 
  | 'login'
  | 'dashboard'
  | 'asset-discovery'
  | 'node-explorer'
  | 'asset-details'
  | 'node-profile'
  | 'manage-assets'
  | 'orders'
  | 'settings'
  | 'checkout'
  | 'order-status'
  | 'node-claim-wizard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Check if user is authenticated (mock check)
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (credentials: Credentials) => {
    // Mock login - using credentials to avoid unused parameter warning
    console.log('Logging in with:', credentials.email || credentials.nodeId || 'unknown');
    localStorage.setItem('auth_token', 'mock_token');
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const navigate = (view: string, data: unknown = null) => {
    setCurrentView(view as ViewType);
    if (data) {
      if (view === 'asset-details') setSelectedAsset(data as Asset);
      if (view === 'node-profile') setSelectedNode(data as Node);
      if (view === 'order-status') setSelectedOrder(data as Order);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background dark">
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'asset-discovery':
        return <AssetDiscovery onNavigate={navigate} />;
      case 'node-explorer':
        return <NodeExplorer onNavigate={navigate} />;
      case 'asset-details':
        return <AssetDetails asset={selectedAsset} onNavigate={navigate} />;
      case 'node-profile':
        return <NodeProfile node={selectedNode} onNavigate={navigate} />;
      case 'manage-assets':
        return <ManageAssets onNavigate={navigate} />;
      case 'orders':
        return <Orders onNavigate={navigate} />;
      case 'settings':
        return <Settings />;
      case 'checkout':
        return <Checkout onNavigate={navigate} />;
      case 'order-status':
        return <OrderStatus order={selectedOrder} onNavigate={navigate} />;
      case 'node-claim-wizard':
        return <NodeClaimWizard onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Layout 
        currentView={currentView} 
        onNavigate={navigate}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
    </div>
  );
}