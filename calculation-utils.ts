// // Example usage:
// const bac = calculateBAC(4, 150, "male", 2);
// console.log(`Estimated BAC: ${bac.toFixed(4)}%`);
export function calculateBAC(
  drinks: number,
  weight: number,
  gender: string,
  minutes: number
) {
  // r is the Widmark factor, which is 0.55 for women and 0.68 for men
  if (gender !== "male" && gender !== "female") {
    console.error('Invalid gender. Please specify "male" or "female".');
    return null;
  }

  function calculateGramsOfAlcohol(ounces: number, abv: number): number {
    if (ounces < 0 || abv < 0 || abv > 100) {
      throw new Error(
        "Invalid input. Ounces and ABV must be non-negative, and ABV must be between 0 and 100."
      );
    }

    // Calculate grams of alcohol using the formula: Grams = Ounces * (ABV / 100) * 28.3495
    const gramsOfAlcohol = ounces * (abv / 100) * 28.3495;

    return gramsOfAlcohol;
  }

  const r = gender === "male" ? 0.68 : 0.55;

  // The Widmark Equation: BAC = (Alcohol Consumed in grams / (Body Weight in grams * r)) * 100 - (Metabolism Rate * minutes Passed)
  const alcoholConsumed = drinks * 14; // Assuming a standard drink contains 14 grams of pure alcohol
  const bodyWeight = weight * 453.592; // Convert weight from pounds to grams
  const metabolismRate = 0.017; // Average metabolism rate per hour. The actual metabolism rate can range from around 0.015 to 0.020 or even higher, depending on various factors like age, health, genetics, and other individual differences.
  const hours = minutes / 60;
  const bac =
    (alcoholConsumed / (bodyWeight * r)) * 100 - metabolismRate * hours;

  // BAC should not go below 0
  return Math.max(0, bac);
}

export function calculateHoursAndMinutes(milliseconds: number): {
  timeString: string;
  totalMinutes: number;
} {
  if (milliseconds < 0) {
    throw new Error("Input must be a non-negative number of milliseconds");
  }

  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let timeString: string;
  if (hours) {
    timeString = `${hours} hours and ${minutes} minutes`;
  } else {
    timeString = `${minutes} minutes`;
  }

  return { timeString, totalMinutes };
}

export function calculateGramsOfAlcohol(ounces: number, abv: number): number {
  if (ounces < 0 || abv < 0 || abv > 100) {
    throw new Error(
      "Invalid input. Ounces and ABV must be non-negative, and ABV must be between 0 and 100."
    );
  }

  // Calculate grams of alcohol using the formula: Grams = Ounces * (ABV / 100) * 28.3495
  const gramsOfAlcohol = ounces * (abv / 100) * 28.3495;

  return gramsOfAlcohol;
}
