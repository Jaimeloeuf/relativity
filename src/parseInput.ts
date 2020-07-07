/**
 * Parse input string
 * @function parseInput
 */
function parseInput(
  input: string
): {
  linesToJump: number;
  charactersToJump: number;
} {
  // If user cleared the input box, with nothing inside, it will be an empty string.
  // Return 0 for linesToJump, so the editor can scroll view port back to original line if needed
  if (input === "") {
    return { linesToJump: 0, charactersToJump: 0 };
  } else {
    // @todo Allow user to set characted to split by and defaults to space.
    const inputArray = input.split(" ");

    /* Convert input from string to number if input part is available, else defaults to 0 */
    const linesToJump = inputArray[0] ? parseInt(inputArray[0]) : 0;
    const charactersToJump = inputArray[1] ? parseInt(inputArray[1]) : 0;

    return { linesToJump, charactersToJump };
  }
}

export default parseInput;
