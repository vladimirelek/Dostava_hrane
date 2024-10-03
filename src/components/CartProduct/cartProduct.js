import Image from "next/image";
import { cartProductPrice } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const CartProduct = ({ product, onRemove, index }) => {
  return (
    <div className="flex gap-4  mb-2 border-b items-center py-2">
      <div className="w-24">
        <Image
          width={240}
          height={240}
          src={product.image}
          alt="Slika artikla"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm text-gray-700">
            Porcija:<span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>{extra.name}</div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">{cartProductPrice(product)}KM</div>
      {!!onRemove && (
        <div>
          <button onClick={() => onRemove(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};
export default CartProduct;
