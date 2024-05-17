import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[30vh]">
      <Loader className="animate-spin h-28 w-28 duration-[2000ms] text-cyan-600" />
    </div>
  );
};

export default Loading;
