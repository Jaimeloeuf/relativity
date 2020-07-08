import * as vscode from "vscode";

/**
 * Creates a position new position object which will be used as the active position (final cursor position) of the new selection
 */
function createNewPosition(
  editor: vscode.TextEditor,
  linesToJump: number,
  charactersToJump: number = 0
): vscode.Position {
  // Use active position of selection instead of "anchor/start/end" to move based on current cursor line
  let newLine = editor.selection.active.line + linesToJump;
  // If newLine exceeds lower screen/document limit, vscode will just jump to last line, last character.
  // If newLine exceeds upper screen/document limit of line 0, reset the newLine value to 0
  if (newLine < 0) {
    newLine = 0;
  }

  // Use active position of selection instead of "anchor/start/end" to move based on current cursor line
  let newCharacter = editor.selection.active.character + charactersToJump;
  // If newCharacter exceeds last character limit, vscode will just jump to the last character.
  // If newCharacter exceeds first character limit of character 0, reset the newCharacter value to 0 to prevent vscode from counting from the back
  if (newCharacter < 0) {
    newCharacter = 0;
  }

  // Create new position object by applying relative jump while maintaining same character position
  const newPosition: vscode.Position = new vscode.Position(
    newLine,
    newCharacter
  );

  return newPosition;
}

export default createNewPosition;
