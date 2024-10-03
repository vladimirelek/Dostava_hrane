import Image from "next/image";
const MenuItemBox = ({ handleAddToCart, ...item }) => {
  const { name, price, description, sizes, extraIngredientPrices, image } =
    item;
  return (
    <div className="flex flex-col gap-1 items- w-64 min-h-80 md:w-80 md:h-[500px]  bg-gradient-to-r from-gray-200 to-gray-400  p-4 rounded-lg text-center group hover:border-orange-700 hower:shadow-black/25 transition-all sm:justify-center hover:cursor-pointer border-2">
      <div className="text-center">
        <Image
          src={image}
          alt="kolac"
          className="max-h auto  block mx-auto rounded-2xl"
          width={200}
          height={300}
        ></Image>
      </div>
      <h3 className=" font-extrabold text-2xl my-3 lg:text-2xl text-stone-600 font-pacific">
        {name}
      </h3>
      <h3 className="text-gray-600 ">{description}</h3>
      <h2 className="text-black-600 text-3xl pt-3 ">{`${price} KM`}</h2>
      <button
        onClick={() => {
          handleAddToCart();
        }}
        className="mt-auto text-white bg-orange-600 hover:bg-white hover:cursor-pointer hover:text-black rounded-full px-8  lg:text-xl"
      >
        Dodaj u korpu
      </button>
    </div>
  );
};
export default MenuItemBox;
