import ky from "ky";
import { envConfig } from "../plumbling/env-config";
import z from "zod";
import type { Product } from "../subscription/plans";

const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  specs: z.array(z.string()),
  tags: z.array(z.string()),
});

type ProductResponse = z.infer<typeof productResponseSchema>;

const productCatalogClient = ky.create({
  prefixUrl: `${envConfig.SVC_PRODUCT_CATALOG_URL}/products`,
});

async function productDetailsFor(
  id: string,
  client = productCatalogClient,
): Promise<Product> {
  return client
    .get(id)
    .json()
    .then(productResponseSchema.parse)
    .then(responseToProduct);
}

async function allProducts(
  client = productCatalogClient,
): Promise<Array<Product>> {
  return client
    .get("")
    .json<{ data: Array<ProductResponse> }>()
    .then((json) => json.data.map((p) => productResponseSchema.parse(p)))
    .then((response) => response.map(responseToProduct))
    .catch(() => []);
}

function responseToProduct(response: ProductResponse): Product {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    characteristics: [...response.specs, ...response.tags],
  };
}

export { productDetailsFor, allProducts };
