import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface NewsCardProps {
  title: string;
  summary: string;
  time: string;
  category: string;
}

export function NewsCard({ title, summary, time, category }: NewsCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2">
        <span className="inline-block bg-blue-100 text-blue-600 font-medium text-blue-600 text-xs font-medium px-2 py-1 rounded">
          {category}
        </span>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
      
      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-3">{summary}</p>
    </Card>
  );
}