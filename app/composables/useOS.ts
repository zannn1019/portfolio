export interface OSWindow {
  id: string;
  title: string;
  component: string; // Name of the component to render content
  icon?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  data?: any; // Props to pass to component
}

export const useOS = () => {
  const windows = useState<OSWindow[]>('os-windows', () => []);
  const activeWindowId = useState<string | null>('os-active-window', () => null);
  const zIndexCounter = useState<number>('os-z-index', () => 100);

  // Bring window to front
  const focusWindow = (id: string) => {
    const win = windows.value.find(w => w.id === id);
    if (win) {
      zIndexCounter.value++;
      win.zIndex = zIndexCounter.value;
      activeWindowId.value = id;
      if (win.isMinimized) win.isMinimized = false;
    }
  };

  const openWindow = (app: { id: string; title: string; component: string; icon?: string; width?: number; height?: number; data?: any }) => {
    const existing = windows.value.find(w => w.id === app.id);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    // Spawn random position slightly offset
    const randomOffset = windows.value.length * 20;
    
    zIndexCounter.value++;
    windows.value.push({
      id: app.id,
      title: app.title,
      component: app.component,
      icon: app.icon,
      x: 100 + (Math.random() * 50) + randomOffset,
      y: 50 + (Math.random() * 50) + randomOffset,
      width: app.width || 800,
      height: app.height || 600,
      zIndex: zIndexCounter.value,
      isMinimized: false,
      isMaximized: false,
      data: app.data
    });
    activeWindowId.value = app.id;
  };

  const closeWindow = (id: string) => {
    windows.value = windows.value.filter(w => w.id !== id);
    if (activeWindowId.value === id) {
      // Focus next top window
      const remaining = windows.value.sort((a, b) => b.zIndex - a.zIndex);
      if (remaining.length > 0) {
        activeWindowId.value = remaining[0].id;
      } else {
        activeWindowId.value = null;
      }
    }
  };

  const minimizeWindow = (id: string) => {
    const win = windows.value.find(w => w.id === id);
    if (win) win.isMinimized = true;
    activeWindowId.value = null; // Blur
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    const win = windows.value.find(w => w.id === id);
    if (win) {
      win.x = x;
      win.y = y;
    }
  };
  
  const toggleMaximize = (id: string) => {
    const win = windows.value.find(w => w.id === id);
    if (win) {
      win.isMaximized = !win.isMaximized;
      focusWindow(id);
    }
  }

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    updateWindowPosition,
    toggleMaximize
  };
};
