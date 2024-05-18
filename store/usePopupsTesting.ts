import { create } from "zustand";

interface State {
  toTest: boolean;
  toggleTesting: (toTest: boolean) => void;
}

const usePopupsTesting = create<State>()((set) => ({
  toTest: false,
  toggleTesting: (toTest) =>
    set(() => {
      return { toTest };
    }),
}));

export default usePopupsTesting;
