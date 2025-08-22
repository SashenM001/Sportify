import { useState } from 'react';
import { Search, Filter, Users, Star, Phone } from 'lucide-react';
import { ContactCard } from '@/components/ui/ContactCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/ui/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import contact images
import contact1 from '@/assets/cricket-player-1.jpg';
import contact2 from '@/assets/cricket-player-1.jpg';
import contact3 from '@/assets/cricket-player-1.jpg';
import contact4 from '@/assets/cricket-player-1.jpg';
import contact5 from '@/assets/cricket-player-1.jpg';
import contact6 from '@/assets/cricket-player-1.jpg';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const contacts = [
    {
      id: '1',
      name: 'Virat Kohli',
      role: 'Captain',
      team: 'Royal Challengers Bangalore',
      image: contact1,
      isConnected: true,
      location: 'Mumbai, India',
      phone: '+91 98765 43210',
      email: 'virat.kohli@email.com',
      stats: { matches: 254, runs: 12169, wickets: 4 },
      status: 'online' as const,
      category: 'players'
    },
    {
      id: '2',
      name: 'Smriti Mandhana',
      role: 'Opening Batsman',
      team: 'India Women',
      image: contact2,
      isConnected: true,
      location: 'Pune, India',
      phone: '+91 98765 43211',
      email: 'smriti.mandhana@email.com',
      stats: { matches: 87, runs: 2954, wickets: 0 },
      status: 'away' as const,
      category: 'players'
    },
    {
      id: '3',
      name: 'Rahul Dravid',
      role: 'Head Coach',
      team: 'Team India',
      image: contact3,
      isConnected: false,
      location: 'Bangalore, India',
      phone: '+91 98765 43212',
      email: 'rahul.dravid@email.com',
      stats: { matches: 344, runs: 13288, wickets: 1 },
      status: 'offline' as const,
      lastSeen: '2h ago',
      category: 'coaches'
    },
    {
      id: '4',
      name: 'Shubman Gill',
      role: 'Opening Batsman',
      team: 'Gujarat Titans',
      image: contact4,
      isConnected: true,
      location: 'Mohali, India',
      phone: '+91 98765 43213',
      email: 'shubman.gill@email.com',
      stats: { matches: 45, runs: 1567, wickets: 0 },
      status: 'online' as const,
      category: 'players'
    },
    {
      id: '5',
      name: 'MS Dhoni',
      role: 'Wicket Keeper',
      team: 'Chennai Super Kings',
      image: contact5,
      isConnected: true,
      location: 'Chennai, India',
      phone: '+91 98765 43214',
      email: 'ms.dhoni@email.com',
      stats: { matches: 350, runs: 10773, wickets: 0 },
      status: 'away' as const,
      category: 'players'
    },
    {
      id: '6',
      name: 'Jasprit Bumrah',
      role: 'Fast Bowler',
      team: 'Mumbai Indians',
      image: contact6,
      isConnected: false,
      location: 'Mumbai, India',
      phone: '+91 98765 43215',
      email: 'jasprit.bumrah@email.com',
      stats: { matches: 72, runs: 55, wickets: 128 },
      status: 'offline' as const,
      lastSeen: '1d ago',
      category: 'players'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.team && contact.team.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'connected' && contact.isConnected) ||
                      (activeTab === 'players' && contact.category === 'players') ||
                      (activeTab === 'coaches' && contact.category === 'coaches');
    
    return matchesSearch && matchesTab;
  });

  const connectedCount = contacts.filter(c => c.isConnected).length;
  const playersCount = contacts.filter(c => c.category === 'players').length;
  const coachesCount = contacts.filter(c => c.category === 'coaches').length;

  return (
    
    <div className="h-screen bg-blue-100 bg-background flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
        <Sidebar />
      </div>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
        
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Contacts
          </h1>
          <p className="text-gray-600">Connect with players, coaches, and cricket community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                <p className="text-sm text-gray-600">Total Contacts</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{connectedCount}</p>
                <p className="text-sm text-gray-600">Connected</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{playersCount}</p>
                <p className="text-sm text-gray-600">Players</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{coachesCount}</p>
                <p className="text-sm text-gray-600">Coaches</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              All ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="connected" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Connected ({connectedCount})
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Players ({playersCount})
            </TabsTrigger>
            <TabsTrigger value="coaches" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Coaches ({coachesCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              {...contact}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
};

export default Contacts;