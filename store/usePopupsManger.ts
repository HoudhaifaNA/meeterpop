import { create } from "zustand";

type PopupType = "toCreate" | "toModify" | "toDelete";

interface State {
  toCreate: string[];
  toModify: string[];
  toDelete: string[];
  insertPopup: (type: PopupType, id: string) => void;
}

const usePopupManager = create<State>()((set) => ({
  toCreate: [],
  toModify: [],
  toDelete: [],

  insertPopup: (type, id) =>
    set((state) => {
      const doesExist =
        state.toModify.find((popId) => popId === id) ||
        state.toCreate.find((popId) => popId === id);

      // if it exists and we want to delete it move it the delete list
      if (type === "toDelete" && doesExist) {
        const updateToCreate = state.toCreate.filter((popId) => popId !== id);
        const updateToModify = state.toModify.filter((popId) => popId !== id);
        state.toCreate = updateToCreate;
        state.toModify = updateToModify;
      }

      // If it doesn't exist before we won't delete it at all
      if (!(type === "toDelete" && !doesExist)) {
        state[type].push(id);
      }
      return { ...state };
    }),
}));

export default usePopupManager;
