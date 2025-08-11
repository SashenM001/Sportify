import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PlayerCardProps {
  playerName: string;
  playerImage: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export function PlayerCard({ playerName, playerImage, caption, likes, comments, timeAgo }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden  shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {playerName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{playerName}</h3>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={playerImage} 
          alt={playerName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
              <Heart className="h-5 w-5 mr-1" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-5 w-5 mr-1" />
              {comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="text-sm">
          <span className="font-semibold">{playerName}</span> {caption}
        </p>
      </div>
    </Card>
  );
}