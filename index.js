const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

const WINDOWS_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const OTHER_PLATFORM = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

const WINDOWS_PLATFORM = 'win32';
let log = '';

const getUnixTime = () => Math.round(new Date().getTime() / 1000);

const startExecProcess = (command) => {
  exec(command, (error, stdout, stderr) => {
    console.clear();
    if (stdout) {
      console.log(`stderr: ${stdout}`);
      log += `${getUnixTime()} : ${stdout}`;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
}

const startWritingToLogFile = () => setInterval(() => {
  fs.appendFile('activityMonitor.log', log, (error) => {
    if (error) {
      throw error;
    };
  });
  log = '';
}, 60000);

const startProcess = () => {
  if (os.platform() === WINDOWS_PLATFORM) {
    setInterval(() => startExecProcess(WINDOWS_COMMAND), 1000);
  } else {
    setInterval(() => startExecProcess(OTHER_PLATFORM), 1000);
  }

  startWritingToLogFile();
}

startProcess();
