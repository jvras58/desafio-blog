"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

export function SidebarSettings() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const { settings, setSettings } = sidebar;

  return (
    <TooltipProvider>
      <div className="flex gap-6 mt-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2">
              <Switch
                id="is-hover-open"
                onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                checked={settings.isHoverOpen}
              />
              <Label htmlFor="is-hover-open">Passe o mouse aberto</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ao passar o mouse na barra lateral no estado mini, ela será aberta</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2">
              <Switch
                id="disable-sidebar"
                onCheckedChange={(x) => setSettings({ disabled: x })}
                checked={settings.disabled}
              />
              <Label htmlFor="disable-sidebar">Desativar barra lateral</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ocultar barra lateral</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
