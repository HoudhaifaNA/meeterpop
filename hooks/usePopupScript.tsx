import { useEffect } from "react";
import usePopupsTesting from "@/store/usePopupsTesting";

const usePopupScript = () => {
  const { toTest } = usePopupsTesting();

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "/js/script.js";
    const insertedElement = document.querySelector('[src="/js/script.js"]');
    if (toTest) {
      document.body.appendChild(scriptElement);

      return () => {
        document.body.removeChild(scriptElement);
      };
    } else if (document.body && insertedElement) {
      document.body.removeChild(scriptElement);
    }
  }, [toTest]);
};

export default usePopupScript;
