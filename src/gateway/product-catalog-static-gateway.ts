import type { Product } from "../subscription/plans";

async function productDetailsFor(id: string): Promise<Product> {
  return Promise.resolve({
    id: id,
    name: "Morning Bliss Espresso",
    description:
      "A rich and bold espresso blend with notes of dark chocolate and a smooth finish, perfect for starting your day.",
    characteristics: ["medium-roast", "espresso", "bold"],
  });
}

async function allProducts(): Promise<Array<Product>> {
  return Promise.resolve([
    {
      id: "prd-2nuSChH",
      name: "Morning Bliss Espresso",
      description:
        "A rich and bold espresso blend with notes of dark chocolate and a smooth finish, perfect for starting your day.",
      characteristics: ["common", "medium-roast", "espresso", "bold"],
    },
    {
      id: "prd-CoPPX-5",
      name: "Velvet Roast Colombian",
      description:
        "Smooth and well-balanced, this Colombian coffee features a medium roast with hints of caramel and a bright acidity.",
      characteristics: ["common", "medium-roast", "single origin", "caramel"],
    },
    {
      id: "prd-RQBQcvr",
      name: "Dark Mountain Blend",
      description:
        "A robust blend of dark-roasted beans that delivers a deep, intense flavor with earthy undertones and a lingering finish.",
      characteristics: ["discover", "light-roast", "dark roast", "intense"],
    },
    {
      id: "prd-pIZvird",
      name: "Sunrise Guatemalan",
      description:
        "Bright and fruity, this Guatemalan coffee offers a delightful combination of citrus notes and a silky body, ideal for morning enjoyment.",
      characteristics: [
        "discover",
        "explore",
        "dark-roast",
        "fruity",
        "bright",
      ],
    },
    {
      id: "prd-IIkZDUO",
      name: "Hazelnut Dream Coffee",
      description:
        "A flavored coffee that combines the rich taste of roasted hazelnuts with a smooth coffee base, creating a delightful treat.",
      characteristics: ["discover", "dark-roast", "flavored", "hazelnut"],
    },
    {
      id: "prd-8ciKO_u",
      name: "Caramel Macchiato Delight",
      description:
        "A sweet and creamy coffee blend featuring layers of caramel and milk, perfect for those who enjoy a dessert-like coffee experience.",
      characteristics: ["explore", "dark-roast", "flavored", "sweet"],
    },
  ]);
}

export {
  productDetailsFor as staticProductDetailsFor,
  allProducts as staticAllProducts,
};
