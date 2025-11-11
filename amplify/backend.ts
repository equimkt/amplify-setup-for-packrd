import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// Add Bedrock data source
backend.data.addHttpDataSource(
  'BedrockDataSource',
  'https://bedrock-runtime.us-east-1.amazonaws.com',
  {
    authorizationConfig: {
      signingRegion: 'us-east-1',
      signingServiceName: 'bedrock',
    },
  }
);
