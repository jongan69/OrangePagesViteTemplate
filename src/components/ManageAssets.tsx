import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Send,
  Download,
  Upload,
  Wallet,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface ManageAssetsProps {
  onNavigate: (view: string, data?: unknown) => void;
}

export function ManageAssets({ onNavigate }: ManageAssetsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const assets = [
    {
      id: 1,
      name: 'Bitcoin Ordinals',
      symbol: 'ORD',
      balance: '1,250',
      value: '₿1.25',
      change: '+5.2%',
      trending: 'up',
      type: 'collectibles',
      lastTransaction: '2 hours ago'
    },
    {
      id: 2,
      name: 'Lightning Stickers',
      symbol: 'STCK',
      balance: '850',
      value: '₿0.425',
      change: '-1.8%',
      trending: 'down',
      type: 'utility',
      lastTransaction: '1 day ago'
    },
    {
      id: 3,
      name: 'Taproot Tokens',
      symbol: 'TAP',
      balance: '2,100',
      value: '₿4.20',
      change: '+12.1%',
      trending: 'up',
      type: 'defi',
      lastTransaction: '3 hours ago'
    },
    {
      id: 4,
      name: 'RGB Assets',
      symbol: 'RGB',
      balance: '450',
      value: '₿0.675',
      change: '+8.7%',
      trending: 'up',
      type: 'protocol',
      lastTransaction: '5 hours ago'
    },
    {
      id: 5,
      name: 'Lightning NFTs',
      symbol: 'LNFT',
      balance: '32',
      value: '₿0.0256',
      change: '+3.4%',
      trending: 'up',
      type: 'collectibles',
      lastTransaction: '1 hour ago'
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value.replace('₿', '')), 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'collectibles': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'utility': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'defi': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'protocol': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Assets</h1>
          <p className="text-muted-foreground">
            View and manage your Taproot assets
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => onNavigate('asset-discovery')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₿{totalValue.toFixed(3)}</p>
                <p className="text-sm text-green-500 mt-1">+8.5%</p>
              </div>
              <Wallet className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
                <p className="text-sm text-blue-500 mt-1">5 types</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Performer</p>
                <p className="text-2xl font-bold">TAP</p>
                <p className="text-sm text-green-500 mt-1">+12.1%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Worst Performer</p>
                <p className="text-2xl font-bold">STCK</p>
                <p className="text-sm text-red-500 mt-1">-1.8%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="collectibles">Collectibles</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Assets</CardTitle>
          <CardDescription>
            Manage your Taproot asset portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{asset.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{asset.balance}</p>
                      <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{asset.value}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {asset.trending === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${asset.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(asset.type)}>
                      {asset.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{asset.lastTransaction}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('asset-details', asset)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('checkout', { ...asset, action: 'sell' })}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('asset-discovery')}>
          <CardContent className="p-6 text-center">
            <Plus className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Discover New Assets</h3>
            <p className="text-sm text-muted-foreground">
              Find and add new Taproot assets to your portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Download className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Export Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Export your asset data for tax reporting or backup
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Portfolio Analytics</h3>
            <p className="text-sm text-muted-foreground">
              View detailed performance metrics and insights
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}