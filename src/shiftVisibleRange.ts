import * as vscode from "vscode";

/**
 * Shifts visible range of editor if new selection's active position exceeds editor's
 * current visible range, and reveal new active position in center of visible range.
 * Where the new active position is the newly calculated "newPosition" value
 * @function shiftVisibleRange
 */
function shiftVisibleRange(
  editor: vscode.TextEditor,
  newPosition: vscode.Position
) {
  // If the new position is out of the editor's top and bottom visible range
  // Move the visible range to show the new position at the center of the editor
  if (!editor.visibleRanges[0].contains(newPosition)) {
    // Create a new range that is a singular position based on newPosition/jump-destination
    const newRange: vscode.Range = new vscode.Range(newPosition, newPosition);
    // Move the editor's visible range to the newRange and scroll jump destination to center of editor
    editor.revealRange(newRange, vscode.TextEditorRevealType.InCenter);
  }
}

export default shiftVisibleRange;
