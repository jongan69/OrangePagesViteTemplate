import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator'; 
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  ShoppingCart,
  Zap,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface CheckoutProps {
  onNavigate: (view: string, data?: unknown) => void;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    asset: 'Bitcoin Ordinals',
    symbol: 'ORD',
    amount: '100',
    price: '₿0.001',
    total: '₿0.1',
    fee: '₿0.0001',
    finalTotal: '₿0.1001',
    paymentMethod: 'lightning'
  });

  const handleSubmit = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      type: 'Buy',
      ...orderData,
      status: 'Processing',
      date: new Date().toISOString()
    };
    
    onNavigate('order-status', newOrder);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your order has been submitted and is being processed.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <p><strong>Order ID:</strong> ORD-{Date.now()}</p>
              <p><strong>Asset:</strong> {orderData.amount} {orderData.symbol}</p>
              <p><strong>Total:</strong> {orderData.finalTotal}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onNavigate('orders')} variant="outline">
                View Orders
              </Button>
              <Button onClick={handleSubmit}>
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? 'Order Details' : 'Payment'}</span>
        </div>
        <Progress value={step * 50} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Details
                </CardTitle>
                <CardDescription>
                  Review and confirm your order details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{orderData.symbol.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{orderData.asset}</h3>
                    <p className="text-sm text-muted-foreground">{orderData.symbol}</p>
                  </div>
                  <Badge variant="outline">Buy Order</Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      value={orderData.amount}
                      onChange={(e) => setOrderData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of {orderData.symbol} tokens to purchase
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Price per Token</Label>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium">{orderData.price}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{orderData.total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Fee</span>
                      <span>{orderData.fee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{orderData.finalTotal}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      orderData.paymentMethod === 'lightning' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: 'lightning' }))}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Lightning Network</h4>
                        <p className="text-sm text-muted-foreground">
                          Instant, low-fee payments
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      orderData.paymentMethod === 'onchain' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: 'onchain' }))}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-blue-500" />
                      <div>
                        <h4 className="font-medium">On-chain Bitcoin</h4>
                        <p className="text-sm text-muted-foreground">
                          Secure, slower confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Payment Instructions</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {orderData.paymentMethod === 'lightning' 
                          ? 'You will receive a Lightning invoice to complete payment.'
                          : 'You will receive a Bitcoin address for on-chain payment.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="flex-1"
                  >
                    Submit Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{orderData.symbol.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{orderData.asset}</p>
                  <p className="text-sm text-muted-foreground">{orderData.symbol}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>{orderData.amount} {orderData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>{orderData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{orderData.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>{orderData.fee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{orderData.finalTotal}</span>
                </div>
              </div>

              <div className="bg-green-500/10 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Secure Transaction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}