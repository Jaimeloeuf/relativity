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

/**
 * Parse input string
 * @function parseInput
 */
function parseInput(
  input: string
): {
  linesToJump: number;
  // characterDestination: number;
} {
  // Convert input from string to number
  const linesToJump = parseInt(input);

  return { linesToJump };
}

/**
 * Creates a position new position object which will be used as the active position (final cursor position) of the new selection
 */
function createNewPosition(editor: vscode.TextEditor, linesToJump: number) {
  // Use active position of selection instead of "anchor/start/end" to move based on current cursor line
  let newLine = editor.selection.active.line + linesToJump;
  // If newLine exceeds upper screen/document limit of line 0, reset the newLine value to 0
  if (newLine < 0) newLine = 0;
  // If newLine exceeds lower screen/document limit, vscode will just jump to last line, last character.

  // Create new position object by applying relative jump while maintaining same character position
  const newPosition: vscode.Position = new vscode.Position(
    newLine,
    editor.selection.active.character
  );

  return newPosition;
}

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

/**
 * Deletes all highlights in the editor that matches the highlight pattern.
 * @function deleteHighlight
 * @param editor the current active text editor
 */
function deleteHighlight(editor: vscode.TextEditor) {
  editor.setDecorations(lineHighlight, []);
}

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
    if (isNaN(Number(inputValue))) return "Invalid input";

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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // These code will only be executed once when your extension is activated
  await setup();
  vscode.window.showInformationMessage(
    "Congratulations, your extension 'relative-goto' is now active!"
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const registeredCommandGoto = vscode.commands.registerCommand(
    "relative-goto.goto",
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
      // End if input box closed after losing focus or if user pressed esc or if user pressed enter with no input
      if (input === undefined || input === "") return;
      // Convert input from string to number
      const { linesToJump } = parseInput(input);

      // Delete the highlight generated in preview function
      deleteHighlight(editor);

      // Create the new end position using linesToJump
      const newPosition = createNewPosition(editor, linesToJump);

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
    "relative-goto.select",
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
      // End if input box closed after losing focus or if user pressed esc or if user pressed enter with no input
      if (input === undefined || input === "") return;
      // Convert input from string to number
      const { linesToJump } = parseInput(input);

      // Delete the highlight generated in preview function
      deleteHighlight(editor);

      const newPosition = createNewPosition(editor, linesToJump);

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
