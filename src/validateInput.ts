/**
 * Input validation function
 * @function validateInput
 * @returns Boolean of whether input is valid
 */
function validateInput(inputValue: string): Boolean {
  // const inputArray = inputValue.split(" "); // Allow space too? Allow this to be configurable

  const inputArray = inputValue
    .split(" ")
    // If input is just "-", convert it to 0 for processing as the user may not have typed finished the full number yet.
    .map((input) => (input === "-" ? 0 : input));

  // If first input is available but not a number
  if (inputArray[0] && isNaN(Number(inputArray[0]))) return false;

  // Only check if second input is a number if second input is available
  if (inputArray[1]) if (isNaN(Number(inputArray[1]))) return false;

  // Return true to indicate no issues with input value
  return true;
}

export default validateInput;
