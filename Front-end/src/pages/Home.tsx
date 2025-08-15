import { Search, Plus, Zap } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { NewsCard } from '@/components/ui/NewsCard';
import { ContactCard } from '@/components/ui/ContactCardHome';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";
import axiosInstance from "@/axiosConfig";
import { useEffect } from "react";

// Import player images
import cricketPlayer1 from '@/assets/cricket-player-1.jpg';
import cricketPlayer2 from '@/assets/cricket-player-2.jpg';
import cricketPlayer3 from '@/assets/cricket-player-3.jpg';
import cricketPlayer4 from '@/assets/cricket-player-4.jpg';
import cricketTeam from '@/assets/cricket-team.jpg';

const Home = () => {
  const playerPosts = [
    {
      playerName: "Virat Kohli",
      playerImage: cricketPlayer1,
      caption: "What a fantastic victory! Proud of the team's performance today. #TeamIndia #Cricket",
      likes: 1247,
      comments: 89,
      timeAgo: "2h ago"
    },
    {
      playerName: "Rohit Sharma",
      playerImage: cricketPlayer2,
      caption: "Perfect batting conditions today. Ready to give our best! 🏏",
      likes: 892,
      comments: 67,
      timeAgo: "4h ago"
    },
    {
      playerName: "Jasprit Bumrah",
      playerImage: cricketPlayer3,
      caption: "Focused and determined. Every ball counts in this format. #Bowling #Cricket",
      likes: 743,
      comments: 45,
      timeAgo: "6h ago"
    },
    {
      playerName: "KL Rahul",
      playerImage: cricketPlayer4,
      caption: "Running between the wickets requires perfect coordination. Great partnership today!",
      likes: 654,
      comments: 32,
      timeAgo: "8h ago"
    },
    {
      playerName: "Team India",
      playerImage: cricketTeam,
      caption: "Together we celebrate, together we achieve! What a memorable victory! 🇮🇳",
      likes: 2156,
      comments: 234,
      timeAgo: "1d ago"
    }
  ];

  const newsItems = [
    {
      title: "India Wins Series 3-1 Against Australia",
      summary: "Outstanding performance by the Indian cricket team secures another series victory...",
      time: "30m ago",
      category: "Match Result"
    },
    {
      title: "Virat Kohli Reaches 8000 ODI Runs Milestone",
      summary: "The batting maestro continues to break records with his consistent performance...",
      time: "2h ago",
      category: "Records"
    },
    {
      title: "New T20 Tournament Announced",
      summary: "BCCI announces new domestic T20 league with international players participation...",
      time: "4h ago",
      category: "News"
    },
    {
      title: "Rohit Sharma Named Captain for World Cup",
      summary: "The experienced opener will lead India in the upcoming ICC Cricket World Cup...",
      time: "1d ago",
      category: "Team News"
    }
  ];

  const contacts = [
    {
      name: "MS Dhoni",
      role: "Former Captain",
      birthday: "July 7",
      event: "Retirement Anniversary",
      eventDate: "Aug 15"
    },
    {
      name: "Sachin Tendulkar",
      role: "Cricket Legend",
      event: "Book Launch",
      eventDate: "Aug 20"
    },
    {
      name: "Rahul Dravid",
      role: "Head Coach",
      birthday: "January 11",
      event: "Training Camp",
      eventDate: "Aug 25"
    },
    {
      name: "Anil Kumble",
      role: "Spin Consultant",
      event: "Academy Opening",
      eventDate: "Sep 1"
    }
  ];

  useEffect(() => {
  loadUsers();
}, []);

const loadUsers = async () => {
  const result = await axiosInstance.get("http://localhost:8080/users");
  console.log(result.data);
};

  return (
    <div className="min-h-screen bg-blue-100 bg-background flex overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
      {/* Sidebar */}
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex   ">
        {/* Feed */}
        <div className="flex-1 max-w-2xl mx-auto h-screen flex flex-col ">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b bg-blue-100 border-border p-4 z-10">
            <div className="flex items-center  justify-between mb-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">Sportify</h2>
              <Link to="/CreatePost">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                  
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search players, teams, matches..." 
                className="pl-10 bg-blue-50/50 border-gray-300/30 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 bg-blue-50">
            <div className="p-4 space-y-6 bg-blue-100">
              {playerPosts.map((post, index) => (
                <PlayerCard key={index} {...post} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 h-screen overflow-y-auto border-l border-gray-200 bg-white">
          {/* Trending News */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Cricket News</h3>
            </div>
            <div className="space-y-3">
              {newsItems.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          </Card>

          {/* Contacts & Events */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Contacts & Events</h3>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <ContactCard key={index} {...contact} />
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4 bg-gradient-to-br from-blue-600 to-blue-700/20">
            <h3 className="font-semibold mb-3">Team Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Matches Won</span>
                <span className="font-bold text-sportify-success">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Ranking</span>
                <span className="font-bold">#2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Players</span>
                <span className="font-bold">156</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;