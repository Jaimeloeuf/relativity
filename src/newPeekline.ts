import * as vscode from "vscode";

import validateInput from "./validateInput";
import parseInput from "./parseInput";
import createNewPosition from "./createNewPosition";
import highlight from "./highlight";
import deleteHighlight from "./deleteHighlight";

/**
 * Used to generate inner peekline function with editor argument in its closure
 * @function newPeekline
 * @param editor the current active text editor
 */
function newPeekline(editor: vscode.TextEditor) {
  /**
   * Used as the Input validation function, that is used to both validate input and show preview of the jump destination.
   * @function peekline
   */
  function peekline(
    inputValue: string
  ): string | undefined | null | Thenable<string | undefined | null> {
    // Delete the highlight first before parsing input value
    deleteHighlight(editor);

    // If input value is invalid, end function and return error diagnostic message
    if (!validateInput(inputValue)) return "Invalid input";

    // Convert input from string to number
    const { linesToJump, charactersToJump } = parseInput(inputValue);

    // Create new position/jump destination from user's input
    const newPosition: vscode.Position = createNewPosition(
      editor,
      linesToJump,
      charactersToJump
    );

    highlight(editor, linesToJump, charactersToJump, newPosition);

    // If new position is out of editor's top and bottom visible range
    // Move visible range to show new position in the center of the editor
    if (!editor.visibleRanges[0].contains(newPosition)) {
      // Move editor's visible range to put jump destination at the center of the editor if out of viewport
      editor.revealRange(
        new vscode.Range(newPosition, newPosition),
        vscode.TextEditorRevealType.InCenterIfOutsideViewport
      );
    }

    // Return undefined to indicate no issues with input value
    return;
  }

  return peekline;
}

export default newPeekline;
