import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Search, 
  TrendingUp, 
  Star, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart
} from 'lucide-react';

interface Asset {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
  trending: 'up' | 'down';
  category: string;
  description: string;
  holders: number;
  isFavorite: boolean;
  isNew: boolean;
}

interface AssetDiscoveryProps {
  onNavigate: (view: string, data?: Asset) => void;
}

export function AssetDiscovery({ onNavigate }: AssetDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [filterCategory, setFilterCategory] = useState('all');

  const assets: Asset[] = [
    {
      id: 1,
      name: 'Bitcoin Ordinals',
      symbol: 'ORD',
      price: '₿0.001',
      change: '+5.2%',
      volume: '₿12.5k',
      marketCap: '₿125k',
      trending: 'up' as const,
      category: 'collectibles',
      description: 'Unique digital artifacts on Bitcoin',
      holders: 1234,
      isFavorite: false,
      isNew: true
    },
    {
      id: 2,
      name: 'Lightning Stickers',
      symbol: 'STCK',
      price: '₿0.0005',
      change: '-1.8%',
      volume: '₿8.2k',
      marketCap: '₿82k',
      trending: 'down' as const,
      category: 'utility',
      description: 'Instant microtransaction tokens',
      holders: 856,
      isFavorite: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Taproot Tokens',
      symbol: 'TAP',
      price: '₿0.002',
      change: '+12.1%',
      volume: '₿18.9k',
      marketCap: '₿189k',
      trending: 'up' as const,
      category: 'defi',
      description: 'DeFi tokens on Taproot',
      holders: 2341,
      isFavorite: false,
      isNew: true
    },
    {
      id: 4,
      name: 'RGB Assets',
      symbol: 'RGB',
      price: '₿0.0015',
      change: '+8.7%',
      volume: '₿15.2k',
      marketCap: '₿152k',
      trending: 'up' as const,
      category: 'protocol',
      description: 'Smart contract assets on RGB',
      holders: 1876,
      isFavorite: false,
      isNew: false
    },
    {
      id: 5,
      name: 'Lightning NFTs',
      symbol: 'LNFT',
      price: '₿0.0008',
      change: '+3.4%',
      volume: '₿9.8k',
      marketCap: '₿98k',
      trending: 'up' as const,
      category: 'collectibles',
      description: 'Fast NFT transfers on Lightning',
      holders: 743,
      isFavorite: true,
      isNew: false
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
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
          <h1 className="text-2xl font-bold text-foreground">Asset Discovery</h1>
          <p className="text-muted-foreground">
            Explore and discover Taproot assets on the Lightning Network
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Star className="w-4 h-4 mr-2" />
            Watchlist
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
        </div>
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
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="collectibles">Collectibles</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <Card 
            key={asset.id} 
            className="hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onNavigate('asset-details', asset)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{asset.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                      {asset.isNew && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={getCategoryColor(asset.category)}>
                        {asset.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{asset.symbol}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle favorite
                  }}
                >
                  <Heart className={`w-4 h-4 ${asset.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {asset.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.price}</span>
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
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Volume (24h)</span>
                  <span className="font-medium">{asset.volume}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{asset.marketCap}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Holders</span>
                  <span className="font-medium">{asset.holders.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('checkout', asset);
                  }}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('asset-details', asset);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredAssets.length} of {assets.length} assets
      </div>
    </div>
  );
}