import { z } from "zod";

const isValidDomain = (domain: string) => {
  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

  return domainRegex.test(domain);
};

const domainFormSchema = z.object({
  domain: z
    .string()
    .min(1, { message: "Domain is required." })
    .refine(isValidDomain, { message: "Please enter a valid domain" }),
});

export default domainFormSchema;
