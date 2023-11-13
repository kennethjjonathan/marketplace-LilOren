import React from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { toast } from '@/components/ui/use-toast';

const items = [
  {
    id: '1',
    image: 'https://images.tokopedia.net/img/kurir-jne.png',
    label: 'JNE',
    category: 'Regular',
    description:
      'JNE Reguler adalah paket reguler yang ditawarkan JNE. Kecepatan pengiriman tergantung dari lokasi pengiriman dan lokasi tujuan. Untuk kota yang sama, umumnya memakan waktu 2-3 hari.',
  },
  {
    id: '2',
    image: 'https://images.tokopedia.net/img/kurir-tiki.png',
    label: 'TIKI',
    category: 'Regular',
    description:
      'TIKI Paket Reguler adalah paket yang dapat menjangkau seluruh Indonesia hanya dalam waktu kurang dari 7 hari kerja.',
  },
  {
    id: '3',
    image: 'https://images.tokopedia.net/img/kurir-pos-aja.png',
    label: 'POS',
    category: 'Regular',
    description:
      'Gunakan Pos Reguler, sebagai pilihan tepat untuk pengiriman Suratpos yang mengandalkan kecepatan kiriman dan menjangkau ke seluruh pelosok Indonesia.',
  },
] as const;

const SHIPMENT_SERVICES = 'Shipment Services';
const CHOOSE_SERVICE_DESCRIPTION =
  'Select the courier service you want to provide in your shop';

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const CheckboxCourier = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['1'],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You have successfully updated your shipping information.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">{SHIPMENT_SERVICES}</FormLabel>
                <FormDescription>{CHOOSE_SERVICE_DESCRIPTION}</FormDescription>
              </div>
              {items.map((item) => (
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
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-bold flex flex-col gap-5 w-full">
                          <div className="flex flex-row items-center justify-start gap-4">
                            <Image
                              src={item.image}
                              width={500}
                              height={500}
                              alt={'courier'}
                              className="w-[50px]"
                            />
                            <div className="flex flex-col">
                              <p>{item.label}</p>
                              <p className="font-normal text-[12px] text-muted-foreground">
                                {item.category}
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
        <div className="flex items-end w-full justify-end">
          <Button
            className="w-full md:w-[100px] text-right right-0"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckboxCourier;
