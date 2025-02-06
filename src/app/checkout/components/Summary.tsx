import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function Summary() {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span>Items</span>
          <span>3</span>
        </div>
        <div className="flex items-center justify-between text-destructive">
          <span>Discount</span>
          <span>-₦2,500</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping fee</span>
          <span>₦1,600</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Duration</span>
          <span>4-6 working days</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>₦174,600</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full">Pay Now</Button>
        <p className="text-center text-sm text-muted-foreground">
          By clicking the button, you agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          as well as{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Sale
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

