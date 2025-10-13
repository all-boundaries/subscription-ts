import { describe, expect, it } from "bun:test";
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
  productDetailsFor,
  allProducts,
} from "../../src/gateway/product-catalog-gateway";
import type { Product } from "../../src/subscription/plans";

const provider = new PactV4({
  dir: resolve(process.cwd(), "pacts"),
  consumer: "subscription",
  provider: "product-catalog",
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  logLevel: "info",
});

/**
 * Defines expected response from Product Catalog when fetching products.
 *
 * Application architecture concept:
 *  - `Gateway --> Client --> Server`
 *
 * Test boundary implementation:
 *  - `productCatlogGateway --> productCatalogClient --> pactServerStub`
 *  - It tests both the gateway and the client.
 *
 * Pact creates a stub server to simulate the response described in the
 * contract, removing the need of us manually creating a stub.
 */
describe("GET /products/:id", () => {
  it("returns info about a product", async () => {
    const response: Product = {
      id: "prd-2nuschh",
      name: "product 1",
      description: "description 1",
      characteristics: ["fruity", "dark"],
    };

    const bodyMatch = MatchersV3.like({
      id: "prd-2nuschh",
      name: "product 1",
      description: "description 1",
      status: "active",
      specs: ["fruity"],
      tags: ["dark"],
    });

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

  it("returns all products", async () => {
    const response: Array<Product> = [
      {
        id: "prd-2nuschh",
        name: "product 1",
        description: "description 1",
        characteristics: ["fruity", "dark"],
      },
    ];

    const bodyMatch = MatchersV3.like({
      data: [
        {
          id: "prd-2nuschh",
          name: "product 1",
          description: "description 1",
          status: "active",
          specs: ["fruity"],
          tags: ["dark"],
        },
      ],
    });

    await provider
      .addInteraction()
      .given("many products exists")
      .uponReceiving("retrieve all product")
      .withRequest("GET", "/products/", (builder) => {
        builder.headers({ accept: like("application/json") });
      })
      .willRespondWith(200, (builder) => {
        builder.jsonBody(bodyMatch);
      })
      .executeTest(async (mockserver: V3MockServer) => {
        const client = ky.create({ prefixUrl: `${mockserver.url}/products` });
        return await allProducts(client).then((res) => {
          expect(res).toEqual(response);
        });
      });
  });

  it("returns empty when retrieving all products fails", async () => {
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
