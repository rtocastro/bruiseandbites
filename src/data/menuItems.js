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

        nutrition: {
            servingSize: "1 cup",
            calories: 5,
            caffeineMg: 100,
            totalFatG: 0,
            saturatedFatG: 0,
            sodiumMg: 0,
            totalCarbsG: 0,
            notes: ["Cold brew coffee only."],
        },
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

        nutrition: {
            servingSize: "1 cup",
            calories: 35,
            caffeineMg: 100,
            totalFatG: 1,
            saturatedFatG: 0.875,
            sodiumMg: 1.25,
            totalCarbsG: 5.31,
            notes: [
                "Cold brew coffee: 5 calories",
                "Coconut milk: 10 calories",
                "Agave: 20 calories",
            ],
        },

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