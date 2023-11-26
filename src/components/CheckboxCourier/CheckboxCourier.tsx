import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import { ToastContent } from 'react-toastify';
import AsyncButton from '../AsyncButton/AsyncButton';
import Head from 'next/head';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { useRouter } from 'next/navigation';

const SHIPMENT_SERVICES = 'Shipment Services';
const CHOOSE_SERVICE_DESCRIPTION =
  'Select the courier service you want to provide in your shop';

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

export interface IMerchantCourier {
  id: number;
  name: string;
  image_url: string;
  description: string;
  is_available: boolean;
}

export interface IPutCourier {
  '1': boolean;
  '2': boolean;
  '3': boolean;
}

type TypePutCourier = '1' | '2' | '3';

const CheckboxCourier = () => {
  const [sellerCourier, setSellerCourier] = useState<IPutCourier>({
    '1': false,
    '2': false,
    '3': false,
  });

  const [merchantCourier, setMerchantCourier] = useState<IMerchantCourier[]>(
    [],
  );

  const [currentCourier, setCurrentCourier] = useState<string[]>([]);
  const [loadingChangeCourier, setLoadingChangeCourier] =
    useState<boolean>(false);
  const [loadingFetchCourier, setLoadingFetchCourier] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: currentCourier,
    },
  });

  const getListCourier = async () => {
    setLoadingFetchCourier(true);
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `${CONSTANTS.BASEURL}/merchant/courier`,
      });
      const updatedCurrentCourier: string[] = [];
      const updatedSellerCourier = { ...sellerCourier };
      response.data.data.map((courier: IMerchantCourier, index: number) => {
        if (courier.is_available && courier.id === 1) {
          updatedSellerCourier['1'] = true;
          updatedCurrentCourier.push(courier.id.toString());
        }

        if (courier.is_available && courier.id === 2) {
          updatedSellerCourier['2'] = true;
          updatedCurrentCourier.push(courier.id.toString());
        }
        if (courier.is_available && courier.id === 3) {
          updatedSellerCourier['3'] = true;
          updatedCurrentCourier.push(courier.id.toString());
        }
      });
      setSellerCourier(updatedSellerCourier);
      setCurrentCourier(updatedCurrentCourier);
      setMerchantCourier(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
    setLoadingFetchCourier(false);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updatedSellerCourier = { ...sellerCourier };
    data.items.forEach((val: string) => {
      updatedSellerCourier[val as TypePutCourier] = true;
    });
    setSellerCourier(updatedSellerCourier);
    setLoadingChangeCourier(true);
    try {
      const response = await axiosInstance({
        method: 'PUT',
        url: `${CONSTANTS.BASEURL}/merchant/update/courier`,
        data: sellerCourier,
      });
      if (response.status === 200) {
        const responseAPI = {
          error: false,
          message: 'success change courier',
        };
        Utils.notify(responseAPI.message as ToastContent, 'success', 'light');
        return responseAPI;
      }
    } catch (error: any) {
      const responseAPI = {
        error: true,
        message: 'failed change courier',
      };
      Utils.notify(responseAPI.message as ToastContent, 'error', 'light');
      return responseAPI;
    }
    setLoadingChangeCourier(false);
  };

  const handleCheck = (
    field: ControllerRenderProps<
      {
        items: string[];
      },
      'items'
    >,
    id: string,
  ) => {
    setCurrentCourier([...currentCourier, id]);
    setSellerCourier({ ...sellerCourier, [id]: true });
    field.onChange([...field.value, id]);
  };

  const handleUnCheck = (
    field: ControllerRenderProps<
      {
        items: string[];
      },
      'items'
    >,
    id: string,
  ) => {
    setSellerCourier({ ...sellerCourier, [id]: false });
    setCurrentCourier(currentCourier.filter((val) => val !== id));
    field.onChange(field.value?.filter((value) => value !== id));
  };

  useEffect(() => {
    getListCourier();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>LilOren | Seller Shipment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={'LilOren'} />
        <meta
          name="description"
          content={'LilOren is an e-commerce for everything you need'}
        />
        <meta name="og:title" content={`LilOren`} />
        <meta
          name="og:description"
          content={'LilOren is an e-commerce for everything you need'}
        />
        <meta name="og:type" content="website" />
      </Head>
      {loadingFetchCourier ? (
        <div className="w-full h-[calc(100vh-30vh)]">
          <DotsLoading />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      {SHIPMENT_SERVICES}
                    </FormLabel>
                    <FormDescription>
                      {CHOOSE_SERVICE_DESCRIPTION}
                    </FormDescription>
                  </div>
                  {merchantCourier.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 border-[1px] rounded-lg p-4 shadow-sm"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  field.value?.includes(item.id.toString()) ||
                                  currentCourier.includes(item.id.toString())
                                }
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? handleCheck(field, item.id.toString())
                                    : handleUnCheck(field, item.id.toString());
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-bold flex flex-col gap-5 w-full">
                              <div className="flex flex-row items-center justify-start gap-4">
                                <Image
                                  src={item.image_url}
                                  width={500}
                                  height={500}
                                  alt={'courier'}
                                  className="w-[50px]"
                                />
                                <div className="flex flex-col">
                                  <p>{item.name}</p>
                                  <p className="font-normal text-[12px] text-muted-foreground">
                                    {'Regular'}
                                  </p>
                                </div>
                              </div>
                              <>
                                <div className="border-t-[0.5px]"></div>
                                <p className="font-light text-muted-foreground text-[12px] sm:text-[14px] leading-normal">
                                  {item.description}
                                </p>
                              </>
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            {loadingChangeCourier ? (
              <div className="flex items-end w-full justify-end">
                <AsyncButton isLoading={true}>Loading</AsyncButton>
              </div>
            ) : (
              <div className="flex items-end w-full justify-end">
                <Button
                  className="w-full md:w-[100px] text-right right-0"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </>
  );
};

export default CheckboxCourier;
