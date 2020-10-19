// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {	
	let disposable = vscode.commands.registerCommand('unstupidize.unstupidize', function test_fun() {
		var editor = vscode.window.activeTextEditor;

		if (editor) {
			// Get document and selection
			var document = editor.document;
			var selection = editor.selection;
			var selection_mod = document.getText(selection);

			// Replacements
			selection_mod = selection_mod.replace(/(,\r\n)/gm, ',');
			selection_mod = selection_mod.replace(/(,\s*)/gm, ', ');
			selection_mod = selection_mod.replace(/(\(\n)/gm, '(');
			selection_mod = selection_mod.replace(/(\(\s*)/gm, '(');
			selection_mod = selection_mod.replace(/(,\s\))/gm, ')');
			selection_mod = selection_mod.replace(/(\)\r\n\])/gm, ')]');
			selection_mod = selection_mod.replace(/(\]\s*\))/gm, '])');
			selection_mod = selection_mod.replace(/(\[\n\s*)/gm, '[');
			selection_mod = selection_mod.replace(/(\)\n\])/gm, ')]');
			selection_mod = selection_mod.replace(/(\n\))/gm, ')');
			selection_mod = selection_mod.replace(/(\)\n\s*\])/gm, ')]');
			selection_mod = selection_mod.replace(/(\{\n\s*")/gm, '{"');
			selection_mod = selection_mod.replace(/(,\s*\})/gm, '}');
			selection_mod = selection_mod.replace(/(\]\s*\])/gm, ']]');
		
			

			// Clean and fix
			editor.edit(editBuilder => {
				editBuilder.replace(selection, selection_mod);
				//editBuilder.insert(editor.document.lineAt(0).range.start, selection_mod);
			});
		}

		vscode.window.showInformationMessage('Unstupidized!');
	});


	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
