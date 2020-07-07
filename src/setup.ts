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
    vscode.window.setStatusBarMessage(
      `Updated 'editor.lineNumbers' settings to: ${vscode.workspace
        .getConfiguration()
        .get("editor.lineNumbers")}`,
      5000
    );
  }
}

export default setup;
