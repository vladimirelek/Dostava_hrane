const AboutUs = () => {
  return (
    <div className="flex flex-col items-center mx-52">
      <div className="flex flex-col my-16 gap-4 text-orange-600 items-center">
        <h3 className=" text-sm lg:text-xl ">NAŠA PRIČA</h3>
        <h2 className="text-3xl font-extrabold font lg:text-5xl" id="about">O NAMA</h2>
      </div>
      <p className="md:text-xl text-[12px] text-center text-gray-500">
        U srcu Istočnog Sarajeva, slastičarna je započela svoje putovanje 2018.
        godine. Ova slatka oaza zaposljava oko 10 posvećenih radnika koji
        svakodnevno stvaraju čaroliju u svojoj kuhinji.
      </p>
      <p className="md:text-xl text-[12px] text-center text-gray-500 pt-5">
        Sa strašću i posvećenošću, nastoji sačuvati tradicionalne kolače i
        njegovati domaće recepte, pružajući svojim gostima autentično iskustvo
        okusa iz domaće kuhinje.
      </p>
      <p className="md:text-xl text-[12px] text-center text-gray-500 py-5">
        Trudimo se da opravdamo očekivanja naših dragih gostiju, nudeći im
        najfinije poslastice i tradicionalne kolače po pristupačnim cijenama,
        kako bi svako uživanje u našim proizvodima bilo dostupno i nezaboravno
        iskustvo.
      </p>
    </div>
  );
};
export default AboutUs;
