# Radio CoPilot Admin Dashboard

## Setup Instructions

1. **Prerequisites**
   - Node.js 18+
   - Access to a Neon.tech database

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd radioCopilot-admin
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Get these URLs from your Neon.tech dashboard
   POSTGRES_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."

   # Admin credentials
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="radioCopilot2024!"
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Initialize database**
   ```bash
   npm run db:generate  # Generate migrations
   npm run db:push     # Push schema to database
   npm run db:seed     # Seed initial data
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to see the application