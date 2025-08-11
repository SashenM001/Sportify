import { Home, Users, Calendar, Trophy, Settings, Bell, MessageSquare, User,CalendarCheck,Contact,Store , LogOut, ChevronUp} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  { icon: Home, label: 'Home', path: '/home'},
  { icon: Contact, label: 'Contacts', path: '/Contacts'},
  { icon: Users, label: 'Teams',path: '/teams'},
  { icon: Trophy, label: 'Matches', path: '/matches' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: CalendarCheck, label: 'Bookings', path: '/bookings' },
  { icon: Store, label: 'Merchendise', path: '/merchandise' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];


  
export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setIsPopupOpen(false);
    // Example: redirect to login page, clear tokens, etc.
  };

  return (
    <div className={cn("w-64 h-screen bg-card border-r border-border flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Sportify
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
        
          return(
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"
          >
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">Rohit Sharma</p>
            <p className="text-xs text-muted-foreground">@rohitsharma45</p>
          </div>
        </div>
      </div>
    </div>
  );
}