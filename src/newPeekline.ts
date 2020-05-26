import * as vscode from "vscode";

import parseInput from "./parseInput";
import createNewPosition from "./createNewPosition";
import lineHighlight from "./lineHighlight";
import deleteHighlight from "./deleteHighlight";

/**
 * Used to generate inner peekline function with editor argument in its closure
 * @function newPeekline
 * @param editor the current active text editor
 */
function newPeekline(editor: vscode.TextEditor) {
  /**
   * Input validation function, that is used to validate input and show preview of the jump destination.
   * @function peekline
   */
  function peekline(
    inputValue: string
  ): string | undefined | null | Thenable<string | undefined | null> {
    // Delete the highlight first before parsing input value
    deleteHighlight(editor);
    // If input value is bad, show error diagnostic message back
    if (isNaN(Number(inputValue))) {
      return "Invalid input";
    }
    // Convert input from string to number
    const { linesToJump } = parseInput(inputValue);
    // Ensure linesToJump is not 0 before highlighting to prevent highlighting current line.
    if (linesToJump) {
      const newPosition = createNewPosition(editor, linesToJump);
      // Show line highlight to let user preview the jump destination
      editor.setDecorations(lineHighlight, [
        new vscode.Range(newPosition, newPosition),
      ]);
    }
    // Return undefined to indicate no issues with input value
    return;
  }
  return peekline;
}

export default newPeekline;
