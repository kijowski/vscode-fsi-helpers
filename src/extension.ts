// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { findTopLevelFormBounds, findAdjacentTopLevelForms } from "./finders";

function selectTopLevelForm() {
  let editor = vscode.window.activeTextEditor;
  if (editor != null) {
    let data = editor.document.getText();
    let cursorPos = editor.document.offsetAt(editor.selection.anchor);

    let bounds = findAdjacentTopLevelForms(data, cursorPos);

    if (bounds != null) {
      editor.selection = new vscode.Selection(
        editor.document.positionAt(bounds.current),
        editor.document.positionAt(bounds.next)
      );
    }
    return bounds != null;
  }
}

function goToCurrentTopLevelForm() {
  let editor = vscode.window.activeTextEditor;
  if (editor != null) {
    let data = editor.document.getText();
    let cursorPos = editor.document.offsetAt(editor.selection.anchor);

    let bounds = findAdjacentTopLevelForms(data, cursorPos);

    if (bounds != null) {
      editor.selection = new vscode.Selection(
        editor.document.positionAt(bounds.current),
        editor.document.positionAt(bounds.current)
      );
      editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
    }
    return bounds != null;
  }
}

function goToPreviousForm() {
  let editor = vscode.window.activeTextEditor;
  if (editor != null) {
    let data = editor.document.getText();
    let cursorPos = editor.document.offsetAt(editor.selection.anchor);

    let bounds = findAdjacentTopLevelForms(data, cursorPos);

    if (bounds != null) {
      editor.selection = new vscode.Selection(
        editor.document.positionAt(bounds.previous),
        editor.document.positionAt(bounds.previous)
      );
      editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
    }
    return bounds != null;
  }
}

function goToNextForm() {
  let editor = vscode.window.activeTextEditor;
  if (editor != null) {
    let data = editor.document.getText();
    let cursorPos = editor.document.offsetAt(editor.selection.anchor);

    let bounds = findAdjacentTopLevelForms(data, cursorPos);

    if (bounds != null) {
      editor.selection = new vscode.Selection(
        editor.document.positionAt(bounds.next),
        editor.document.positionAt(bounds.next)
      );
      editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
    }
    return bounds != null;
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("fsi-helpers.goToPreviousTopLevelForm", goToPreviousForm)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("fsi-helpers.goToNextTopLevelForm", goToNextForm)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("fsi-helpers.goToCurrentTopLevelForm", goToCurrentTopLevelForm)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("fsi-helpers.selectTopLevelForm", selectTopLevelForm)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
