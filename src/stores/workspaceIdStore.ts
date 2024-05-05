import { create } from "zustand";

interface workspaceIdProps {
  workspaceId: string | undefined;
  setWorkspaceId: (workspaceId: string | undefined) => void;
}

const useWorkspaceIdStore = create<workspaceIdProps>((set) => ({
  workspaceId: "",
  setWorkspaceId: (workspaceId: string | undefined) => set({ workspaceId }),
}));

export default useWorkspaceIdStore;
