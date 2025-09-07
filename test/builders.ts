import { faker } from "@faker-js/faker";
import type { Subscription } from "../src/subscription/subscription";
import type { Plan } from "../src/subscription/plans";

export function planBuilder(overwrites?: Partial<Plan>): Plan {
  return {
    id: faker.helpers.fromRegExp("[a-d0-6]{5,10}"),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    status: faker.helpers.arrayElement(["active", "inactive"]),
    specs: [],
    tags: [],
    ...overwrites,
  };
}

export function subscriptionBuilder(
  overwrites?: Partial<Subscription>,
): Subscription {
  const startDate = faker.date.soon();
  const renewOn = faker.date.future({ years: 1, refDate: startDate });

  return {
    userId: faker.helpers.fromRegExp("[a-d0-6]{5,10}"),
    planId: faker.helpers.fromRegExp("[a-d0-6]{5,10}"),
    startDate,
    id: faker.helpers.fromRegExp("[a-d0-6]{5,10}"),
    renewOn: renewOn,
    status: faker.helpers.arrayElement(["active", "cancelled", "ended"]),
    ...overwrites,
  };
}
