import * as readlineSync from 'readline-sync';

/**
 * Prompts the user for input with a given question and returns the input string.
 * @param question The question to display to the user.
 * @returns The user's input as a string.
 */
export function getUserInput(question: string): string {
  return readlineSync.question(`${question}: `);
}
