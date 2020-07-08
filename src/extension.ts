// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";

import setup from "./setup";
import parseInput from "./parseInput";
import createNewPosition from "./createNewPosition";
import shiftVisibleRange from "./shiftVisibleRange";
import deleteHighlight from "./deleteHighlight";
import newPeekline from "./newPeekline";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // These code will only be executed once when your extension is activated

  // Not awaiting to prevent this from blocking / delaying command registration
  setup();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const registeredCommandGoto = vscode.commands.registerCommand(
    "relativity.goto",
    async () => {
      // Get the current editor
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;

      // If the current editor is undefined (meaning user focus not on a editor), just ignore the command
      if (!editor) return;

      // Get input from user
      const input: string | undefined = await vscode.window.showInputBox({
        value: "0",
        prompt: "Jump using relative number of lines",
        validateInput: newPeekline(editor),
      });
      // Delete highlight generated in preview function
      deleteHighlight(editor);

      // End if input box closed after losing focus or if user pressed esc or if user pressed enter with no input
      if (input === undefined || input === "") {
        // Replace visible range/viewPort with how it was before the preview
        editor.revealRange(
          new vscode.Range(editor.selection.active, editor.selection.active),
          vscode.TextEditorRevealType.InCenterIfOutsideViewport
        );

        return;
      }

      // Get lines to jump and characters to jump from input
      const { linesToJump, charactersToJump } = parseInput(input);

      // Create the new end position using linesToJump
      const newPosition: vscode.Position = createNewPosition(
        editor,
        linesToJump,
        charactersToJump
      );

      // Create new selection object where the start and end positions are the same, to make it a singular cursor movement
      const newSelection: vscode.Selection = new vscode.Selection(
        newPosition,
        newPosition
      );

      // Set new selection onto current text editor
      editor.selection = newSelection;

      // Shifts visible range if needed
      shiftVisibleRange(editor, newPosition);
    }
  );

  const registeredCommandSelect = vscode.commands.registerCommand(
    "relativity.select",
    async () => {
      // Get the current editor
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;

      // If the current editor is undefined (meaning user focus not on a editor), just ignore the command
      if (!editor) return;

      // Get input from user
      const input: string | undefined = await vscode.window.showInputBox({
        value: "0",
        prompt: "Select using relative number of lines",
        validateInput: newPeekline(editor),
      });
      // Delete highlight generated in preview function
      deleteHighlight(editor);

      // End if input box closed after losing focus or if user pressed esc or if user pressed enter with no input
      if (input === undefined || input === "") {
        // Replace visible range/viewPort with how it was before the preview
        editor.revealRange(
          new vscode.Range(editor.selection.active, editor.selection.active),
          vscode.TextEditorRevealType.InCenterIfOutsideViewport
        );

        return;
      }

      // Get lines to jump and characters to jump from input
      const { linesToJump, charactersToJump } = parseInput(input);

      // Create the new end position using linesToJump
      const newPosition: vscode.Position = createNewPosition(
        editor,
        linesToJump,
        charactersToJump
      );

      // Create new selection object where the start and end positions are the same, to make it a singular cursor movement
      const newSelection: vscode.Selection = new vscode.Selection(
        // @todo Make this user configurable. But by default, include what is already selected using anchor position.
        editor.selection.anchor, // Keep what is already selected if any
        newPosition
      );

      // Set new selection onto current text editor
      editor.selection = newSelection;

      // Shifts visible range if needed
      shiftVisibleRange(editor, newPosition);
    }
  );

  context.subscriptions.push(registeredCommandGoto);
  context.subscriptions.push(registeredCommandSelect);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // No clean up code required for this extension
}
