"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input-field"
import { Label } from "@/components/ui/label"
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

export function PaymentOptions({ onValidChange }: { onValidChange: (isValid: boolean) => void }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const {
    register,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = useForm<PaymentForm>({
    mode: "onChange",
  })

  const watchAllFields = watch()

  useEffect(() => {
    const isFormValid = paymentMethod === "delivery" || (paymentMethod === "card" && isValid)
    onValidChange(isFormValid)
  }, [paymentMethod, isValid, onValidChange]) // Removed watchAllFields from dependencies

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
    <Card className="shadow-sm border-[1.5px] border-gray-light-2 ">
      <CardHeader>
        <CardTitle>Payment Options</CardTitle>
        <p className="text-sm text-muted-foreground">Complete your purchase by selecting your payment option</p>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="checkbox flex">
                  <input
                    type="checkbox"
                    className="checkbox__input"
                    checked={paymentMethod === "card"}
                    onChange={() => {
                      setPaymentMethod((prev) => (prev === "card" ? null : "card"))
                      if (paymentMethod !== "card") {
                        // Reset form when switching to card payment
                        setValue("cardName", "")
                        setValue("cardNumber", "")
                        setValue("month", "")
                        setValue("year", "")
                        setValue("cvv", "")
                      }
                    }}
                  />
                  <span className="checkbox__inner h-5 w-5 md:h-6 md:w-6"></span>
                </label>
                <Label htmlFor="card" className="font-medium">
                  Pay with card
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-8">Pay instantly with your Credit/Debit Card</p>
              <div className="flex gap-2 ml-7 pb-3">
                <Image src={Visa || "/placeholder.svg"} alt="Visa card" />
                <Image src={Maestro || "/placeholder.svg"} alt="Maestro card" />
                <Image src={Mastercard || "/placeholder.svg"} alt="Mastercard" />
              </div>

              {paymentMethod === "card" && (
                <div className="sm:ml-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-sm">
                        Card Name
                      </Label>
                      <Input
                        id="cardName"
                        placeholder="e.g. Samantha Davies"
                        className="bg-[#F9FAFB] border-none h-11"
                        {...register("cardName", {
                          required: "Card name is required",
                          validate: (value) => value.trim() !== "" || "Card name cannot be empty",
                        })}
                        onBlur={() => trigger("cardName")}
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
                            validate: (value) => {
                              const numberOnly = value.replace(/\s/g, "")
                              return numberOnly.length === 16 || "Card number must be 16 digits"
                            },
                          })}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value)
                            setValue("cardNumber", formatted, { shouldValidate: true })
                          }}
                          onBlur={() => trigger("cardNumber")}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="month" className="text-sm">
                        Month
                      </Label>
                      <Input
                        id="month"
                        placeholder="e.g. December"
                        className="bg-[#F9FAFB] border-none h-11"
                        {...register("month", { required: "Month is required" })}
                        onBlur={() => trigger("month")}
                      />
                      {errors.month && <p className="text-red-500 text-xs">{errors.month.message}</p>}
                    </div>

                    <div className="flex flex-row gap-5 sm:gap-4"> 
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
                          onBlur={() => trigger("year")}
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
                          onBlur={() => trigger("cvv")}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <label className="checkbox flex">
                  <input
                    type="checkbox"
                    className="checkbox__input"
                    checked={paymentMethod === "delivery"}
                    onChange={() => setPaymentMethod((prev) => (prev === "delivery" ? null : "delivery"))}
                  />
                  <span className="checkbox__inner h-5 w-5 md:h-6 md:w-6"></span>
                </label>
                <Label htmlFor="delivery" className="font-medium">
                  Payment on Delivery
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                Please note that you will have to make payment before the package seal is broken. The item can only be
                returned if it is damaged physically.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

