# 🔮 Peter: The Intelligence Layer for DomainFi

**Peter** (P.E.T.E.R. - **P**redictive **E**valuation **T**ool for **E**cosystem **R**esearch) is an AI-powered domain intelligence platform built for the Doma Protocol ecosystem. It provides the most comprehensive analysis of digital assets by combining traditional Web2 metrics with unique, high-alpha on-chain data.

**Live Application:** [www.projectpeter.xyz](https://www.projectpeter.xyz)

---

### ✨ Key Features

- **Multi-Agent AI System:** Utilizes a suite of specialized AI agents to analyze domains in real-time across multiple vectors.
- **On-Chain Intelligence:** Leverages the Doma Subgraph to analyze a domain's on-chain history, including transfers, renewals, and claim status, to generate a unique "On-Chain Health Score."
- **Live Market Research:** Uses powerful research LLMs (Perplexity & xAI) to analyze current market trends, community sentiment on X/Twitter, and brandability.
- **Web2 Authority Analysis:** Integrates with leading SEO APIs (like SE Ranking) to assess traditional metrics like Domain Authority and organic traffic trends.
- **Ecosystem Integration:** Features the **DomainApe** companion Telegram bot for real-time alerts on sales, listings, and market momentum spikes.

### 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Vercel Postgres](https://vercel.com/storage/postgres) with [Prisma](https://www.prisma.io/)
- **Deployment:** [Vercel](https://vercel.com/)

### 🚀 Getting Started Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Project-Peter-Doma/website.git
    cd website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    *   Copy the `.env.example` to a new file named `.env.local`.
    *   Fill in the required API keys and database URLs.

4.  **Push the database schema:**
    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.
