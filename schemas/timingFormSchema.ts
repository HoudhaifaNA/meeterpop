import { z } from "zod";

const timingFormSchema = z.object({
  startingTime: z.number().min(1000, {
    message: "Please, enter a valid starting time from and above 1000",
  }),
  intervalTime: z.number().min(1000, {
    message: "Please, enter a valid starting time from and above 1000",
  }),
  endTime: z.number().min(4000, {
    message: "Please, enter a valid ending time from and above 4000",
  }),
});

export default timingFormSchema;
