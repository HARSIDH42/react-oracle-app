# AWS Lambda Node.js 20 base image (Amazon Linux 2023)
# https://docs.aws.amazon.com/lambda/latest/dg/nodejs-image.html
FROM public.ecr.aws/lambda/nodejs:20

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json* ${LAMBDA_TASK_ROOT}/

# Install production dependencies (no devDependencies)
# Builds oracledb native bindings for Lambda's Linux runtime
RUN npm ci --omit=dev

# Copy application source
COPY server.js lambda.js ${LAMBDA_TASK_ROOT}/

# Lambda handler: file name and export name
# Handler receives API Gateway / Lambda URL events and forwards to Express
CMD [ "lambda.handler" ]
