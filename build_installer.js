// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './OurCodeWorld-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './windows_installer');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: 'C:\\Web Development\\Soundbit\\out\\soundbit-win32-x64',
    outputDirectory: 'C:\\Web Development\\Soundbit\\out\\msi',

    // Configure metadata
    description: 'This is a demo application',
    exe: 'OurCodeWorld',
    name: 'Our Code World Desktop App',
    manufacturer: 'Our Code World Inc',
    version: '1.0.0',

    // Configure installer User Interface
    ui: {
        chooseDirectory: true,
        images: {
            
        }
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});