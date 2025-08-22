import { MessageCircle, UserPlus, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ContactCardProps {
  id: string;
  name: string;
  role: string;
  team?: string;
  image: string;
  isConnected: boolean;
  location: string;
  phone: string;
  email: string;
  stats?: {
    matches: number;
    runs?: number;
    wickets?: number;
  };
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export function ContactCard({
  name,
  role,
  team,
  image,
  isConnected,
  location,
  phone,
  email,
  stats,
  status,
  lastSeen
}: ContactCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      default: return lastSeen ? `Last seen ${lastSeen}` : 'Offline';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-1">
      <div className="p-6">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor()}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{name}</h3>
              <p className="text-sm text-blue-600 font-medium">{role}</p>
              {team && (
                <Badge variant="secondary" className="text-xs mt-1 bg-blue-50 text-blue-700">
                  {team}
                </Badge>
              )}
              <p className="text-xs text-gray-500 mt-1">{getStatusText()}</p>
            </div>
          </div>
          
          {isConnected && (
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Connected
            </Badge>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="truncate">{email}</span>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{stats.matches}</p>
              <p className="text-xs text-gray-500">Matches</p>
            </div>
            {stats.runs && (
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{stats.runs}</p>
                <p className="text-xs text-gray-500">Runs</p>
              </div>
            )}
            {stats.wickets && (
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{stats.wickets}</p>
                <p className="text-xs text-gray-500">Wickets</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          
          <Button 
            size="sm" 
            variant={isConnected ? "secondary" : "outline"}
            className={`flex-1 ${!isConnected ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : ''}`}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isConnected ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </div>
    </Card>
  );
}