# EarningsIQ

Multi-agent AI system for earnings call analysis using LangGraph, Temporal, and Next.js 15.

## Overview

EarningsIQ leverages a sophisticated multi-agent architecture to process and analyze corporate earnings calls in real-time. By combining the durability of Temporal workflows with the intelligence of Claude-powered agents, it provides deep financial insights, sentiment analysis, and trend identification.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **ORCHESTRATION**: [Temporal](https://temporal.io/)
- **Agent Framework**: [LangGraph](https://langchain-ai.github.io/langgraph/)
- **LLM**: Claude 3.5 Sonnet (Anthropic API)
- **UI Components**: shadcn/ui & Tailwind CSS v4

## Setup Instructions

### Prerequisites

- Node.js (v20+)
- Temporal Server (local or cloud)
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

3. Configure environment variables:
   Copy `.env.example` to `.env.local` and fill in your credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture

EarningsIQ uses a modular architecture where specialized agents handle different aspects of financial analysis, coordinated through LangGraph and ensured by Temporal's durable execution.
