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
import {
  IAllCategoryOfPcService,
  PcService,
  ServiceAvailability,
} from "@/types/common";
type IRes = {
  chooseService: IAllCategoryOfPcService[];
  popularService: PcService[];
  upComingServices: PcService[];
};
type Props = {
  data: IRes;
};
export default function Home({ data }: Props) {
  console.log(data);
  return (
    <HomeLayout>
      <div>
        <Banner></Banner>
        <EventsByCategory services={data.chooseService}></EventsByCategory>
        <HomeService services={data.popularService}></HomeService>
        <UpcommingServices
          upComingServices={data.upComingServices}
        ></UpcommingServices>
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
export async function getStaticProps() {
  const allUrl = [
    fetch(
      `https://pc-service-provider-backend.vercel.app/api/v1/pcService/allCategoryOfPcService`
    ),
    fetch(
      `https://pc-service-provider-backend.vercel.app/api/v1/pcService?limit=6&availability=TWENTY_FOUR_SEVEN`
    ),
    fetch(
      `https://pc-service-provider-backend.vercel.app/api/v1/pcService?limit=3&availability=UNAVAILABLE`
    ),
  ];
  const baseRes = await Promise.all(allUrl);
  // const datas = await res.map(single => single.json());

  const [chooseService, popularService, upComingServices] = await Promise.all(
    baseRes.map((single) => single.json())
  );
  return {
    props: {
      data: {
        chooseService: chooseService.data,
        popularService: popularService.data,
        upComingServices: upComingServices.data,
      },
    },
  };
}
