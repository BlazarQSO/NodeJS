const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

const COMMANDS = {
  WINDOWS: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
  LINUX: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
  MACOS: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
}

const PLATFORMS = {
  WINDOWS: 'win32',
  MACOS: 'darwin',
  LINUX: 'linux',
}

let log = '';

const getUnixTime = () => Math.round(new Date().getTime() / 1000);

const startWritingToLogFile = () => setInterval(() => {
  fs.appendFile('activityMonitor.log', log, (error) => {
    if (error) {
      throw error;
    };
  });
  log = '';
}, 60000);

class WindowsPlatformStrategy {
  action() {
    return COMMANDS.WINDOWS;
  }
}

class LinuxPlatformStrategy {
  action() {
    return COMMANDS.LINUX;
  }
}

class MacOSPlatformStrategy {
  action() {
    return COMMANDS.MACOS;
  }
}

class PlatformStrategy {
  strategy = ''

  constructor(strategy) {
    this.strategy = strategy;
  }

  startExecProcess = () => {
    exec(this.strategy, (error, stdout, stderr) => {
      console.clear();
      if (stdout) {
        process.stdout.write(`stdout: ${stdout}`);
        log += `${getUnixTime()} : ${stdout}`;
      }

      if (stderr) {
        process.stdout.write(`stderr: ${stderr}`);
      }

      if (error !== null) {
        process.stdout.write(`error: ${error}`);
      }
    });
  }

  startProcess() {
    setInterval(() => this.startExecProcess(), 1000);
  }
}

const strategyManager = (platform) => {
  switch (platform) {
    case PLATFORMS.WINDOWS:
      new PlatformStrategy(new WindowsPlatformStrategy().action()).startProcess();
      break;
    case PLATFORMS.LINUX:
      new PlatformStrategy(new LinuxPlatformStrategy().action()).startProcess();
      break;
    case PLATFORMS.MACOS:
      new PlatformStrategy(new MacOSPlatformStrategy().action()).startProcess();
      break;
  }
}

const startProcess = () => {
  strategyManager(os.platform());

  startWritingToLogFile();
}

startProcess();
