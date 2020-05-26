/**
 * Parse input string
 * @function parseInput
 */
function parseInput(
  input: string
): {
  linesToJump: number;
  // characterDestination: number;
} {
  // Convert input from string to number
  const linesToJump = parseInt(input);

  return { linesToJump };
}

export default parseInput;
