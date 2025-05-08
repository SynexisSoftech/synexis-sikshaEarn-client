"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share2, Copy, ImageIcon, FileText, Video } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <MarketingCard
                  key={item}
                  title={`Marketing Banner ${item}`}
                  type="Image"
                  icon={<ImageIcon className="h-5 w-5 text-indigo-500" />}
                  image={`/placeholder.svg?height=200&width=300&text=Banner+${item}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3, 4].map((item) => (
                <MarketingCard
                  key={item}
                  title={`Promotional Video ${item}`}
                  type="Video"
                  icon={<Video className="h-5 w-5 text-indigo-500" />}
                  image={`/placeholder.svg?height=200&width=300&text=Video+${item}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <MarketingCard
                  key={item}
                  title={`Marketing Guide ${item}`}
                  type="PDF Document"
                  icon={<FileText className="h-5 w-5 text-indigo-500" />}
                  image={`/placeholder.svg?height=200&width=300&text=Document+${item}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="presentations" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <MarketingCard
                  key={item}
                  title={`Sales Presentation ${item}`}
                  type="PowerPoint"
                  icon={<PresentationIcon className="h-5 w-5 text-indigo-500" />}
                  image={`/placeholder.svg?height=200&width=300&text=Presentation+${item}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function MarketingCard({
  title,
  type,
  icon,
  image,
}: { title: string; type: string; icon: React.ReactNode; image: string }) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="relative">
        <ImageIcon
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 text-indigo-700 hover:bg-white hover:text-indigo-800"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 text-indigo-700 hover:bg-white hover:text-indigo-800"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-xs font-medium text-indigo-600">{type}</span>
        </div>
        <h3 className="font-semibold">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

function PresentationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  )
}
