import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useMemo, useState } from "react";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { PcService, ServiceCategory } from "@/types/common";
import { Input, Pagination, Slider } from "antd";
import { optionCreator } from "@/utils";
import ServiceCard from "../ServiceCard/ServiceCard";
import Form from "../Forms/Form";
import { SliderMarks } from "antd/es/slider";

type Props = {};

function AllFilterAbleService({}: Props) {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState([0, 0]);
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const debouncedPrice = useDebounce(price, 500); // 500ms debounce delay
  const [category, setCategory] = useState<SelectOptions>(defaultValue);

  const queryString = useMemo(() => {
    const info = {
      category: category.value.length ? category.value : undefined,
      page,
      minPrice: debouncedPrice[0],
      maxPrice: debouncedPrice[1],
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [category, debouncedSearch, page, debouncedPrice]);
  useEffect(() => {
    setPage(1);
  }, [category, debouncedPrice, debouncedSearch]);
  console.log(queryString);
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetPcServiceQuery(queryString);

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as PcService[];
    content = (
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {info.map((single) => (
            <ServiceCard key={single.id} {...single}></ServiceCard>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            pageSize={data.meta.limit}
            total={data.data.length < data.meta.limit ? 1 : data.meta.total}
            current={data.meta.page}
            onChange={(value) => {
              setPage(value);
            }}
          ></Pagination>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="No data found!"></ErrorCompo>;
  }
  const categoryOption = Object.values(ServiceCategory).map(optionCreator);

  const handleRoleChange = (el: string) => {
    setCategory({ value: el, label: el });
  };
  console.log({ categoryOption });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handlePriceChange = (value: any) => {
    setPrice(value);
  };
  const marks: SliderMarks = {
    0: "$0",
    1000: "$1000",
  };
  return (
    <div className="container mt-10">
      <div className="mt-5 mb-10">
        <div className="flex flex-col flex-wrap md:flex-row items-center gap-4 mb-5 justify-between">
          <div className="flex gap-4 flex-wrap">
            <div className="w-[300px] lg:w-[400px] ">
              <Form submitHandler={() => {}}>
                <FormSelectField
                  name="category"
                  handleChange={handleRoleChange}
                  placeholder="Filter By Category"
                  options={categoryOption}
                  value={category.value}
                ></FormSelectField>
              </Form>
            </div>
            <div className="max-w-[300px] w-full ">
              <Input
                className="max-w-[300px] w-full h-[38px] inline-block"
                type="search"
                name="search"
                onChange={handleSearchChange}
                placeholder="Search by name"
                value={search}
              />
            </div>

            <div className="w-[300px]">
              <Slider
                range
                min={0}
                max={1000}
                onChange={handlePriceChange}
                defaultValue={[20, 50]}
                marks={marks}
                value={price}
                disabled={isFetching}
              />
            </div>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white leading-0 rounded"
              onClick={() => {
                setCategory(defaultValue);
                setSearch("");
                setPrice([0, 0]);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}

export default AllFilterAbleService;
