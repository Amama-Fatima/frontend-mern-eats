import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};
export default function OrderSummary({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>Rs {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((cartItem, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}x
              </Badge>
              {cartItem.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(cartItem)}
              />
              Rs. {((cartItem.price * cartItem.quantity) / 100).toFixed(2)}{" "}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs. {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
