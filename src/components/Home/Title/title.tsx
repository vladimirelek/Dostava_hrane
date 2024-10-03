import Image from "next/image";
const Title = () => {
  return (
    <div className="flex justify-between pl-20 pt-16 pr-36 gap-16">
      <div>
        <h1 className="block text-3xl lg:text-5xl font-pacific font-bold text-gray-700 ">
          Uživajte u slatkim trenucima
          <br /> uz naše ukusne poslastice
        </h1>
        <h4 className="block pt-6 text-xs lg:text-lg min-w-60 ">
          Zasladite svoje dane sa našim raznolikim izborom ručno izrađenih
          <br />
          poslastica, pravljenih s ljubavlju i pažnjom za svaki slatki trenutak
          <br />u vašem životu.
        </h4>
      </div>
      <div className=" min-h-36 min-w-36 ml-4 -z-10">
        <Image src={"/images/cake.jpeg"} alt="kolac" width={300} height={300} />
      </div>
    </div>
  );
};
export default Title;
