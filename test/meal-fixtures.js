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

function makeMaliciousMeal() {
    const maliciousMeal = {
        id: 911,
        meal_name: 'Test meal with script <script>alert("xss");</script>',
        meal_description: 'Test description with script <script>alert("xss");</script>',
        restaurant_name: 'Bad image in content <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. More <strong>content</strong>',
        meal_location: 'Test location with script <script>alert("xss");</script>',
        // price: "12.99",
        // is_vegan: true,
        // is_vegetarian: true,
        // is_glutenfree: false,
    }
    const expectedMeal = {
        ...maliciousMeal,
        meal_name: 'Test meal with script &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        meal_description: 'Test description with script &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        restaurant_name: 'Bad image in content <img src="https://url.to.file.which/does-not.exist">. More <strong>content</strong>',
        meal_location: 'Test location with script &lt;script&gt;alert(\"xss\");&lt;/script&gt;'  
    }
    return {
        maliciousMeal,
        expectedMeal
    }
}
module.exports = {
    makeMealArray,
    makeMaliciousMeal
}