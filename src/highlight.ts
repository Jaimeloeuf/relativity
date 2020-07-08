import * as vscode from "vscode";

import lineHighlight from "./lineHighlight";

/**
 * Used to highlight a line for user to preview jump destination
 * @function highlight
 */
function highlight(
  editor: vscode.TextEditor,
  linesToJump: number,
  charactersToJump: number,
  newPosition: vscode.Position
) {
  // Ensure linesToJump is not 0 before highlighting to prevent highlighting current line.
  if (linesToJump) {
    // Show line highlight to let user preview the jump destination
    editor.setDecorations(lineHighlight, [
      new vscode.Range(newPosition, newPosition),
    ]);
  }
}

export default highlight;
