import { type } from "os";
import { useState } from "react";
const MenuItemPriceProps = ({ name, label, props, setProps }) => {
  const [isOpened, setIsOpened] = useState(false);
  const addExtraPrice = () => {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  };
  const removeExtraPrice = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };
  const editExtraPrice = (ev, index, prop) => {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = { ...newSizes[index], [prop]: newValue };
      return newSizes;
    });
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mt-4">
      <button onClick={() => setIsOpened(!isOpened)} type="button">
        {isOpened ? "(Zatvori) " : "(Otvori) "}
        <span>{name}</span>
        <span>{props.length}</span>
      </button>
      <div className={isOpened ? "block" : "hidden"}>
        <label className="text-md text-gray-600">{name}</label>
        {props.length > 0 &&
          props.map((item, index) => (
            <div key={item.name} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Naziv"
                value={item.name}
                onChange={(ev) => editExtraPrice(ev, index, "name")}
              />
              <input
                type="text"
                placeholder="Dodatna cijena"
                value={item.price}
                onChange={(ev) => editExtraPrice(ev, index, "price")}
              />
              <div>
                <button
                  className="bg-white"
                  type="button"
                  onClick={() => removeExtraPrice(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        <button type="button" className="bg-white" onClick={addExtraPrice}>
          {label}
        </button>
      </div>
    </div>
  );
};
export default MenuItemPriceProps;
