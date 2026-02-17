/**
 * AWS Lambda handler – wraps the Express app for API Gateway / Lambda URL invocations.
 * Used only when running in Lambda; local dev uses server.js directly.
 */
const serverlessExpress = require("@vendia/serverless-express");
const { app } = require("./server");

exports.handler = serverlessExpress({ app });
