/*eslint curly: off*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

async function setup() {
  // Get the configuration/settings
  const configuration = vscode.workspace.getConfiguration();

  // Get the current settings for editor.lineNumbers
  const initialSetting = configuration.get("editor.lineNumbers");

  // If the current setting is not using relative line numbers,
  // Update global settings to change line numbers use relative numbers
  if (initialSetting !== "relative") {
    await vscode.workspace
      .getConfiguration()
      .update(
        "editor.lineNumbers",
        "relative",
        vscode.ConfigurationTarget.Global
      );
    console.log(
      "Updated 'editor.lineNumbers' settings to: ",
      vscode.workspace.getConfiguration().get("editor.lineNumbers")
    );
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // These code will only be executed once when your extension is activated
  await setup();
  console.log("Congratulations, your extension 'relative-goto' is now active!");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "relative-goto.goto",
    async () => {
      // The code you place here will be executed every time your command is executed

      // Get input from user
      const input: string | undefined = await vscode.window.showInputBox({
        placeHolder: "Relative number of lines to jump",
        prompt: "Jump using relative lines",
      });
      // End if input box closed after losing focus
      if (input === undefined) return;
      // Convert input from string to number
      const newLine = parseInt(input);

      // Get the current editor and assume it will not be undefined
      const editor: vscode.TextEditor = vscode.window.activeTextEditor!;

      // Create new position object by applying relative jump while maintaining same character position
      // Use the active position of selection instead of anchor/start/end to move based on current cursor line
      const newPosition: vscode.Position = new vscode.Position(
        editor.selection.active.line + newLine,
        editor.selection.active.character
      );

      // Create new selection object where the start and end positions are the same, to make it a singular cursor movement
      const newSelection: vscode.Selection = new vscode.Selection(
        newPosition,
        newPosition
      );

      // Set the new selection to move the cursor
      editor.selection = newSelection;

      // If the new position is out of the editor's top and bottom visible range
      // Move the visible range to show the new position at the center of the editor
      if (!editor.visibleRanges[0].contains(newPosition)) {
        // Create a new range that is a singular position based on newPosition/jump-destination
        const newRange: vscode.Range = new vscode.Range(
          newPosition,
          newPosition
        );
        // Move the editor's visible range to the newRange and scroll jump destination to center of editor
        editor.revealRange(newRange, vscode.TextEditorRevealType.InCenter);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // No clean up code required for this extension
}
