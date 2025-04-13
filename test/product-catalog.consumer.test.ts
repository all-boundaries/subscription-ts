import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import process from "node:process";
import {
  MatchersV3,
  PactV4,
  SpecificationVersion,
  type V3MockServer,
} from "@pact-foundation/pact";
import ky from "ky";
import { like } from "@pact-foundation/pact/src/dsl/matchers";
import {
  type Plan,
  productDetailsFor,
  allProducts,
} from "../src/gateway/product-catalog-gateway";

const provider = new PactV4({
  dir: resolve(process.cwd(), "pacts"),
  consumer: "subscription",
  provider: "product-catalog",
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  logLevel: "info",
});

describe("GET /products/:id", () => {
  test("returns info about a product", async () => {
    const response: Plan = {
      id: "prd-2nuschh",
      name: "product 1",
      description: "description 1",
      status: "active",
      specs: [],
      tags: [],
    };

    const bodyMatch = MatchersV3.like(response);

    await provider
      .addInteraction()
      .given("product exists")
      .uponReceiving("retrieve a product")
      .withRequest("GET", "/products/prd-2nuSChH", (builder) => {
        builder.headers({ accept: like("application/json") });
      })
      .willRespondWith(200, (builder) => {
        builder.jsonBody(bodyMatch);
      })
      .executeTest(async (mockserver: V3MockServer) => {
        const client = ky.create({ prefixUrl: `${mockserver.url}/products` });
        return await productDetailsFor("prd-2nuSChH", client).then((res) => {
          expect(res).toEqual(response);
        });
      });
  });

  test("returns empty when retrieving all products fails", async () => {
    const response = {
      type: "probs/something-went-wrong",
      title: "We do not know what happened, please try again",
    };

    const bodyMatch = MatchersV3.like(response);

    await provider
      .addInteraction()
      .given("ops")
      .uponReceiving("retrieve products")
      .withRequest("GET", "/products/", (builder) => {
        builder.headers({ accept: like("application/json") });
      })
      .willRespondWith(503, (builder) => {
        builder.jsonBody(bodyMatch);
      })
      .executeTest(async (mockserver: V3MockServer) => {
        const client = ky.create({
          prefixUrl: `${mockserver.url}/products`,
        });

        return await allProducts(client).then(async (res) => {
          expect(res).toEqual([]);
        });
      });
  });
});
