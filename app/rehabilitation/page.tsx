"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const INJURY_TYPES = [
  "Knee Injury",
  "Shoulder Injury",
  "Back Pain",
  "Ankle Sprain",
  "Wrist Injury",
  "Hip Pain",
  "Neck Pain",
  "Elbow Injury",
]

const REHAB_PLANS = [
  "Strength Training",
  "Flexibility Exercises",
  "Balance Training",
  "Cardiovascular Exercise",
  "Aquatic Therapy",
  "Manual Therapy",
  "Functional Training",
]

export default function Rehabilitation() {
  const router = useRouter()
  const [rehabData, setRehabData] = useState({
    injuryType: "",
    rehabPlan: "",
    frequency: "1",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [showRehabOptions, setShowRehabOptions] = useState(false)

  const handleChange = (name: string, value: string) => {
    setRehabData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and save the data
    localStorage.setItem("rehabData", JSON.stringify(rehabData))
    router.push("/game/seed-selection")
  }

  const filteredRehabPlans = REHAB_PLANS.filter((plan) => plan.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="mobile-container flex flex-col p-6">
      <Link href="/register" className="self-start mb-6">
        <ArrowLeft className="h-6 w-6 text-gray-500" />
      </Link>

      <div className="flex justify-center mb-6">
        <Image src="/images/logo.png" alt="Back2Life Logo" width={150} height={80} />
      </div>

      <h1 className="text-2xl font-bold text-center text-green-800 mb-8">Injury & Rehabilitation Details</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="injuryType">Injury Type</Label>
          <Select onValueChange={(value) => handleChange("injuryType", value)} required>
            <SelectTrigger className="rounded-xl py-6">
              <SelectValue placeholder="Select your injury type" />
            </SelectTrigger>
            <SelectContent>
              {INJURY_TYPES.map((injury) => (
                <SelectItem key={injury} value={injury}>
                  {injury}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rehabPlan">Rehabilitation Plan</Label>
          <div className="relative">
            <Input
              placeholder="Search rehabilitation plans"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowRehabOptions(true)
              }}
              onFocus={() => setShowRehabOptions(true)}
              className="rounded-xl py-6"
            />

            {showRehabOptions && searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredRehabPlans.map((plan) => (
                  <div
                    key={plan}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("rehabPlan", plan)
                      setSearchTerm(plan)
                      setShowRehabOptions(false)
                    }}
                  >
                    {plan}
                  </div>
                ))}
              </div>
            )}
          </div>

          {rehabData.rehabPlan && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="frequency">How many times per day?</Label>
              <Select defaultValue="1" onValueChange={(value) => handleChange("frequency", value)}>
                <SelectTrigger className="rounded-xl py-6">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "time" : "times"} per day
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="pt-6 flex justify-end">
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 rounded-xl px-8 py-6"
            disabled={!rehabData.injuryType || !rehabData.rehabPlan}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

