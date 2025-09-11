import ky from "ky";
import { envConfig } from "../plumbling/env-config";

export type Plan = {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  specs: Array<string>;
  tags: Array<string>;
};

const productCatalogClient = ky.create({
  prefixUrl: `${envConfig.SVC_PRODUCT_CATALOG_URL}/products`,
});

export async function productDetailsFor(
  id: string,
  client = productCatalogClient,
): Promise<Plan> {
  return client.get(id).json<Plan>();
}

export async function allProducts(
  client = productCatalogClient,
): Promise<Array<Plan>> {
  return client
    .get("")
    .json<{ data: Array<Plan> }>()
    .then((r) => r.data)
    .catch(() => []);
}
