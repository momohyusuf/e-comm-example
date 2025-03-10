import ProductList from "@/components/pages/marketplace/ProductList";
import Marquee from "react-fast-marquee";

export default function Marketplace() {
  return (
    <section className="container mx-auto p-4">
      <Marquee className="bg-black py-4 rounded-md text-white font-semibold">
        <p className="ml-4">Gentlemen Wears </p>
        <p className="ml-4">Watches</p>
        <p className="ml-4">Men&apos;s Bag</p>
        <p className="ml-4">Exclusive deals</p>
        <p className="ml-4">Best Prices</p>
        <p className="ml-4">Fast delivery</p>
      </Marquee>
      <h1 className="text-3xl lg:text-5xl text-center my-8 text-amber-500 font-semibold animate-pulse">
        Home of affordable wears
      </h1>
      <ProductList />
    </section>
  );
}
