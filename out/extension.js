"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const curlsPath = vscode.workspace.getConfiguration("curly").get("curlsPath");
    if (!curlsPath || curlsPath.length === 0) {
        vscode.window.showInformationMessage("To use curls, configure the Curls Path setting and reload Visual Studio Code.");
        return;
    }
    const serverOptions = {
        run: { command: curlsPath },
        debug: { command: curlsPath }
    };
    const clientOptions = {
        documentSelector: [{ scheme: "file", language: "curly" }]
    };
    client = new node_1.LanguageClient("curls", "Curls", serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    client === null || client === void 0 ? void 0 : client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map