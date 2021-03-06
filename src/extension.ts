// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const curlsPath: string | undefined = vscode.workspace.getConfiguration("curly").get("curlsPath");

	if (!curlsPath || curlsPath.length === 0) {
		vscode.window.showInformationMessage("To use curls, configure the Curls Path setting and reload Visual Studio Code.");
		return;
	}

	const serverOptions: ServerOptions = {
		run: {command: curlsPath},
		debug: {command: curlsPath}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{scheme: "file", language: "curly"}]
	};

	client = new LanguageClient(
		"curls",
		"Curls",
		serverOptions,
		clientOptions	
	);

	client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {
	client?.stop();
}
