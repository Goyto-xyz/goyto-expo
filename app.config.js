import 'dotenv/config';

export default {
  expo: {
    name: 'goyto',
    slug: 'goyto',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.goyto.xyz',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription:
          'This app requires access to your location when open.',
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'This app requires access to your location even when closed.',
        NSLocationAlwaysUsageDescription:
          'This app requires access to your location when open.'
      }
    },
    android: {
      package: 'com.goyto.xyz',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#A2D2FF'
      }
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#A2D2FF'
        }
      ],
      'expo-font',
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsDownloadToken: process.env.MAPBOX_SECRET_KEY
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '60b4bbc6-cbff-473e-98f3-46c93bfb262e'
      },
      mapboxSecretKey: process.env.MAPBOX_SECRET_KEY,
      pinataGatewayUrl: process.env.PINATA_GATEWAY_URL
    },
    owner: 'goyto'
  }
};
