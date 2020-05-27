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
  // If user cleared the input box, with nothing inside, it will be an empty string.
  // Return 0 for linesToJump, so the editor can scroll view port back to original line if needed
  if (input === "") {
    return { linesToJump: 0 };
  } else {
    // Convert input from string to number
    const linesToJump = parseInt(input);

    return { linesToJump };
  }
}

export default parseInput;
