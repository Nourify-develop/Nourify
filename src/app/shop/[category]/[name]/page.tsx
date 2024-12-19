"use client"
import Wrapper from "@/layout/wrapper"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { products } from "@/ui/products/_data"
import { reviewDrop, route, size } from "./_data"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import Typography from "@/components/typography"
import { ArrowRight, Dot, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CaretRightIcon } from "@radix-ui/react-icons"

export default function ProductDisplay() {
  const { category, name } = useParams()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [count, setCount] = useState<number>(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(searchParams.get("size"))
  const decodedName = decodeURIComponent(`${name}`)
  const product = products.find(
    (p) => p.category === category && p.name === decodedName
  )

  if (!product) {
    return <div>Product Not Found</div>
  }

  const routeData = route(category as string, decodedName)

  useEffect(() => {
    setSelectedSize(searchParams.get("size"))
  }, [searchParams])

  const handleSizeClick = (key: string) => {
    setSelectedSize(key)
    const params = new URLSearchParams(searchParams.toString())
    params.set("size", key)
    window.history.pushState(null, '', `${pathname}?${params.toString()}`)
  }

  const totalRatings = product.totalReviews;
  const ratingCounts = {
    "5": 7,
    "4": 8,
    "3": 10,
    "2": 4,
    "1": 2,
  };

  return (
    <Wrapper className="bg-white">
      <nav className="flex items-center gap-x-3 text-gray-5 border-b border-gray-2 py-2">
        <p className="text-gray-5">Shop /</p>
        {routeData.map((item, idx) => (
          <Fragment key={idx}>
            <Link href={item.link} className={`capitalize hover:text-gray-3 ${idx === routeData.length - 1 ? "text-gray-4" : "text-gray-5"}`}>
              {item.title}
            </Link>
            {idx < routeData.length - 1 && <span> / </span>}
          </Fragment>
        ))}
      </nav>
      <section className="w-full py-6">
        <article className="flex items-center justify-between gap-x-24 md:flex-row  flex-col ">
          <Image src={product.image} width={0} height={0} alt={product.name} className="md:w-[50%] w-full h-auto" />
          <aside className="md:w-[50%] w-full flex flex-col gap-y-4">
            <section className="flex flex-col gap-y-6">
              <div className="flex justify-between items-center pt-4">
                <Typography.h3 className="!text-gray-3">{product.name}</Typography.h3>
                <span className="md:hidden block">
                  <small className={`w-max flex items-center gap-x-1 px-2 py-0.5 rounded-2xl ${product.stock === "In Stock" ? "text-green-1 bg-green-1/30" : "text-red-600 bg-red-600/30"}`}><Dot />{product.stock}</small>
                  <span></span>
                </span>
              </div>
              
              <Typography.p>{product.description}</Typography.p>

              <span className="md:block hidden">
                <small className={`w-max flex items-center gap-x-1 px-2 py-0.5 rounded-2xl ${product.stock === "In Stock" ? "text-green-1 bg-green-1/30" : "text-red-600 bg-red-600/30"}`}><Dot />{product.stock}</small>
                <span></span>
              </span>

              <Typography.h1 className="!text-gray-4 !font-bold">₦{product.price}<sub className="text-sm font-normal">/per pack</sub></Typography.h1>

              <section className="flex flex-col gap-y-2">
                <Typography.p isGray>Quantity</Typography.p>
                <span className="w-max flex items-center gap-x-4 bg-gray-2 px-1.5 py-1 rounded-2xl">
                  <button type="button" onClick={() => setCount(prev => Math.max(1, prev - 1))}><Minus width={18} /></button>
                  {count}
                  <button type="button" onClick={() => setCount(count + 1)}><Plus width={18} /></button>
                </span>
              </section>
              <section className="flex flex-col gap-y-2">
                <Typography.p isGray>Size</Typography.p>
                <span className="flex items-center gap-x-6">
                  {size.map((item) => (
                    <button type="button"
                      key={item.key}
                      onClick={() => handleSizeClick(item.key)}
                      className={`px-5 py-1.5 rounded-3xl ${selectedSize === item.key ? "bg-gray-6 text-white" : "bg-gray-2 text-gray-4"}`}
                    >
                      {item.title}
                    </button>
                  ))}
                </span>
              </section>
              <section className="flex md:flex-col md:gap-y-4 gap-[10px]">
                <Button className="w-full rounded-3xl text-lg font-normal order-2 md:order-1">Buy Now</Button>
                <Button variant="outline" className="md:w-full rounded-3xl text-lg text-green-1 font-normal order-1 md:order-2">Add to Cart</Button>
              </section>
            </section>
          </aside>
        </article>
      </section>
      <section className="w-full flex flex-col md:flex-col items-start justify-between gap-x-12 border-t border-gray-6 py-4">
        <aside className="w-full flex flex-col gap-y-6">
          <nav className="flex itemc justify-between">
            <aside>
              <Typography.h3 className="!text-gray-4">Reviews</Typography.h3>
              <Typography.s className="!text-gray-5">({product.reviews.length} out of {product.totalReviews})</Typography.s>
            </aside>

            <Select>
              <SelectTrigger className="w-[10em] rounded-full !bg-gray-2 !border-none">
                <SelectValue placeholder="Most Recent" />
              </SelectTrigger>
              <SelectContent>
                {reviewDrop.map((item) => (
                  <SelectItem value={item.title} key={item.key}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </nav>

          <span className="flex flex-col gap-y-6">
            {product.reviews.map((item) => (
              <div className="flex flex-col gap-y-2">
                <span className="flex items-center gap-x-4">
                  <Image src={"/icons/avatar.svg"} width={0} height={0} className="w-auto h-auto" alt={item.user} />
                  <span>
                    <Typography.h4>{item.user}</Typography.h4>
                    <span>{item.rating}</span>
                  </span>
                </span>
                <Typography.p isGray>{item.comment}</Typography.p>
                <div className="flex items-center gap-x-4">
                  <span className="text-green-1">Reply</span> <Dot />
                  <span className="text-green-1">View replies</span>
                </div>
              </div>
            ))}
          </span>

          <button className="w-max px-4 py-2 rounded-full bg-gray-200 text-green-1 text-base ml-auto flex items-center">See all reviews <CaretRightIcon width={24} /> </button>
        </aside>

        <aside className="w-full pt-4">
          <nav className="flex items-center justify-between">
            <Typography.h3 className="!text-gray-4">Ratings</Typography.h3>
            <span>
              <Typography.h3 className="!text-gray-4 flex items-center">
                {product.rating} <sub className="text-gray-5 font-normal flex">(<span className="md:block hidden  ">{totalRatings}</span> <span>total</span>)</sub>
              </Typography.h3>
            </span>
          </nav>

          {/* Display Ratings */}
          {Object.entries(ratingCounts).map(([rating, count]) => {
            const percentage = ((count / totalRatings) * 100).toFixed(1);
            return (
              <div className="flex items-center gap-x-4" key={rating}>
                <span className="text-gray-5">{rating}.0</span>
                <progress className="w-full h-4 !rounded-full" value={percentage} max="100"></progress>
                <span className="md:block hidden">{count}</span>
              </div>
            );
          })}
        </aside>
      </section>
    </Wrapper>
  )
}
