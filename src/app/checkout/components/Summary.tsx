import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryProps {
  isPaymentValid: boolean;
  onPayNowClick: () => void;
  totalPrice: number;
  items: Array<{ id: number; name: string; price: number; quantity: number }>;
}

export function Summary({
  isPaymentValid,
  onPayNowClick,
  totalPrice,
  items,
}: SummaryProps) {
  const discount = 2500;
  const shippingFee = 1600;
  const total = totalPrice - discount + shippingFee;

  return (
    <Card className="sticky top-8 lg:w-[384px] sm:w-72 bg-[#F8F7FB] border-0">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex items-center justify-between text-destructive">
          <span>Discount</span>
          <span>-₦{discount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping fee</span>
          <span>₦{shippingFee.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Duration</span>
          <span>4-6 working days</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full hidden sm:flex rounded-full"
          onClick={onPayNowClick}
          disabled={!isPaymentValid}
        >
          Pay Now
        </Button>
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
  );
}
