# EarningsIQ 🚀

AI-powered earnings call analysis utilizing multi-agent workflows and real-time processing.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI/LLM**: Groq API (Llama 3.3 70B)
- **Agents**: LangGraph (Parser, Sentiment, Prediction)
- **Queue**: BullMQ with Redis
- **Vector DB**: Qdrant
- **Database**: Supabase
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+
- Docker (for Redis & Qdrant)
- Groq API Key

## Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/soumikbhatta/earnings-iq.git
    cd earnings-iq
    npm install
    ```

2.  **Environment Setup**
    ```bash
    cp .env.example .env.local
    # Edit .env.local with your GROQ_API_KEY and Supabase credentials
    ```

3.  **Start Infrastructure**
    ```bash
    npm run docker:up
    ```

4.  **Run Worker (Terminal 1)**
    ```bash
    npm run worker
    ```

5.  **Start App (Terminal 2)**
    ```bash
    npm run dev
    ```

## Architecture

1.  **Job Queue**: `workers/earnings-worker.ts` processes analysis jobs.
2.  **Agents**: `src/agents/` contains the LangGraph workflow:
    *   `parser_node`: Extracts financial metrics.
    *   `sentiment_node`: Analyzes tone.
    *   `prediction_node`: Forecasts price movement.
3.  **API**: `ChatGroq` powers the inference for high speed and low cost.
