import { Brain, Workflow, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950">
      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            EarningsIQ
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            AI-powered earnings analysis with multi-agent workflows and real-time signals
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Multi-Agent Analysis</CardTitle>
              <CardDescription className="text-base">
                Harness the power of specialized AI agents working together to deliver comprehensive earnings insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Sentiment analysis</li>
                <li>• Financial metrics extraction</li>
                <li>• Trend identification</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 dark:border-indigo-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Job Queue Processing</CardTitle>
              <CardDescription className="text-base">
                Reliable, scalable job processing powered by BullMQ with Redis for complex analysis pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Distributed processing</li>
                <li>• Automatic retries</li>
                <li>• Job progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Real-time Signals</CardTitle>
              <CardDescription className="text-base">
                Capture and process earnings signals in real-time with intelligent classification and routing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Live data ingestion</li>
                <li>• Smart categorization</li>
                <li>• Instant notifications</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">&lt;100ms</div>
              <div className="text-slate-600 dark:text-slate-400">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400">Monitoring</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
