import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Zap, Wallet, Key, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (credentials: { type: string; email?: string; password?: string; nodeId?: string; privateKey?: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nodeId: '',
    privateKey: ''
  });

  const handleLogin = async (type: 'email' | 'node' | 'wallet') => {
    setIsLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      onLogin({ type, ...formData });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Orange Pages</h1>
          <p className="text-muted-foreground mt-2">
            Taproot Asset Explorer & Marketplace
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your Lightning Network assets and nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="node">Node ID</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('email')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </TabsContent>

              <TabsContent value="node" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nodeId">Node ID</Label>
                  <Input
                    id="nodeId"
                    placeholder="Enter your Lightning Node ID"
                    value={formData.nodeId}
                    onChange={(e) => handleInputChange('nodeId', e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('node')}
                  disabled={isLoading}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {isLoading ? 'Connecting...' : 'Connect Node'}
                </Button>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="privateKey">Private Key</Label>
                  <Input
                    id="privateKey"
                    type="password"
                    placeholder="Enter your private key"
                    value={formData.privateKey}
                    onChange={(e) => handleInputChange('privateKey', e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('wallet')}
                  disabled={isLoading}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                Secured by Lightning Network
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Don't have an account?</p>
          <Button variant="link" className="p-0 text-orange-500 hover:text-orange-400">
            Create new node
          </Button>
        </div>
      </div>
    </div>
  );
}