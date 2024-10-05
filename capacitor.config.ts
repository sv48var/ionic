import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'portfolio-app',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duration to show the splash screen (in milliseconds)
      launchAutoHide: true, // Hide the splash screen automatically
      backgroundColor: '#ffffff', // Background color of the splash screen
      androidScaleType: 'CENTER_CROP', // Scale type for Android
      showSpinner: true // Show spinner while loading
    }
  }
};

export default config;
