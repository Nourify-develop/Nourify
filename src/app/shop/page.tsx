import OurProducts from "./components/OurProducts";
import Limoffer from "@/components/limoffer";
import Review from "./components/Review/reviews"

const Shop = () => {

  return (
    <div className="bg-white">
      <Limoffer/>
      <OurProducts />
      <Review/>
    </div>
  );
};

export default Shop;
