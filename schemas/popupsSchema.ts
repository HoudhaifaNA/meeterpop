import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const popupFormSchema = z.object({
  popups: z.array(
    z.object({
      id: z.string(),
      isOpen: z.boolean(),
      category: z.string().min(1, "Category is required"),
      icon: z
        .any()
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Please, add a valid image"
        ),
      sender: z.string().min(1, "Sender of notification is required"),
      title: z.string().min(1, "Title of notification is required"),
      message: z.string().min(1, "Message is required"),
      place: z.enum(["top_right", "bottom_right", "top_left", "bottom_left"]),
      status: z.enum(["default", "worrying", "dangerous"]),
    })
  ),
});

export default popupFormSchema;
