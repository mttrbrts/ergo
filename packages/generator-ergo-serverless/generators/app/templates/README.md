## ergo-serverless

A [Serverless framework](https://serverless.com) wrapper for an [Ergo](https://github.com/accordproject/ergo) compiled [Cicero smart contract](https://github.com/accordproject/cicero). Configured to deploy to an Apache OpenWhisk instance, but configurable through the serverless.yml for deployment to other Function-as-a-Service platforms.


### Installing this sample

Requires git and node installed on your machine.

1. Download the sample and install the Node dependencies.
```
npm install
```

2. Connect to your OpenWhisk installation
https://serverless.com/framework/docs/providers/openwhisk/guide/credentials/


3. Initial deployment
```
npm run deploy
```

4. Invoke remote function after deployment, assuming deployment to Bluemix.
```
curl -u {{API_KEY}} -X POST https://openwhisk.{{YOUR_REGION}}.bluemix.net/api/v1/namespaces/{{YOUR_SPACE}}/actions/ciceroTemplate-dev-ciceroTemplate?blocking=true
```

### Making changes to the sample

If you want to redeploy your changes to the sample use:
```
npm run redeploy
```

To invoke the function locally for testing use: 
```
npm run invoke:local
```