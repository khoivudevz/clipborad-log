// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "clipboard-log" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('clipboard-log.paste', async () => {
		const editor = vscode.window.activeTextEditor

		if (!editor) {
			vscode.window.showWarningMessage('No active editor!')
			return
		}

		// Get text from clipboard
		const clipboardText = await vscode.env.clipboard.readText()

		if (clipboardText) {
			editor.edit((editBuilder) => {
				const selection = editor.selection
				editBuilder.replace(selection, `console.log('🚀~${clipboardText} :', ${clipboardText})`)
			})
		} else {
			vscode.window.showWarningMessage('Clipboard is empty!')
		}
	})

	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
