import * as vscode from "vscode";
import lineHighlight from "./lineHighlight";

/**
 * Deletes all highlights in the editor that matches the highlight pattern.
 * @function deleteHighlight
 * @param editor the current active text editor
 */
function deleteHighlight(editor: vscode.TextEditor) {
  editor.setDecorations(lineHighlight, []);
}

export default deleteHighlight;
