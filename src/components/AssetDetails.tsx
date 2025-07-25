import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Heart,
  Share2,
  ShoppingCart,
  Activity,
  Users,
  DollarSign,
  Star,
  AlertCircle
} from 'lucide-react';

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

interface AssetDetailsProps {
  asset: Asset | null;
  onNavigate: (view: string, data?: Asset) => void;
}

export function AssetDetails({ asset, onNavigate }: AssetDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(asset?.isFavorite || false);

  // Mock data if no asset provided
  const assetData = asset || {
    id: 1,
    name: 'Bitcoin Ordinals',
    symbol: 'ORD',
    price: '₿0.001',
    change: '+5.2%',
    volume: '₿12.5k',
    marketCap: '₿125k',
    trending: 'up',
    category: 'collectibles',
    description: 'Unique digital artifacts inscribed directly on Bitcoin using the Ordinals protocol.',
    holders: 1234,
    totalSupply: '21,000,000',
    circulatingSupply: '125,000',
    website: 'https://ordinals.com',
    twitter: '@ordinals',
    discord: 'ordinals-discord'
  };

  const priceHistory = [
    { date: '2024-01-15', price: '₿0.0008', volume: '₿8.2k' },
    { date: '2024-01-16', price: '₿0.0009', volume: '₿9.1k' },
    { date: '2024-01-17', price: '₿0.0010', volume: '₿12.5k' },
    { date: '2024-01-18', price: '₿0.0011', volume: '₿15.3k' },
    { date: '2024-01-19', price: '₿0.0010', volume: '₿11.8k' }
  ];

  const transactions = [
    { id: 1, type: 'Buy', amount: '100 ORD', price: '₿0.001', user: 'alice...bitcoin', time: '2 minutes ago' },
    { id: 2, type: 'Sell', amount: '50 ORD', price: '₿0.0009', user: 'bob...lightning', time: '5 minutes ago' },
    { id: 3, type: 'Buy', amount: '200 ORD', price: '₿0.0010', user: 'charlie...node', time: '8 minutes ago' },
    { id: 4, type: 'Sell', amount: '75 ORD', price: '₿0.0008', user: 'dave...wallet', time: '12 minutes ago' }
  ];

  const holders = [
    { address: 'bc1q...abc123', balance: '1,500 ORD', percentage: '12.5%' },
    { address: 'bc1q...def456', balance: '1,200 ORD', percentage: '10.0%' },
    { address: 'bc1q...ghi789', balance: '900 ORD', percentage: '7.5%' },
    { address: 'bc1q...jkl012', balance: '800 ORD', percentage: '6.7%' }
  ];

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
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('asset-discovery')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Discovery
        </Button>
      </div>

      {/* Asset Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">{assetData.symbol?.charAt(0) || 'A'}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{assetData.name}</h1>
                  <Badge variant="outline" className={getCategoryColor(assetData.category || 'default')}>
                    {assetData.category || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-muted-foreground">{assetData.symbol}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.2/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button onClick={() => onNavigate('checkout', assetData)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold">{assetData.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  {assetData.trending === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${assetData.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {assetData.change}
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Volume (24h)</p>
                <p className="text-2xl font-bold">{assetData.volume}</p>
                <p className="text-sm text-green-500 mt-1">+18.5%</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-2xl font-bold">{assetData.marketCap}</p>
                <p className="text-sm text-green-500 mt-1">+12.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Holders</p>
                <p className="text-2xl font-bold">{(assetData.holders || 0).toLocaleString()}</p>
                <p className="text-sm text-green-500 mt-1">+5.2%</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="holders">Holders</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{assetData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Token Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Supply:</span>
                          <span>{assetData.totalSupply}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Circulating Supply:</span>
                          <span>{assetData.circulatingSupply}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <Badge variant="outline" className={getCategoryColor(assetData.category || 'default')}>
                            {assetData.category || 'Unknown'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Links</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Website:</span>
                          <a href="#" className="text-blue-500 hover:underline">{assetData.website}</a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Twitter:</span>
                          <a href="#" className="text-blue-500 hover:underline">{assetData.twitter}</a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Discord:</span>
                          <a href="#" className="text-blue-500 hover:underline">{assetData.discord}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <Badge variant={tx.type === 'Buy' ? 'default' : 'secondary'}>
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>{tx.price}</TableCell>
                          <TableCell className="font-mono text-sm">{tx.user}</TableCell>
                          <TableCell className="text-muted-foreground">{tx.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="holders">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Address</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holders.map((holder, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{holder.address}</TableCell>
                          <TableCell>{holder.balance}</TableCell>
                          <TableCell>{holder.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="history">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priceHistory.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.price}</TableCell>
                          <TableCell>{record.volume}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full"
                onClick={() => onNavigate('checkout', assetData)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy {assetData.symbol}
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="w-4 h-4 mr-2" />
                View Charts
              </Button>
              <Button variant="outline" className="w-full">
                <AlertCircle className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Market Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">All Time High</span>
                  <span className="font-medium">₿0.0025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">All Time Low</span>
                  <span className="font-medium">₿0.0002</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">From ATH</span>
                  <span className="text-red-500">-60%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">From ATL</span>
                  <span className="text-green-500">+400%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Liquidity</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}