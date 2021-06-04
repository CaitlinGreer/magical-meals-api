module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://caitlin@localhost/magical-meals?sslmode=no-verify',
    TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://caitlin@localhost/magical-meals-test?sslmode=no-verify'
  }