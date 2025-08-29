import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationModal = ({ isOpen, onClose }: NavigationModalProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true); 
      setTimeout(() => setIsVisible(true), 10); 
    } else {
      setIsVisible(false); 
      setTimeout(() => setIsMounted(false), 200); 
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const cards = [
    { title: "Dashboard", value: "16 Projects", path: "/dashboard", bgColor: "bg-sky-300 hover:bg-sky-400" },
    { title: "Documents", value: "126 Files", path: "/documents", bgColor: "bg-emerald-300 hover:bg-emerald-400" },
    { title: "Tasks", value: "8 Tasks", path: "/tasks", bgColor: "bg-violet-300 hover:bg-violet-400" },
    { title: "Calendar", value: "4 Events", path: "/calendar", bgColor: "bg-amber-300 hover:bg-amber-400" },
    { title: "Messages", value: "29 Messages", path: "/messages", bgColor: "bg-rose-300 hover:bg-rose-400" },
    { title: "Reports", value: "45 Reports", path: "/reports", bgColor: "bg-indigo-300 hover:bg-indigo-400" },
    { title: "Analytics", value: "12 Reports", path: "/analytics", bgColor: "bg-blue-300 hover:bg-blue-400" },
    { title: "Settings", value: "3 Updates", path: "/settings", bgColor: "bg-gray-300 hover:bg-gray-400" },
    { title: "Projects", value: "24 Active", path: "/projects", bgColor: "bg-purple-300 hover:bg-purple-400" },
    { title: "Teams", value: "8 Teams", path: "/teams", bgColor: "bg-teal-300 hover:bg-teal-400" }
  ];

  const handleCardClick = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed top-12 left-3 w-full min-h-screen z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg border p-4 w-[40vw] relative max-h-[calc(100vh-5rem)] overflow-y-auto shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-4"
          }`}
      >
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.path)}
              className={`${card.bgColor} p-3 rounded cursor-pointer transition-colors duration-200`}
            >
              <div>
                <div className="font-normal text-black text-[15px]">{card.title}</div>
                <div className="text-[13px] text-gray-800 bg-white/60 rounded p-1 my-1">{card.value}</div>
                <div className="text-xs hover:underline text-gray-800 pb-2 border-b-2">View Details</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;