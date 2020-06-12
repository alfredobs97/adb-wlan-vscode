import { exec } from 'child_process';
const PORT = 5555;

export const checkIfAdbExist = new Promise((resolve, reject) => {
  exec('adb version', (err, stdout, stedrr) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});

export const createPort = new Promise((resolve, reject) => {
  exec(`adb tcpip ${PORT}`, (err, stdout, stedrr) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});

export function connectToHost(ip: any): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`adb connect ${ip}:${PORT}`, (err, stdout, stedrr) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export function disconnectToHost(ip: any): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`adb disconnect ${ip}:${PORT}`, (err, stdout, stedrr) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
