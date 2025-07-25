import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Network, 
  Search, 
  Zap,  
  Globe,
  Eye,
  Plus,
  MapPin
} from 'lucide-react';

interface NodeExplorerProps {
  onNavigate: (view: string, data?: unknown) => void;
}

export function NodeExplorer({ onNavigate }: NodeExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const nodes = [
    {
      id: 1,
      name: 'Lightning Node Alpha',
      pubkey: '02a1b2c3d4e5f6789abcdef123456789...',
      alias: 'alpha-node',
      capacity: '₿5.25',
      channels: 45,
      uptime: '99.8%',
      status: 'Online',
      location: 'New York, US',
      fees: '0.001%',
      lastUpdate: '2 minutes ago',
      isOwned: false
    },
    {
      id: 2,
      name: 'Lightning Node Beta',
      pubkey: '03b2c3d4e5f6789abcdef123456789a...',
      alias: 'beta-node',
      capacity: '₿3.87',
      channels: 32,
      uptime: '97.2%',
      status: 'Online',
      location: 'London, UK',
      fees: '0.002%',
      lastUpdate: '5 minutes ago',
      isOwned: true
    },
    {
      id: 3,
      name: 'Lightning Node Gamma',
      pubkey: '04c3d4e5f6789abcdef123456789ab...',
      alias: 'gamma-node',
      capacity: '₿2.14',
      channels: 18,
      uptime: '89.1%',
      status: 'Offline',
      location: 'Tokyo, JP',
      fees: '0.003%',
      lastUpdate: '1 hour ago',
      isOwned: false
    },
    {
      id: 4,
      name: 'Lightning Node Delta',
      pubkey: '05d4e5f6789abcdef123456789abc...',
      alias: 'delta-node',
      capacity: '₿8.92',
      channels: 67,
      uptime: '99.5%',
      status: 'Online',
      location: 'Berlin, DE',
      fees: '0.001%',
      lastUpdate: '30 seconds ago',
      isOwned: false
    },
    {
      id: 5,
      name: 'Lightning Node Echo',
      pubkey: '06e5f6789abcdef123456789abcd...',
      alias: 'echo-node',
      capacity: '₿1.78',
      channels: 23,
      uptime: '95.7%',
      status: 'Online',
      location: 'Sydney, AU',
      fees: '0.004%',
      lastUpdate: '12 minutes ago',
      isOwned: true
    }
  ];

  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.pubkey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Offline': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const NodeCard = ({ node }: { node: typeof nodes[0] }) => (
    <Card 
      className="hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onNavigate('node-profile', node)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{node.name}</CardTitle>
                {node.isOwned && (
                  <Badge variant="secondary" className="text-xs">Owned</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getStatusColor(node.status)}>
                  {node.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{node.alias}</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('node-profile', node);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <span className="font-medium">{node.capacity}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Channels</span>
            <span className="font-medium">{node.channels}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uptime</span>
            <span className="font-medium">{node.uptime}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Performance</span>
              <span className="text-sm font-medium">{node.uptime}</span>
            </div>
            <Progress value={parseFloat(node.uptime)} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-sm">{node.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Fees</span>
            <span className="font-medium">{node.fees}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Connect to node
            }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Connect
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('node-profile', node);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Node Explorer</h1>
          <p className="text-muted-foreground">
            Discover and explore Lightning Network nodes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('node-claim-wizard')}>
            <Plus className="w-4 h-4 mr-2" />
            Claim Node
          </Button>
          <Button>
            <Globe className="w-4 h-4 mr-2" />
            Network Map
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search nodes by name, alias, or pubkey..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'}
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lightning Network Nodes</CardTitle>
            <CardDescription>
              Comprehensive list of network nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Node</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNodes.map((node) => (
                  <TableRow key={node.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Network className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{node.name}</p>
                          <p className="text-sm text-muted-foreground">{node.alias}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(node.status)}>
                        {node.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{node.capacity}</TableCell>
                    <TableCell>{node.channels}</TableCell>
                    <TableCell>{node.uptime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{node.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm">
                          <Zap className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Results Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredNodes.length} of {nodes.length} nodes
      </div>
    </div>
  );
}