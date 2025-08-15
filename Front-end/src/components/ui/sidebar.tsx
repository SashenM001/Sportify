import { Home, Users, Calendar, Trophy, Settings, Bell, MessageSquare, User,CalendarCheck,Contact,Store , LogOut, ChevronUp} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {useAuth} from "@/components/AuthContext";

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
  { icon: Store, label: 'Merchandise', path: '/merchandise' },
  { icon: Store, label: 'Sponserships', path: '/sponserships' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
];


  
export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const {logout} = useAuth();
  const navigate = useNavigate();
  
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
    logout();
    setIsPopupOpen(false);
    navigate('/Signin');
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

      {/* User profile with popup */}
          <div className="relative">
            {/* Popup menu */}
            {isPopupOpen && (
              <div
                ref={popupRef}
                className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50"
              >
                {/* Arrow pointing down */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 translate-y-px"></div>
                
                {/* User info */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-sm text-gray-800">Rohit Sharma</p>
                  <p className="text-xs text-gray-500">rohit@example.com</p>
                </div>
                
                {/* Menu items */}
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Account Settings
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}

            {/* User profile button */}
   <div className="flex items-center space-x-3 w-full">
            <div
              ref={buttonRef}
              className="w-10 h-10 rounded-full bg-profile flex items-center justify-center cursor-pointer hover:bg-profile-hover transition-colors relative"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            >
              <User className="w-10 h-10 rounded-full bg-blue-600 flex text-white items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors relative" />
              {isPopupOpen && (
                <ChevronUp className="h-3 w-3 text-profile-foreground absolute -top-1 -right-1" />
              )}
            </div>

            <div className="flex flex-col items-start flex-1 min-w-0">
              <p className="font-medium text-sm text-sidebar-foreground truncate w-full">Rohit Sharma</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-status-online"></div>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          


</div>
          </div>
        
    </div>
  );
}