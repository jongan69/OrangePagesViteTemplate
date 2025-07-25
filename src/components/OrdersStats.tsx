import { Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface Order {
  status?: string;
  total?: string;
}

interface OrdersStatsProps {
  orders: Order[];
}

export function OrdersStats({ orders }: OrdersStatsProps) {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalVolume = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + parseFloat((o.total || '0').replace('₿', '')), 0);

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      title: 'Completed',
      value: completedOrders,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Pending',
      value: pendingOrders,
      icon: TrendingDown,
      color: 'text-yellow-500'
    },
    {
      title: 'Total Volume',
      value: `₿${totalVolume.toFixed(3)}`,
      icon: DollarSign,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}