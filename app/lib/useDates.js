"use client"
import { useEffect, useState } from 'react'

export function useDates() {
    const [currentShop, setCurrentShop] = useState();

  const setDay = (date) => {
    let localDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Monterrey"}));
    if (localDate.getHours() < 18) {
      localDate.setDate(localDate.getDate() - 1);
    }
    localDate.setHours(18, 0, 0, 0);
    return localDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const currentTime = new Date();
    setCurrentShop(setDay(currentTime));
  }, []);

  return { currentShop };
}