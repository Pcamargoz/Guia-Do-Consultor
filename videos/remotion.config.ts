import { Config } from '@remotion/cli/config';

// Usa o Chrome já instalado na estação em vez de baixar o Chrome Headless Shell.
Config.setBrowserExecutable('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(18);
Config.setConcurrency(8);
Config.setOverwriteOutput(true);
