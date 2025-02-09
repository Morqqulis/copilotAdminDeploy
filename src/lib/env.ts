export const env = {
  database: {
    url: process.env.POSTGRES_URL
  },
  auth: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    secretKey: process.env.SECRET_KEY
  }
} 