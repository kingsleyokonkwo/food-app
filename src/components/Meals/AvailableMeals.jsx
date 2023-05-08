import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-8d51b-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [isLoading]);

  const MealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {error && (
          <section className={classes.MealsError}>
            <p>{error}</p>
          </section>
        )}
        {isLoading && (
          <section className={classes.Mealsloading}>
            <p>Loading...</p>
          </section>
        )}
        <ul>{!isLoading && MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
