import Banner from "@/components/HomeCompo/Banner";
import Blog from "@/components/HomeCompo/Blog";
import EventsByCategory from "@/components/HomeCompo/EventsByCategory";
import Faqs from "@/components/HomeCompo/Faqs";
import HomeService from "@/components/HomeCompo/HomeService";
import HowItsWork from "@/components/HomeCompo/HowItsWork";
import OurStore from "@/components/HomeCompo/OurStore";
import Testimonials from "@/components/HomeCompo/Testimonials";
import UpcommingServices from "@/components/HomeCompo/UpcommingServices";
import WhyChooseUs from "@/components/HomeCompo/WhyChooseUs";
import HomeLayout from "@/layout/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <div>
        <Banner></Banner>
        <EventsByCategory></EventsByCategory>
        <HomeService></HomeService>
        <UpcommingServices></UpcommingServices>
        <HowItsWork></HowItsWork>
        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
        <Blog></Blog>
        <Faqs></Faqs>
        <OurStore></OurStore>
      </div>
    </HomeLayout>
  );
}
