import { GroupByType } from "@/types";
import { create } from "zustand";

interface State {
  groupBy: GroupByType;
  setGroupBy: (groupBY: GroupByType) => void;
}

const useGroupBy = create<State>()((set) => ({
  groupBy: "domain",
  setGroupBy: (groupBy) =>
    set(() => {
      return { groupBy };
    }),
}));

export default useGroupBy;
