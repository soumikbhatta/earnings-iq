# EarningsIQ

Multi-agent AI system for earnings call analysis using LangGraph, BullMQ, and Next.js 16.

## Overview

EarningsIQ leverages a sophisticated multi-agent architecture to process and analyze corporate earnings calls in real-time. By combining reliable job queue processing with BullMQ and the intelligence of Claude-powered agents, it provides deep financial insights, sentiment analysis, and trend identification.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Job Queue**: [BullMQ](https://docs.bullmq.io/) with Redis
- **Vector DB**: [Qdrant](https://qdrant.tech/)
- **Agent Framework**: [LangGraph](https://langchain-ai.github.io/langgraph/) (planned)
- **LLM**: Claude 3.5 Sonnet (Anthropic API)
- **UI Components**: shadcn/ui & Tailwind CSS v4

## Setup Instructions

### Prerequisites

- Node.js (v20+)
- Docker (for Redis and Qdrant)
- Supabase Project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soumikbhatta/earnings-iq.git
   cd earnings-iq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start infrastructure services:
   ```bash
   npm run docker:up
   ```

4. Configure environment variables:
   Copy `.env.example` to `.env.local` and fill in your credentials.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Start the BullMQ worker (in a separate terminal):
   ```bash
   npm run worker
   ```

## Architecture

EarningsIQ uses a modular architecture where specialized agents handle different aspects of financial analysis, coordinated through LangGraph and processed reliably with BullMQ job queues.
