import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Clock, Home, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onNavigate = (href) => {
    navigate(href);
  };

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: TrendingUp,
      href: "/trending",
      label: "Trending",
    },
    {
      icon: Clock,
      href: "/recent",
      label: "Recent",
    },
  ];

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
