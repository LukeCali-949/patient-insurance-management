import React from "react";
import Navbar from "./Navbar";
import WhyUsSection from "./WhyUsSection";
import { useNavigate } from "react-router-dom";
import FAQ from "./FAQsection";
import Footer from "./Footer";
import { ImagesSliderDemo } from "./ImageSlider";
import { InfiniteMovingCardsDemo } from "./MovingCards";
import { BentoGridSecondDemo } from "./BenitoGridDemo";
import { LayoutGridDemo } from "./LayoutGrid";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="w-full bg-gray-900">
      {/* <Navbar /> */}
      <ImagesSliderDemo />
      <InfiniteMovingCardsDemo />
      <section class="bg-gray-900 p-5">
        <div class="mx-[8%] max-w-screen-xl px-4 py-8  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 flex">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              We match patients to doctors and insurance providers
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
              From recommendations to chatbots, MediApp has all you need in a
              management service.
            </p>
            <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900"
            >
              Get started
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="/Patient-and-Health-Insurance-Management-System-Group20-Frontend1/register"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-700 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-800"
            >
              Register
            </a>
          </div>
          <div class="lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://media.istockphoto.com/id/1473559425/photo/female-medical-practitioner-reassuring-a-patient.jpg?s=612x612&w=0&k=20&c=kGbm-TE5qdppyyiteyip7_CzKLktyPrRuWD4Zz2EcqE="
              alt="mockup"
            ></img>
          </div>
        </div>
      </section>

      {/* <BentoGridSecondDemo /> */}
      {/* <div className="flex  laptop:h-[800px] h-[500px]">
        <div className="flex flex-col mt-[50px] laptop:mt-0 laptop:flex-row items-center laptop:justify-center space-y-4 laptop:space-y-0 laptop:space-x-[80px] desktop:space-x-[250px] w-full max-w-4xl mx-auto">
          <img
            src="https://www.regionalonehealth.org/wp-content/uploads/2020/11/Appendix-6.jpg"
            className="w-[80%] laptop:ml-[105px] desktop:w-[800px] h-auto rounded-xl border-2 border-black mb-4 alptop:mb-0"
            alt="Patient and doctor"
          />
          <div className="flex flex-col items-center  laptop:bg-[#E0CCBE] laptop:p-5 rounded-3xl  laptop:border-4 laptop:border-[#dba984] laptop:shadow-xl">
            <h1 className="laptop:text-[45px] text-[22px] laptop:w-[450px] text-[#3C3633] mb-7 text-center font-bold">
              Welcome to Patient and Insurance Management!
            </h1>
            <button
              type="button"
              onClick={handleNavigate}
              className="text-white text-lg bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              New User? Register Here!
            </button>
          </div>
        </div>
      </div> */}
      <WhyUsSection />
      <FAQ />
      <div className="bg-gray-700 h-[150px]"></div>
      <Footer />
    </div>
  );
};

export default LandingPage;

//https://www.colorhunt.co/palette/eeedebe0ccbe7472643c3633
