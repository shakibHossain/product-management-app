module.exports = {
  apps: [
    {
      name: "product-management-app",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VARS1: "environment-variable",
      },
    },
  ],
};
