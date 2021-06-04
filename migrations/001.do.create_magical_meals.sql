CREATE TABLE magical_meals (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    meal_name TEXT NOT NULL,
    meal_description TEXT NOT NULL,
    restaurant_name TEXT NOT NULL,
    meal_location TEXT NOT NULL,
    price NUMERIC,
    is_vegan BOOLEAN,
    is_vegetarian BOOLEAN,
    is_glutenfree BOOLEAN,
);

