import * as vscode from 'vscode';
import * as functions from './functions';
import {
  NotAdbFound,
  NotPortCreated,
  NotValidIp,
  NotConnected,
} from './exceptions';

let ipDevice: string;

export function activate(context: vscode.ExtensionContext) {
  let connect = vscode.commands.registerCommand(
    'adb-wlan.connect',
    async () => {
      try {
        await functions.checkIfAdbExist;

        ipDevice = (await vscode.window.showInputBox({
          prompt: 'Enter your phone ip',
        })) as string;

        if (!ipDevice) {
          throw NotValidIp;
        }

        await functions.connectToHost(ipDevice);

        vscode.window.showInformationMessage(`Deviced ${ipDevice} connected!`);

        
      } catch (error) {
        if (error instanceof NotAdbFound) {
          vscode.window.showErrorMessage('ERROR, ADB not found!');
        }
        if (error instanceof NotPortCreated) {
          vscode.window.showErrorMessage(
            `NOT POSSIBLE CREATE PORT ${error.message}`
          );
        }
        if (error instanceof NotValidIp) {
          vscode.window.showErrorMessage(`ENTER A VALID IP`);
        }
        if (error instanceof NotConnected) {
          vscode.window.showErrorMessage(
            `NOT POSSIBLE CONNECT ${error.message}`
          );
        }
      }
    }
  );

  let disconnect = vscode.commands.registerCommand(
    'adb-wlan.disconnect',
    async () => {
      await functions
        .disconnectToHost(ipDevice)
        .catch((err) =>
          vscode.window.showErrorMessage(`NOT POSSIBLE DISCONNECT ${err}`)
        );
      vscode.window.showInformationMessage(`Device ${ipDevice} disconnected`);
    }
  );

  context.subscriptions.push(connect);
  context.subscriptions.push(disconnect);
}

export async function deactivate() {}
