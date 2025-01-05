## LeetBoard Chrome Extension

LeetBoard is a Chrome extension that allows users to track their LeetCode progress and collaborate with friends. This repository contains the source code for the extension and its configuration.

## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

    Node.js
    npm
    Firebase account for Firebase configuration

## Setup Instructions
1. Clone the Repository

First, clone the repository to your local machine:

git clone https://github.com/your-username/leetboard.git
cd leetboard

2. Install Dependencies

Install the required npm packages:

npm install

3. Firebase Setup

You need to set up Firebase for the extension. Follow these steps:

    Go to Firebase Console.
    Create a new Firebase project or use an existing one.
    Register your app with Firebase and obtain the configuration details.

Fill in the details of your Firebase config in src/firebase_config.js:

// firebase_config.js
export const firebaseApp = initializeApp({
  apiKey: "<fill-me>",
  authDomain: "<fill-me>",
  projectId: "<fill-me>",
  storageBucket: "<fill-me>",
  messagingSenderId: "<fill-me>",
  appId: "<fill-me>",
  measurementId: "<fill-me>"
});

You can reference this configuration in any JavaScript file by importing the firebaseApp:

import { firebaseApp } from './firebase_config';

4. Webpack Configuration

The project uses Webpack for bundling. There are three main Webpack configuration files:

    webpack.development.js: Used for development purposes. Configure this script to suit your development needs. Run the following command to build the development version of the extension:

npm run build

webpack.production.js: Used for the production release. Configure this script to prepare your extension for release. Run the following command to build the production version:

    npm run release

    webpack.common.js: This file contains the common bundler configurations shared between both development and production scripts.

5. Extension Code

All the extension's development code should be placed in the src folder. This includes:

    Extension Manifest: The manifest.json file should also be in the src folder.
    Other Extension Code: Any JavaScript, CSS, or assets for the extension should be placed in the appropriate directories within the src folder.

6. Run the Extension Locally

For local testing and development:

    Build the extension using npm run build.
    Open Chrome and navigate to chrome://extensions/.
    Enable Developer mode and click Load unpacked.
    Select the src folder in your project directory.

7. Firebase Integration

Firebase is used for backend services such as authentication and data storage. Ensure that you have set up Firebase correctly and are importing and using the firebaseApp as shown above.



## **Contributing**

We welcome contributions to **LeetBoard**! Before contributing, please follow these steps:

1. **Join our [Discord Server](https://discord.gg/KmhtPxg5Tb)**  
   - Once you're in the server, introduce yourself and have a quick chat with me (the project owner).

2. **Discuss Your Changes**  
   - We’ll go over the Contributor Guidelines and make sure we’re on the same page regarding your proposed changes.

3. **Make Your Pull Request**  
   - After discussing your changes and getting the green light, feel free to submit your pull request.

This helps us ensure that your contributions are aligned with the project and maintain its quality.

## Contact

For any inquiries, please contact stevealdrin7@gmail.com

#License
LeetBoard is dual-licensed under the **AGPL-3.0 License** and a **Commercial License**.

For more information refer the License file
