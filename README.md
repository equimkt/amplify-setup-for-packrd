# AWS Amplify + Bedrock Haiku Generator

A TypeScript React application demonstrating integration between AWS Amplify Gen 2 and Amazon Bedrock for AI-powered haiku generation.

## 🚀 Features

- **AWS Amplify Gen 2** backend with custom queries
- **Amazon Bedrock** integration using Claude 3 Haiku model
- **TypeScript** for type-safe development
- **React 18** with modern hooks
- **Vite** for fast development and building

## 📋 Prerequisites

- Node.js 18+ and npm
- AWS Account with Bedrock access
- Claude 3 Haiku model enabled in your AWS region

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Amplify Sandbox

Start the Amplify sandbox environment:

```bash
npx ampx sandbox
```

This will:
- Deploy your Amplify backend
- Create authentication resources
- Set up the Bedrock data source
- Generate `amplify_outputs.json`

### 3. Enable Bedrock Access

Make sure you have:
1. Access to Amazon Bedrock in your AWS account
2. The Claude 3 Haiku model enabled
3. Proper IAM permissions for Bedrock

### 4. Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
amplify-setup-for-packrd/
├── amplify/
│   ├── backend.ts              # Backend configuration
│   ├── auth/
│   │   └── resource.ts         # Authentication setup
│   └── data/
│       ├── resource.ts         # GraphQL schema & custom queries
│       └── generateHaiku.js    # Bedrock resolver
├── src/
│   ├── main.tsx                # App entry point
│   ├── App.tsx                 # Main app component
│   ├── amplifyConfig.ts        # Amplify client setup
│   ├── components/
│   │   └── HaikuGenerator.tsx  # Haiku UI component
│   └── types/
│       └── amplify.d.ts        # Type definitions
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies

```

## 🎯 Key Files Explained

### Backend Files

**`amplify/backend.ts`**
- Configures the Amplify backend
- Adds Bedrock HTTP data source
- Sets up signing configuration for AWS requests

**`amplify/data/resource.ts`**
- Defines the GraphQL schema
- Includes `generateHaiku` custom query
- Configures authorization modes

**`amplify/data/generateHaiku.js`**
- Resolver function for Bedrock integration
- Formats requests to Claude 3 Haiku
- Processes and returns responses

### Frontend Files

**`src/amplifyConfig.ts`**
- Initializes Amplify with generated outputs
- Creates typed GraphQL client

**`src/components/HaikuGenerator.tsx`**
- React component for haiku generation
- Handles user input and API calls
- Displays results with error handling

**`src/main.tsx`**
- Application entry point
- Renders the React app

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start Amplify sandbox
npm run sandbox

# Deploy to AWS (production)
npx ampx deploy
```

## 💡 Usage Example

### In Your Component

```typescript
import { client } from './amplifyConfig';

async function generateHaiku() {
  try {
    const result = await client.queries.generateHaiku({
      prompt: "cherry blossoms in spring"
    });
    console.log('Generated haiku:', result.data);
  } catch (error) {
    console.error('Error generating haiku:', error);
  }
}
```

### With React State

```typescript
const [prompt, setPrompt] = useState('');
const [haiku, setHaiku] = useState('');
const [loading, setLoading] = useState(false);

const handleGenerateHaiku = async () => {
  setLoading(true);
  try {
    const result = await client.queries.generateHaiku({ prompt });
    setHaiku(result.data || '');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

## 🔐 Authentication

The app uses AWS Amplify authentication with:
- User Pool for authenticated users
- Custom queries require authentication
- Automatic token handling

## 🌍 Region Configuration

Default region is `us-east-1`. To change:

1. Update `amplify/backend.ts`:
```typescript
backend.data.addHttpDataSource(
  'BedrockDataSource',
  'https://bedrock-runtime.YOUR-REGION.amazonaws.com',
  {
    authorizationConfig: {
      signingRegion: 'YOUR-REGION',
      signingServiceName: 'bedrock',
    },
  }
);
```

2. Update `amplify/data/generateHaiku.js` model ID if needed

## 🧪 Testing

### Manual Testing
1. Start the sandbox: `npm run sandbox`
2. Run the dev server: `npm run dev`
3. Enter a topic in the input field
4. Click "Generate Haiku"
5. View the AI-generated haiku

### Example Prompts
- "cherry blossoms in spring"
- "ocean waves at sunset"
- "mountain peak in winter"
- "autumn leaves falling"

## 🚨 Troubleshooting

### TypeScript Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Amplify Outputs Not Found
```bash
# Restart sandbox to regenerate outputs
npx ampx sandbox
```

### Bedrock Access Denied
1. Check AWS region has Bedrock enabled
2. Verify Claude 3 Haiku model access
3. Review IAM permissions

### CORS Errors
- Ensure Bedrock data source is properly configured
- Check `amplify/backend.ts` signing configuration

## 🧹 Cleanup

To remove all AWS resources:

```bash
npx ampx sandbox delete
```

To clean local environment:

```bash
rm -rf node_modules amplify_outputs.json .amplify
npm install
```

## 📚 Additional Resources

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📝 License

ISC

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

---

**Built with ❤️ using AWS Amplify and Amazon Bedrock**
