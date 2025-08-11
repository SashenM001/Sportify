import { Cake, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContactCardProps {
  name: string;
  role: string;
  birthday?: string;
  event?: string;
  eventDate?: string;
}

export function ContactCard({ name, role, birthday, event, eventDate }: ContactCardProps) {
  return (
    <Card className="p-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{name}</h4>
          <p className="text-xs text-muted-foreground truncate">{role}</p>
        </div>
      </div>

      {birthday && (
        <div className="flex items-center space-x-2 mb-2">
          <Cake className="h-3 w-3 text-pink-500" />
          <span className="text-xs text-muted-foreground">Birthday: {birthday}</span>
        </div>
      )}

      {event && eventDate && (
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="h-3 w-3 text-blue-600" />
          <span className="text-xs text-muted-foreground">{event}: {eventDate}</span>
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full h-8 text-xs">
        Connect
      </Button>
    </Card>
  );
}