"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { Visa, Maestro, Mastercard } from "../../../../public/icons"
import { useForm } from "react-hook-form"

type PaymentMethod = "card" | "delivery"

interface PaymentForm {
  cardName: string
  cardNumber: string
  month: string
  year: string
  cvv: string
}

export function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentForm>()

  const onSubmit = (data: PaymentForm) => {
    console.log(data)
    // Handle form submission
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  return (
    <Card className="shadow-sm border-[1.5px] border-gray-light-2 p-1">
      <CardHeader>
        <CardTitle>Payment Options</CardTitle>
        <p className="text-sm text-muted-foreground">Complete your purchase by selecting your payment option</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="font-medium">
                  Pay with card
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-8">Pay instantly with your Credit/Debit Card</p>
              <div className="flex gap-2 ml-7">
                <Image src={Visa || "/placeholder.svg"} alt="Visa card" />
                <Image src={Maestro || "/placeholder.svg"} alt="Maestro card" />
                <Image src={Mastercard || "/placeholder.svg"} alt="Mastercard" />
              </div>

              {paymentMethod === "card" && (
                <div className="ml-7 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-sm">
                        Card Name
                      </Label>
                      <Input
                        id="cardName"
                        placeholder="e.g. Samantha Davies"
                        className="bg-[#F9FAFB] border-none h-11"
                        {...register("cardName", { required: "Card name is required" })}
                      />
                      {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm">
                        Card Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="e.g. 4537 - 4828 - 4839 - 3242"
                          className="bg-[#F9FAFB] border-none h-11 pr-12"
                          {...register("cardNumber", {
                            required: "Card number is required",
                            validate: (value) => /^(\d{4}\s?){3}\d{4}$/.test(value) || "Invalid card number",
                          })}
                          onChange={(e) => {
                            e.target.value = formatCardNumber(e.target.value)
                          }}
                        />
                        <Image
                          src={Visa || "/placeholder.svg"}
                          alt="Visa card"
                          width={50}
                          height={20}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white"
                        />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="month" className="text-sm">
                        Month
                      </Label>
                      <Input
                        id="month"
                        placeholder="e.g. December"
                        className="bg-[#F9FAFB] border-none h-11"
                        {...register("month", { required: "Month is required" })}
                      />
                      {errors.month && <p className="text-red-500 text-xs">{errors.month.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm">
                        Year
                      </Label>
                      <Input
                        id="year"
                        placeholder="e.g. 2025"
                        className="bg-[#F9FAFB] border-none h-11"
                        maxLength={4}
                        {...register("year", {
                          required: "Year is required",
                          pattern: {
                            value: /^[0-9]{4}$/,
                            message: "Year must be 4 digits",
                          },
                        })}
                      />
                      {errors.year && <p className="text-red-500 text-xs">{errors.year.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="e.g. 143"
                        type="password"
                        className="bg-[#F9FAFB] border-none h-11"
                        maxLength={3}
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^[0-9]{3}$/,
                            message: "CVV must be 3 digits",
                          },
                        })}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv.message}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="font-medium">
                  Payment on Delivery
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                Please note that you will have to make payment before the package seal is broken. The item can only be
                returned if it is damaged physically.
              </p>
            </div>
          </RadioGroup>

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Submit Payment
          </button>
        </form>
      </CardContent>
    </Card>
  )
}

