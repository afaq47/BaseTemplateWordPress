import type { AWS } from '@serverless/typescript';

import processData from '@functions/processData';

const serverlessConfiguration: AWS = {
  service: 'service-zerocode-base-template',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },

  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-iam-roles-per-function', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage:'local',
    region:'eu-west-2',
    environment: {
      DEBUG: '*',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    tracing:{
      lambda: true
    },
    iamRoleStatements:[{
      'Effect': 'Allow',
      'Action': ['xray:PutTraceSegments','xray:PutTelemetryRecords'],
      'Resource': "*"
    }],
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { processData },
};

module.exports = serverlessConfiguration;
