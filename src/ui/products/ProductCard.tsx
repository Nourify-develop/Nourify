import { LuShoppingCart } from "react-icons/lu";
import { Product } from "../../types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter()

  // Format the price with commas and ₦ symbol
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div key={product.id} className="flex flex-col gap-6 text-center mb-14">
      <div className="flex justify-between flex-col gap-y-2"
        onClick={() => router.push(`/shop/${product.category}/${product.name}`)}
      >
        <Image src={product.image} width={0} height={0} alt={product.name} className="w-auto h-auto cursor-pointer" title={product.name} aria-label={product.name} aria-labelledby={product.name} />
        <h3 className="text-lg text-left font-medium text-gray-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </h3>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-left">
          <span className="font-bold text-xl lg:text-2xl">
            {formattedPrice}
          </span>
          <span className="text-xs text-gray-5"> / pack</span>
        </p>
        <button className="lg:py-3 py-2 lg:px-4 px-3 transition-all duration-500 ease-linear rounded-md bg-background-2 hover:bg-secondary focus-within:hover:bg-secondary active:hover:bg-secondary group">
          <LuShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 transition-all duration-500 ease-linear text-gray-6 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
