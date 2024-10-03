import Link from "next/link";
import Title from "@/components/Home/Title/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Menu from "@/components/Home/HomeMenu/menu";
import Image from "next/image";
import AboutUs from "@/components/Home/AboutUs/aboutUs";
import Contact from "@/components/Home/Contact/contact";

export default function Home() {
  console.log(process.env.NEXTAUTH_URL);
  return (
    <div>
      <Title />
      <Link
        href={"#about"}
        className="bg-orange-600 text-white rounded-3xl w-28 h-8 flex justify-evenly  items-center font-bold ml-20 my-2 lg:w-40 lg:h-12 "
      >
        Saznaj više
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      <Image
        className="absolute -left-16 w-1/4 md:w-1/5 -z-10"
        src="/images/cookies.jpeg"
        alt="cookie"
        width={250}
        height={250}
      />
      <Menu />
      <AboutUs />
      <Contact />
    </div>
  );
}
