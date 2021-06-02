function makeMealArray() {
    return [
        {
            id: 1,
            meal_name: 'Vadouvan Spiced Vegetables',
            meal_description: 'Sautéed Seasonal Vegetables, Crispy Corn Cake with Coconut-Vadouvan Jus and Pickled Mustard Seeds',
            restaurant_name: 'Be Our Guest',
            meal_location: 'Magic Kingdom',
            price: "62.00",
            is_vegan: true,
            is_vegetarian: true,
            is_glutenfree: false,
        },
        {
            id: 2,
            meal_name: 'Chickpea Panisse',
            meal_description: 'Sautéed SeasCrispy Chickpeas Panisse, Tomato Jam, Roasted Carrots, Chermoula-spiced Garbanzos, and Chive Powder',
            restaurant_name: "Cinderella's Royal Table",
            meal_location: 'Magic Kingdom',
            price: "62.00",
            is_vegan: true,
            is_vegetarian: true,
            is_glutenfree: true,
        },    
        {
            id: 3,
            meal_name: 'BBQ Jackfruit Burger',
            meal_description: 'Plant-based Burger on Garlic Toast topped with BBQ Jackfruit, Plant-based Mayonnaise and Lettuce served with your choice of side',
            restaurant_name: 'Regal Eagle Smokehouse',
            meal_location: 'Epcot',
            price: "12.99",
            is_vegan: true,
            is_vegetarian: true,
            is_glutenfree: false,
        }
    ]
}

module.exports = {
    makeMealArray
}