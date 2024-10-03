import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import MenuItemBox from "./menuItemsBox";

const MenuItem = (menuItem) => {
  const { name, desctiption, sizes, extraIngredientPrices, image } = menuItem;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  let price = 0;
  if (selectedSize) {
    price = selectedSize.price;
  }
  if (selectedExtras) {
    selectedExtras.forEach((element) => {
      price += element.price;
    });
  }

  const handleExtraThingClick = (ev, extraThing) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  };
  const handleAddToCart = () => {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    setSelectedExtras([]);
    toast.success("Dodano u korpu!");
  };
  return (
    <>
      {showPopup && (
        <div
          onClick={() => {
            setShowPopup(false);
          }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-md max-h-screen overflow-scroll my-8"
          >
            <Image
              src={image}
              alt="hrana"
              width={300}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {desctiption}
            </p>
            {sizes.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Izaberi velicinu</h3>
                {sizes.map((size) => (
                  <label
                    key={size.name}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="radio"
                      name="size"
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      checked={selectedSize?.name === size.name}
                    />
                    {size.name} {size.price} KM
                  </label>
                ))}
              </div>
            )}
            {(extraIngredientPrices.length > 0 || sizes.length > 0) && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Izaberi dodatak</h3>
                {extraIngredientPrices.map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="checkbox"
                      name={item.name}
                      onClick={(ev) => handleExtraThingClick(ev, item)}
                    />
                    {item.name} +{item.price} KM
                  </label>
                ))}
                <button
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="primary mt-2"
                  type="button"
                >
                  {" "}
                  Dodaj u korpu ({price}KM)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemBox handleAddToCart={handleAddToCart} {...menuItem} />
    </>
  );
};
export default MenuItem;
