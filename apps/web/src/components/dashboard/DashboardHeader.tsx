import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, Bell, User, LogOut, X, Check, MessageSquare, Zap, Coins } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNotifications } from "../../lib/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface DashboardHeaderProps {
  role: "dev" | "streamer" | "viewer";
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const [walletAddress] = useState("0x7a8f...9b3c");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  const notificationIcons = {
    bounty_offer: Zap,
    bounty_accepted: Check,
    bounty_rejected: X,
    message: MessageSquare,
    donation: Coins,
  };

  const notificationColors = {
    bounty_offer: "text-purple-400 bg-purple-500/10",
    bounty_accepted: "text-green-400 bg-green-500/10",
    bounty_rejected: "text-red-400 bg-red-500/10",
    message: "text-cyan-400 bg-cyan-500/10",
    donation: "text-yellow-400 bg-yellow-500/10",
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setShowNotifications(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SB</span>
            </div>
            <span className="text-xl text-white">Sui Bounties</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Wallet */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Wallet className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">{walletAddress}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-400" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-white font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <p className="text-slate-400 text-xs">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-purple-400 hover:text-purple-300 text-xs"
                      >
                        Tout marquer comme lu
                      </Button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">Aucune notification</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const Icon = notificationIcons[notification.type];
                        return (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors text-left ${
                              !notification.read ? "bg-slate-800/30" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notificationColors[notification.type]}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="text-white text-sm font-semibold">{notification.title}</p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-slate-400 text-sm mb-2">{notification.message}</p>
                                <p className="text-slate-500 text-xs">
                                  {formatDistanceToNow(notification.timestamp, { 
                                    addSuffix: true,
                                    locale: fr 
                                  })}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearNotification(notification.id);
                                }}
                                className="text-slate-500 hover:text-slate-300 flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                <div className="px-3 py-2">
                  <p className="text-sm text-white">
                    {role === "dev" ? "Développeur" : role === "streamer" ? "Streamer" : "Viewer"}
                  </p>
                  <p className="text-xs text-slate-400">{walletAddress}</p>
                </div>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <User className="w-4 h-4 mr-2" />
                  Mon profil
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <Wallet className="w-4 h-4 mr-2" />
                  Gérer wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem
                  className="text-red-400 hover:text-red-300 hover:bg-slate-800"
                  asChild
                >
                  <Link to="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}