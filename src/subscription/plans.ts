import { z } from "zod";

const productSchema = z.object({
  id: z.string().describe("identifier"),
  name: z.string().describe("name of the product"),
  description: z.string().describe("description of the product"),
  characteristics: z.array(z.string()),
});

const planSchema = z.object({
  id: z.string().describe("identifier"),
  name: z.string().describe("name of the plan"),
  description: z.string().describe("description of the plan"),
  characteristics: z
    .array(z.string())
    .describe("characteristics of the plan and its products"),
});

type Product = z.infer<typeof productSchema>;
type Plan = z.infer<typeof planSchema>;

function allPlans(): Array<Plan> {
  return [
    {
      id: "pln-WN4Scxe",
      name: "What's good",
      description:
        "Start your journey with simple and consistent coffee beans every month.",
      characteristics: ["common"],
    },
    {
      id: "pln-23tvgwI",
      name: "Discovering",
      description:
        "Expand your options with a variety of coffee beans that will bring new flavours.",
      characteristics: ["discover"],
    },
    {
      id: "pln-L96y-xb",
      name: "Explorer",
      description:
        "Try experiments, less common coffee beans that exist out there.",
      characteristics: ["explore"],
    },
  ];
}

export { type Product, type Plan, allPlans };
