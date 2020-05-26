import * as vscode from "vscode";

/**
 * Decoration for highlighting a line to preview the jump destination.
 */
const lineHighlight: vscode.TextEditorDecorationType = vscode.window.createTextEditorDecorationType(
  {
    isWholeLine: true,
    borderColor: new vscode.ThemeColor("editor.lineHighlightBorder"),
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: new vscode.ThemeColor("editor.lineHighlightBackground"),
  }
);

export default lineHighlight;
