import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, AlertTriangle, TrendingUp, Globe, Users, BookOpen, Zap, Download, ExternalLink, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';

const ncsiData = [
  { name: 'Cybersecurity Policy', score: 3, total: 15, percentage: 20 },
  { name: 'Global Contribution', score: 0, total: 6, percentage: 0 },
  { name: 'Education & Development', score: 5, total: 10, percentage: 50 },
  { name: 'Research & Development', score: 0, total: 4, percentage: 0 },
  { name: 'Critical Infrastructure', score: 0, total: 12, percentage: 0 },
  { name: 'Digital Enablers', score: 2, total: 12, percentage: 17 },
  { name: 'Threat Analysis', score: 0, total: 12, percentage: 0 }
];

const radarData = [
  { subject: 'Policy', A: 20, fullMark: 100 },
  { subject: 'Global', A: 0, fullMark: 100 },
  { subject: 'Education', A: 50, fullMark: 100 },
  { subject: 'R&D', A: 0, fullMark: 100 },
  { subject: 'Infrastructure', A: 0, fullMark: 100 },
  { subject: 'Enablers', A: 17, fullMark: 100 },
  { subject: 'Threats', A: 0, fullMark: 100 }
];

const rankingData = [
  { index: 'NCSI', rank: '115th', score: '24.17', status: 'poor' },
  { index: 'Global Cybersecurity Index', rank: 'Tier 4', score: '53.07', status: 'poor' },
  { index: 'E-Government Development', rank: '148th', score: 'N/A', status: 'poor' },
  { index: 'AI Readiness Index', rank: '107th', score: '40.91', status: 'poor' }
];

const challengesData = [
  { category: 'Infrastructure', severity: 'Critical', description: 'Dependence on foreign internet infrastructure', impact: 'National sovereignty at risk' },
  { category: 'Technology', severity: 'High', description: 'Rapid technological change outpacing security measures', impact: 'Increased vulnerability surface' },
  { category: 'Government', severity: 'Critical', description: 'Vulnerabilities in government systems', impact: 'Data breaches and public trust erosion' },
  { category: 'Human Capital', severity: 'High', description: 'Lack of capacity building and awareness', impact: 'Skilled workforce shortage' },
  { category: 'Integration', severity: 'Medium', description: 'IT and OT security integration challenges', impact: 'Critical infrastructure vulnerabilities' },
  { category: 'Cybercrime', severity: 'Critical', description: 'Increased cybercrime activities', impact: 'Economic and social disruption' },
  { category: 'Leadership', severity: 'High', description: 'Lack of a single, centralized high-level cybersecurity authority', impact: 'Fragmented efforts and lack of coordination' },
  { category: 'Geopolitical Risks', severity: 'High', description: 'Iraq remains a "soft target" in regional cyber conflicts', impact: 'Increased exposure to state-sponsored attacks' }
];

const roadmapPillars = [
  {
    title: 'Governance & Policy',
    icon: Shield,
    color: 'bg-blue-500',
    priority: 'High',
    timeline: '6-12 months',
    items: [
      'Develop National Cybersecurity Strategy (NCS)',
      'Establish Central Cybersecurity Authority',
      'Enact Comprehensive Cybersecurity Legislation',
      'Promote Public-Private Partnerships'
    ]
  },
  {
    title: 'Technical Capabilities',
    icon: Zap,
    color: 'bg-green-500',
    priority: 'Critical',
    timeline: '12-24 months',
    items: [
      'Secure Critical Information Infrastructure (CII)',
      'Implement National SOCs and CERTs',
      'Promote Secure Digital Transformation',
      'Develop Cyber Threat Intelligence Program'
    ]
  },
  {
    title: 'Human Capital',
    icon: Users,
    color: 'bg-purple-500',
    priority: 'High',
    timeline: '18-36 months',
    items: [
      'Invest in Cybersecurity Education',
      'Launch National Awareness Campaigns',
      'Foster Security Culture',
      'Support R&D Initiatives'
    ]
  },
  {
    title: 'International Cooperation',
    icon: Globe,
    color: 'bg-orange-500',
    priority: 'Medium',
    timeline: '6-18 months',
    items: [
      'Join International Conventions',
      'Establish Bilateral Partnerships',
      'Participate in Global Forums',
      'Promote Information Sharing'
    ]
  }
];

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#f97316', '#06b6d4'];

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPillar, setSelectedPillar] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadReport = () => {
    const link = document.createElement('a');
    link.href = '/iraq_cybersecurity_report_final.pdf';
    link.download = 'Iraq_Cybersecurity_Report_2026_Update.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Iraq Cybersecurity Report</h1>
                <p className="text-gray-600">National and International Security Posture Analysis (Updated 2026)</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={downloadReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">NCSI Ranking</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">115th</div>
                  <p className="text-xs text-muted-foreground">Score: 24.17</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GCI Ranking</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">Tier 4</div>
                  <p className="text-xs text-muted-foreground">Score: 53.07</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Areas</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <p className="text-xs text-muted-foreground">Major challenges identified</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">50%</div>
                  <p className="text-xs text-muted-foreground">Education & Development</p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>NCSI Fulfillment Analysis</CardTitle>
                    <CardDescription>Performance across cybersecurity indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={ncsiData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#3b82f6" name="Current Score" />
                        <Bar dataKey="total" fill="#e5e7eb" name="Maximum Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Cybersecurity Radar</CardTitle>
                    <CardDescription>Overall security posture visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Iraq" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>International Rankings</CardTitle>
                  <CardDescription>Iraq's position in global cybersecurity indices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rankingData.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <h3 className="font-semibold">{item.index}</h3>
                        </div>
                        <div className="text-right">
                          <Badge variant={item.rank === 'N/A' || item.status === 'poor' ? 'destructive' : 'outline'}>
                            {item.rank}
                          </Badge>
                          {item.score !== 'N/A' && (
                            <p className="text-sm text-muted-foreground mt-1">Score: {item.score}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ncsiData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-sm">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{item.score}/{item.total}</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {item.percentage}% fulfillment
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Key Cybersecurity Challenges</CardTitle>
                  <CardDescription>Critical areas requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challengesData.map((challenge, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Badge className={`${getSeverityColor(challenge.severity)} text-white`}>
                          {challenge.severity}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="font-semibold">{challenge.category}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                          <p className="text-xs text-red-600 mt-2 font-medium">Impact: {challenge.impact}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmapPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPillar(selectedPillar === index ? null : index)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${pillar.color}`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle>{pillar.title}</CardTitle>
                              <div className="flex space-x-2 mt-1">
                                <Badge className={getPriorityColor(pillar.priority)}>
                                  {pillar.priority}
                                </Badge>
                                <Badge variant="outline">
                                  {pillar.timeline}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <motion.ul 
                          className="space-y-2"
                          initial={false}
                          animate={{ height: selectedPillar === index ? 'auto' : 'auto' }}
                        >
                          {pillar.items.map((item, itemIndex) => (
                            <motion.li 
                              key={itemIndex} 
                              className="flex items-start space-x-2"
                              initial={{ opacity: 0.7 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Iraq Cybersecurity Report - Generated by Manus AI</p>
            <p className="mt-1">Data sourced from NCSI and international cybersecurity indices</p>
            <p className="mt-2 text-xs">Last updated: March 2026 | Report Version: 2.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
