import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Network, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string, data?: unknown) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'Total Assets',
      value: '1,234',
      change: '+12%',
      trending: 'up',
      icon: Wallet,
      color: 'text-green-500'
    },
    {
      title: 'Active Nodes',
      value: '56',
      change: '+3',
      trending: 'up',
      icon: Network,
      color: 'text-blue-500'
    },
    {
      title: 'Market Cap',
      value: '₿2.45',
      change: '-2.1%',
      trending: 'down',
      icon: TrendingUp,
      color: 'text-orange-500'
    },
    {
      title: 'Volume (24h)',
      value: '₿0.89',
      change: '+18.5%',
      trending: 'up',
      icon: Activity,
      color: 'text-purple-500'
    }
  ];

  const recentAssets = [
    {
      id: 1,
      name: 'Bitcoin Ordinals',
      symbol: 'ORD',
      price: '₿0.001',
      change: '+5.2%',
      volume: '₿12.5k',
      trending: 'up'
    },
    {
      id: 2,
      name: 'Lightning Stickers',
      symbol: 'STCK',
      price: '₿0.0005',
      change: '-1.8%',
      volume: '₿8.2k',
      trending: 'down'
    },
    {
      id: 3,
      name: 'Taproot Tokens',
      symbol: 'TAP',
      price: '₿0.002',
      change: '+12.1%',
      volume: '₿18.9k',
      trending: 'up'
    }
  ];

  const activeNodes = [
    {
      id: 1,
      name: 'Lightning Node #1',
      status: 'Online',
      capacity: '₿1.25',
      channels: 12,
      uptime: '99.8%'
    },
    {
      id: 2,
      name: 'Lightning Node #2',
      status: 'Online',
      capacity: '₿0.87',
      channels: 8,
      uptime: '97.2%'
    },
    {
      id: 3,
      name: 'Lightning Node #3',
      status: 'Offline',
      capacity: '₿0.45',
      channels: 5,
      uptime: '89.1%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your Lightning Network assets and nodes
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('asset-discovery')}>
            <Plus className="w-4 h-4 mr-2" />
            Discover Assets
          </Button>
          <Button variant="outline" onClick={() => onNavigate('node-claim-wizard')}>
            <Network className="w-4 h-4 mr-2" />
            Claim Node
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trending === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${stat.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Assets</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('asset-discovery')}>
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <CardDescription>
              Latest Taproot assets on the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssets.map((asset) => (
                <div 
                  key={asset.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => onNavigate('asset-details', asset)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{asset.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{asset.price}</p>
                    <div className="flex items-center gap-1">
                      {asset.trending === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-sm ${asset.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Nodes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Nodes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('node-explorer')}>
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <CardDescription>
              Your Lightning Network nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeNodes.map((node) => (
                <div 
                  key={node.id}
                  className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => onNavigate('node-profile', node)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Network className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{node.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={node.status === 'Online' ? 'default' : 'secondary'}>
                            {node.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {node.channels} channels
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{node.capacity}</p>
                      <p className="text-sm text-muted-foreground">{node.uptime} uptime</p>
                    </div>
                  </div>
                  <Progress value={parseFloat(node.uptime)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}