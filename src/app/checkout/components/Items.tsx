"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const items = [
  {
    id: 1,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
  {
    id: 2,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
  {
    id: 3,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
]

export function Items({
  onTotalPriceChange,
  onItemsChange,
}: {
  onTotalPriceChange: (total: number) => void
  onItemsChange: (items: any) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    onTotalPriceChange(totalPrice)
  }, [onTotalPriceChange])

  useEffect(() => {
    onItemsChange(items)
  }, [onItemsChange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 100 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 ${index !== 0 ? "border-t" : ""}`}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span>Quantity: {item.quantity}</span>
                    <span className="mx-2">•</span>
                    <span>Size: {item.size}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{item.price.toLocaleString()}</p>
                  <Button variant="ghost" size="icon" className="mt-2 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <Button variant="link" className="mt-4 w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "see less" : "see all items"}
        </Button>
      </CardContent>
    </Card>
  )
}

