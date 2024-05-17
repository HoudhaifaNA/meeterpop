import { z } from "zod";

import { DOMAIN_REGEX } from "@/constants";

const isValidDomain = (domain: string) => {
  return DOMAIN_REGEX.test(domain);
};

const domainFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Domain is required." })
    .refine(isValidDomain, { message: "Please, enter a valid domain" }),
});

export default domainFormSchema;
