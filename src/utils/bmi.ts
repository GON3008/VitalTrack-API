/**
 * Calculate BMI from height (cm) and weight (kg).
 * Pure function — no side effects, easy to unit test.
 * @returns BMI rounded to 2 decimal places, or null if inputs are invalid.
 */
export const calculateBmi = (heightCm: number, weightKg: number): number | null => {
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null;
    const heightM = heightCm / 100;
    return Math.round((weightKg / (heightM * heightM)) * 100) / 100;
};

/**
 * Classify BMI into a human-readable category.
 */
export const classifyBmi = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};
