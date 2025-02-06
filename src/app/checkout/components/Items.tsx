"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
  {
    id: 1,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
  {
    id: 2,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
  {
    id: 3,
    name: "Cup cake",
    category: "Pastries",
    price: 50000.0,
    quantity: 1,
    size: "Large",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPYgBS5qvqmZSsgojlOULZycFWDjdL.png",
  },
];

export function Items() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-[1.5px] border-gray-light-2">
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
                className={`flex items-center gap-4 p-4 ${
                  index !== 0 ? "border-t" : ""
                }`}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="mt-1 flex flex-col text-sm text-muted-foreground">
                    <span>Quantity: {item.quantity}</span>
                    {/* <span className="mx-2">•</span> */}
                    <span>Size: {item.size}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{item.price.toLocaleString()}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-2 text-destructive p-2 bg-gray-light-2 p2 rounded-full hover:bg-dark-red/80 duration-300"
                  >
                    <Trash2 className="h-8 w-8 text-dark-red hover:text-white duration-300" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <button
          className="mt-5 w-full !no-underline bg-gray-10 border flex items-center justify-center gap-2 border-gray-light-2 !py-2 text-secondary rounded-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "see less" : "see all items"}
          {isExpanded ?   <ChevronUp/>: <ChevronDown/>}
        </button>
      </CardContent>
    </Card>
  );
}
