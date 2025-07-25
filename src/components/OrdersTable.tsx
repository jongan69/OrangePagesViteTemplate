
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getStatusColor, getStatusIcon } from './utils/statusUtils';
import { Eye, X } from 'lucide-react';

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
}

interface OrdersTableProps {
  orders: Order[];
  onNavigate: (view: string, data?: Order) => void;
}

export function OrdersTable({ orders, onNavigate }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="hover:bg-muted/50">
            <TableCell className="font-mono">{order.id}</TableCell>
            <TableCell>
              <Badge variant={order.type === 'Buy' ? 'default' : 'secondary'}>
                {order.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{order.asset}</p>
                <p className="text-sm text-muted-foreground">{order.symbol}</p>
              </div>
            </TableCell>
            <TableCell>{order.amount} {order.symbol}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell>{order.total}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(order.status || 'Unknown')}>
                {getStatusIcon(order.status || 'Unknown')}
                {order.status || 'Unknown'}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{order.date}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate('order-status', order)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                {order.status === 'Pending' && (
                  <Button variant="outline" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}