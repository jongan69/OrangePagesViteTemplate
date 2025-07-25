import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { getStatusColor, getStatusIcon } from './utils/statusUtils';
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

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

interface OrderStatusProps {
  order: Order | null;
  onNavigate: (view: string, data?: Order) => void;
}

export function OrderStatus({ order, onNavigate }: OrderStatusProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Mock order if none provided
  const orderData = order || {
    id: 'ORD-001',
    type: 'Buy',
    asset: 'Bitcoin Ordinals',
    symbol: 'ORD',
    amount: '100',
    price: '₿0.001',
    total: '₿0.1',
    status: 'Processing',
    date: new Date().toISOString(),
    fee: '₿0.0001'
  };

  const steps = useMemo(() => [
    { title: 'Order Placed', description: 'Order has been created', completed: true },
    { title: 'Payment Processing', description: 'Waiting for payment confirmation', completed: orderData.status !== 'Pending' },
    { title: 'Transaction Confirmed', description: 'Payment has been confirmed', completed: orderData.status === 'Completed' },
    { title: 'Assets Delivered', description: 'Assets transferred to your wallet', completed: orderData.status === 'Completed' }
  ], [orderData.status]);

  useEffect(() => {
    const completedSteps = steps.filter(step => step.completed).length;
    setCurrentStep(completedSteps);
  }, [steps]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('orders')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
      </div>

      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                Order #{orderData.id}
                <Badge variant="outline" className={getStatusColor(orderData.status || 'Unknown')}>
                  {getStatusIcon(orderData.status || 'Unknown')}
                  {orderData.status || 'Unknown'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Placed on {new Date(orderData.date || new Date()).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Progress</CardTitle>
              <CardDescription>
                Track the status of your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 
                      ${step.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : index === currentStep 
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                      }
                    `}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : index === currentStep ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {index < steps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ml-4 ${
                          step.completed ? 'bg-green-500' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{orderData.id || 'N/A'}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(orderData.id || '')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">abc123...def456</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard('abc123def456')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p>Lightning Network</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Completion</p>
                  <p>2-5 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{orderData.symbol?.charAt(0) || 'O'}</span>
                </div>
                <div>
                  <p className="font-medium">{orderData.asset}</p>
                  <p className="text-sm text-muted-foreground">{orderData.symbol}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <Badge variant={orderData.type === 'Buy' ? 'default' : 'secondary'}>
                    {orderData.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>{orderData.amount} {orderData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>{orderData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>{orderData.fee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{orderData.total}</span>
                </div>
              </div>

              {orderData.status === 'Processing' && (
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-500">Processing Payment</span>
                  </div>
                </div>
              )}

              {orderData.status === 'Completed' && (
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Order Completed</span>
                  </div>
                </div>
              )}

              {orderData.status === 'Failed' && (
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">Order Failed</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              {orderData.status === 'Pending' && (
                <Button variant="destructive" className="w-full">
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}