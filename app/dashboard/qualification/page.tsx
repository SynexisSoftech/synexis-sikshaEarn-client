"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Check, Clock, AlertCircle, Trophy, Star, TrendingUp } from "lucide-react"

export default function QualificationPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Qualification Status</CardTitle>
            <CardDescription>Track your progress towards different affiliate levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 mb-1">Your Current Level: Silver Affiliate</h3>
                  <p className="text-indigo-700 text-sm mb-3">
                    You're making great progress! Keep growing your network to unlock more benefits and higher
                    commissions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-indigo-600">15% Commission</Badge>
                    <Badge className="bg-indigo-600">Priority Support</Badge>
                    <Badge className="bg-indigo-600">Weekly Payouts</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">Gold Affiliate</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Next Level
                  </Badge>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>65% Complete</span>
                  <span>35 more referrals needed</span>
                </div>
                <div className="bg-amber-50 rounded-md p-3 mt-2">
                  <div className="font-medium text-amber-800 mb-1">Gold Level Benefits:</div>
                  <ul className="text-amber-700 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> 20% Commission Rate
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Dedicated Account Manager
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Bi-weekly Payouts
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Exclusive Marketing Materials
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Platinum Affiliate</span>
                  </div>
                  <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                    <Clock className="h-3 w-3 mr-1" /> Future Level
                  </Badge>
                </div>
                <Progress value={25} className="h-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>25% Complete</span>
                  <span>75 more referrals needed</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium">Diamond Affiliate</span>
                  </div>
                  <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                    <Clock className="h-3 w-3 mr-1" /> Future Level
                  </Badge>
                </div>
                <Progress value={10} className="h-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>10% Complete</span>
                  <span>90 more referrals needed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Qualification Requirements</CardTitle>
              <CardDescription>What you need to achieve each level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Bronze Affiliate</div>
                    <div className="text-xs text-slate-500">Entry Level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">0+ Referrals</div>
                  <div className="text-xs text-slate-500">10% Commission</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-indigo-800">Silver Affiliate</div>
                    <div className="text-xs text-indigo-600">Your Current Level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-indigo-800">25+ Referrals</div>
                  <div className="text-xs text-indigo-600">15% Commission</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Gold Affiliate</div>
                    <div className="text-xs text-amber-600">Next Level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">60+ Referrals</div>
                  <div className="text-xs text-amber-600">20% Commission</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Platinum Affiliate</div>
                    <div className="text-xs text-slate-500">Advanced Level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">100+ Referrals</div>
                  <div className="text-xs text-slate-500">25% Commission</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Diamond Affiliate</div>
                    <div className="text-xs text-slate-500">Elite Level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">150+ Referrals</div>
                  <div className="text-xs text-slate-500">30% Commission</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Your Achievements</CardTitle>
              <CardDescription>Milestones you've reached so far</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">First Referral</div>
                    <div className="text-xs text-green-600">Completed on Apr 10, 2025</div>
                  </div>
                </div>
                <Badge className="bg-green-500">Achieved</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">10 Referrals</div>
                    <div className="text-xs text-green-600">Completed on May 22, 2025</div>
                  </div>
                </div>
                <Badge className="bg-green-500">Achieved</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">25 Referrals</div>
                    <div className="text-xs text-green-600">Completed on Jun 15, 2025</div>
                  </div>
                </div>
                <Badge className="bg-green-500">Achieved</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">50 Referrals</div>
                    <div className="text-xs text-amber-600">In progress (25 more needed)</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  In Progress
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">100 Referrals</div>
                    <div className="text-xs text-slate-500">Not started yet</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                  Locked
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
