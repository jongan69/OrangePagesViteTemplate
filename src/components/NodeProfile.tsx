import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft,
  Network,
  Zap,
  Settings,
  Activity,
  Users,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

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

interface NodeProfileProps {
  node: Node | null;
  onNavigate: (view: string, data?: Node) => void;
}

export function NodeProfile({ node, onNavigate }: NodeProfileProps) {
  const [isConnected, setIsConnected] = useState(false);

  // Mock data if no node provided
  const nodeData = node || {
    id: 1,
    name: 'Lightning Node Alpha',
    alias: 'alpha-node',
    pubkey: '02a1b2c3d4e5f6789abcdef123456789abcdef123456789abcdef123456789abcdef',
    status: 'Online',
    capacity: '₿5.25',
    channels: 45,
    uptime: '99.8%',
    location: 'New York, US',
    fees: '0.001%',
    lastUpdate: '2 minutes ago',
    isOwned: false
  };

  const channels = [
    { id: 1, peer: 'bob...lightning', capacity: '₿1.25', local: '₿0.75', remote: '₿0.50', status: 'Active' },
    { id: 2, peer: 'alice...bitcoin', capacity: '₿0.85', local: '₿0.35', remote: '₿0.50', status: 'Active' },
    { id: 3, peer: 'charlie...node', capacity: '₿2.15', local: '₿1.15', remote: '₿1.00', status: 'Pending' },
    { id: 4, peer: 'dave...wallet', capacity: '₿0.95', local: '₿0.45', remote: '₿0.50', status: 'Active' }
  ];

  const transactions = [
    { id: 1, type: 'Payment', amount: '₿0.005', fee: '₿0.00001', status: 'Success', time: '2 minutes ago' },
    { id: 2, type: 'Invoice', amount: '₿0.012', fee: '₿0.00002', status: 'Success', time: '8 minutes ago' },
    { id: 3, type: 'Payment', amount: '₿0.003', fee: '₿0.00001', status: 'Failed', time: '15 minutes ago' },
    { id: 4, type: 'Invoice', amount: '₿0.025', fee: '₿0.00003', status: 'Success', time: '23 minutes ago' }
  ];

  const peers = [
    { id: 1, alias: 'bob-lightning', pubkey: '03b1c2d3...', channels: 3, capacity: '₿2.1', status: 'Connected' },
    { id: 2, alias: 'alice-bitcoin', pubkey: '04c2d3e4...', channels: 2, capacity: '₿1.5', status: 'Connected' },
    { id: 3, alias: 'charlie-node', pubkey: '05d3e4f5...', channels: 1, capacity: '₿0.8', status: 'Disconnected' },
    { id: 4, alias: 'dave-wallet', pubkey: '06e4f5g6...', channels: 4, capacity: '₿3.2', status: 'Connected' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
      case 'Active':
      case 'Connected':
      case 'Success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Offline':
      case 'Disconnected':
      case 'Failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online':
      case 'Active':
      case 'Connected':
      case 'Success':
        return <CheckCircle className="w-4 h-4" />;
      case 'Offline':
      case 'Disconnected':
      case 'Failed':
        return <XCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('node-explorer')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explorer
        </Button>
      </div>

      {/* Node Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{nodeData.name}</h1>
                  <Badge variant="outline" className={getStatusColor(nodeData.status || 'Unknown')}>
                    {getStatusIcon(nodeData.status || 'Unknown')}
                    {nodeData.status || 'Unknown'}
                  </Badge>
                  {nodeData.isOwned && (
                    <Badge variant="secondary">Owned</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>@{nodeData.alias}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{nodeData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated {nodeData.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {nodeData.isOwned && (
                <Button variant="outline" onClick={() => onNavigate('settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              )}
              <Button 
                variant={isConnected ? "secondary" : "default"}
                onClick={() => setIsConnected(!isConnected)}
              >
                <Zap className="w-4 h-4 mr-2" />
                {isConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold">{nodeData.capacity}</p>
                <p className="text-sm text-green-500 mt-1">+5.2%</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Channels</p>
                <p className="text-2xl font-bold">{nodeData.channels}</p>
                <p className="text-sm text-blue-500 mt-1">+2 new</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">{nodeData.uptime}</p>
                <p className="text-sm text-green-500 mt-1">Excellent</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Routing Fees</p>
                <p className="text-2xl font-bold">{nodeData.fees}</p>
                <p className="text-sm text-muted-foreground mt-1">Base rate</p>
              </div>
              <Globe className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Node Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="channels" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="channels">Channels</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="peers">Peers</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="channels">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Peer</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Local</TableHead>
                        <TableHead>Remote</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {channels.map((channel) => (
                        <TableRow key={channel.id}>
                          <TableCell className="font-mono text-sm">{channel.peer}</TableCell>
                          <TableCell>{channel.capacity}</TableCell>
                          <TableCell>{channel.local}</TableCell>
                          <TableCell>{channel.remote}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(channel.status)}>
                              {channel.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{tx.type}</TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>{tx.fee}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(tx.status)}>
                              {getStatusIcon(tx.status)}
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{tx.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="peers">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alias</TableHead>
                        <TableHead>Public Key</TableHead>
                        <TableHead>Channels</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {peers.map((peer) => (
                        <TableRow key={peer.id}>
                          <TableCell>{peer.alias}</TableCell>
                          <TableCell className="font-mono text-sm">{peer.pubkey}</TableCell>
                          <TableCell>{peer.channels}</TableCell>
                          <TableCell>{peer.capacity}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(peer.status)}>
                              {peer.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Node Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Public Key:</span>
                        <span className="font-mono break-all">{nodeData.pubkey}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Alias:</span>
                        <span>{nodeData.alias}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{nodeData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Update:</span>
                        <span>{nodeData.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uptime</span>
                          <span>{nodeData.uptime}</span>
                        </div>
                        <Progress value={parseFloat(nodeData.uptime || '0')} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Channel Health</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Routing Success</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </div>
                  </div>
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
                onClick={() => setIsConnected(!isConnected)}
              >
                <Zap className="w-4 h-4 mr-2" />
                {isConnected ? 'Disconnect' : 'Connect to Node'}
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="w-4 h-4 mr-2" />
                Open Channel
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                View Peers
              </Button>
              {nodeData.isOwned && (
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Node Settings
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Node Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Health</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Excellent
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Connectivity</span>
                    <span className="text-green-500">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Channel Balance</span>
                    <span className="text-blue-500">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Routing Performance</span>
                    <span className="text-yellow-500">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}