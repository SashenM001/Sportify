import { Sidebar } from '@/components/ui/sidebar';

const Teams = () => {


  return (
    
    <div className="h-screen bg-blue-100 bg-background flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
        <Sidebar />
      </div>
      </div>
);
}

export default Teams;