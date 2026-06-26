# Procode — React-Native Live Coding Interview Base Project

This repository is the **starting point for Procode live coding interview exercises**. It provides candidates with a pre-configured React Native (Expo) TODO application so that time during the interview can be spent on the exercise itself rather than scaffolding a project from scratch.

The app already has a working foundation including navigation, state management, and persistent storage. Interviewers will direct candidates to extend or modify specific parts of the codebase as part of the exercise.

## For Candidates

Before your interview, please make sure you have completed the setup steps below so that you are ready to run the project immediately when the session begins. Arriving with the project already running will save valuable time.

## Prerequisites

Make sure the following are installed on your machine before the interview:

- **Node.js** (v24 or later)
- **Yarn** (recommended) or npm
- **Expo Go** app installed on a physical device (iOS or Android), **or** Xcode (for an iOS simulator) **or** Android Studio (for an Android emulator)

## Setup

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/ChrisHargrove/Procode-Take-Home.git
cd procode-todo
```

Install dependencies:

```bash
yarn install
```

## Running the Project

**Using Expo Go (recommended for quick setup):**

```bash
yarn start
```

Scan the QR code with the Expo Go app on your device to launch the application.

**Using a simulator or emulator:**

```bash
yarn ios       # iOS simulator (macOS only, requires Xcode)
yarn android   # Android emulator (requires Android Studio)
```

## Project Structure

```
src/
  components/   # Reusable UI components
  models/       # Data models (e.g. Todo)
  navigation/   # React Navigation setup and screens
  storage/      # State management (Redux) and persistence hooks
```

## Troubleshooting

- Run `expo doctor` to diagnose common environment issues.
- If the bundler behaves unexpectedly, clear the cache with `yarn start --clear` or `expo start -c`.
- If dependencies are out of sync, try deleting `node_modules` and running `yarn install` again.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
