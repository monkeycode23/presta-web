import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

type SidebarItem = string | null;

interface AppSettingsState {
  /* ================= THEME ================= */
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  /* ================= SIDEBAR ================= */
  isSidebarExpanded: boolean;
  isSidebarMobileOpen: boolean;
  isSidebarHovered: boolean;
  activeSidebarItem: SidebarItem;
  openSidebarSubmenu: SidebarItem;
  isMobile: boolean;

  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setSidebarHovered: (value: boolean) => void;
  setActiveSidebarItem: (item: SidebarItem) => void;
  toggleSidebarSubmenu: (item: string) => void;
  setIsMobile: (value: boolean) => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      /* ================= THEME ================= */
      theme: "light",

      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),

      setTheme: (theme) => set({ theme }),

      /* ================= SIDEBAR ================= */
      isSidebarExpanded: true,
      isSidebarMobileOpen: false,
      isSidebarHovered: false,
      activeSidebarItem: null,
      openSidebarSubmenu: null,
      isMobile: false,

      toggleSidebar: () =>
        set((state) => ({
          isSidebarExpanded: !state.isSidebarExpanded,
        })),

      toggleMobileSidebar: () =>
        set((state) => ({
          isSidebarMobileOpen: !state.isSidebarMobileOpen,
        })),

      setSidebarHovered: (value) => set({ isSidebarHovered: value }),

      setActiveSidebarItem: (item) => set({ activeSidebarItem: item }),

      toggleSidebarSubmenu: (item) =>
        set((state) => ({
          openSidebarSubmenu:
            state.openSidebarSubmenu === item ? null : item,
        })),

      setIsMobile: (value) =>
        set((state) => ({
          isMobile: value,
          isSidebarMobileOpen: value ? state.isSidebarMobileOpen : false,
        })),
    }),
    {
      name: "app-settings",
      partialize: (state) => ({
        theme: state.theme,
        isSidebarExpanded: state.isSidebarExpanded,
      }),
    }
  )
);
