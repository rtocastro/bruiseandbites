import classicPbj from "../assets/classicpbj.png";
import coldBrew from "../assets/coldbrew.png";

export const menuItems = [
  {
    id: "classic-pbj-strawberry",
    name: "Classic PB&J (Strawberry)",
    category: "Bite",
    price: 2.22,
    description: "Strawberry PB&J on soft white bread.",
    image: classicPbj,

    stock: 12,
    dailyLimit: 12,
    isAvailable: true,

    ingredients: ["Peanut butter", "Strawberry jam", "White bread"],

    hasNutritionFacts: true,
    frozenOvernight: true,
    featured: true,

    batchNote: "Fresh batch prepared overnight.",
  },

  {
    id: "classic-pbj-grape",
    name: "Classic PB&J (Grape)",
    category: "Bite",
    price: 2.22,
    description: "Grape PB&J on soft white bread.",
    image: classicPbj,

    stock: 0,
    dailyLimit: 12,
    isAvailable: false,

    ingredients: ["Peanut butter", "Grape jelly", "White bread"],

    hasNutritionFacts: true,
    frozenOvernight: true,
    featured: true,

    batchNote: "Next batch coming tomorrow morning.",
  },

  {
    id: "cold-brew-black",
    name: "Cold Brew (Black)",
    category: "Brew",
    price: 5.55,
    description: "Iced cold brew coffee.",
    image: coldBrew,

    stock: 0,
    dailyLimit: 10,
    isAvailable: false,

    ingredients: ["Organic dark roast coffee"],

    hasNutritionFacts: true,
    frozenOvernight: false,
    featured: true,

    batchNote: "Cold brew currently steeping.",
  },

  {
    id: "cocoliscious-cold-brew",
    name: "Cocoliscious Cold Brew",
    category: "Brew",
    price: 5.55,
    description: "Iced cold brew coffee with coconut milk.",
    image: coldBrew,

    stock: 0,
    dailyLimit: 10,
    isAvailable: false,

    ingredients: [
      "Organic dark roast coffee",
      "Coconut milk",
      "Agave",
    ],

    hasNutritionFacts: true,
    frozenOvernight: false,
    featured: true,

    batchNote: "Coconut batch sold out today.",
  },

  {
    id: "mexiliscious-cold-brew",
    name: "Mexiliscious Cold Brew",
    category: "Seasonal",
    price: 5.55,
    description:
      "Iced cold brew coffee with coconut milk and a hint of cinnamon.",
    image: coldBrew,

    stock: 0,
    dailyLimit: 8,
    isAvailable: false,

    ingredients: [
      "Organic dark roast coffee",
      "Coconut milk",
      "Agave",
      "Cinnamon",
    ],

    hasNutritionFacts: true,
    frozenOvernight: false,
    featured: true,

    batchNote: "Seasonal recipe returns soon.",
  },
];

export const categories = ["All", "Bite", "Brew", "Seasonal"];