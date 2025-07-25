import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
    case 'active':
    case 'online':
    case 'connected':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'pending':
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'failed':
    case 'cancelled':
    case 'offline':
    case 'disconnected':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
    case 'active':
    case 'online':
    case 'connected':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
    case 'processing':
      return <Clock className="w-4 h-4" />;
    case 'failed':
    case 'cancelled':
    case 'offline':
    case 'disconnected':
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};