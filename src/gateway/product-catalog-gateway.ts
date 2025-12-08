import type { KyInstance } from "ky";
import { envConfig } from "../plumbling/env-config";
import type { Product } from "../subscription/plans";
import {
  remoteAllProducts,
  remoteProductDetailsFor,
} from "./product-catalog-remote-gateway";
import {
  staticAllProducts,
  staticProductDetailsFor,
} from "./product-catalog-static-gateway";

type ProductDetailsForFn = (
  id: string,
  client?: KyInstance,
) => Promise<Product>;
type AllProductsFn = (client?: KyInstance) => Promise<Array<Product>>;

function remoteOrStatic<T>(remoteGateway: T, staticGateway: T) {
  if (envConfig.PRODUCT_CATALOG_GATEWAY === "remote") {
    return remoteGateway;
  }
  return staticGateway;
}

const productDetailsFor = remoteOrStatic<ProductDetailsForFn>(
  remoteProductDetailsFor,
  staticProductDetailsFor,
);

const allProducts = remoteOrStatic<AllProductsFn>(
  remoteAllProducts,
  staticAllProducts,
);

export {
  type AllProductsFn,
  type ProductDetailsForFn,
  allProducts,
  productDetailsFor,
};
