import API from "@/lib/API";
import { PopupFormValues } from "@/types";

const handleKeptPopups = async (
  popups: PopupFormValues["popups"],
  type: "new" | "update"
) => {
  const formData = new FormData();

  formData.append("domain", popups[0].domain);

  popups.map((popup, index) => {
    Object.entries(popup).map(([key, value]) => {
      if (key === "isOpen" || (type === "new" && key === "id")) {
        return;
      }
      formData.append(`popups[${index}][${key}]`, value);
    });
  });

  try {
    const method = type === "update" ? "patch" : "post";

    await API[method]("/popups", formData);
  } catch (err) {
    throw err;
  }
};

export default handleKeptPopups;
