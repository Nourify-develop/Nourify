import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { TradeDown, TradeUp } from "../../../../../public/icons"

interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: string
  subtitle: string
}

export function StatsCard({ title, value, change, icon, subtitle }: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="flex flex-col justify-between gap-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-5">
        <CardTitle className="text-lg font-bold text-gray-8 !leading-6">
          {title}
          <div className="text-xs text-primary-2/50 font-medium">{subtitle}</div>
        </CardTitle>
        <Image src={icon} alt='trade-up' />
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-8">{value}</div>
        <div className={`flex flex-col gap-0 items-center text-xs font-bold ${isPositive ? "text-secondary" : "text-dark-red"}`}>
          {isPositive ? <Image src={TradeUp} alt='trade-up' /> : <Image src={TradeDown} alt='trade-up' />}
          <span>{Math.abs(change)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

