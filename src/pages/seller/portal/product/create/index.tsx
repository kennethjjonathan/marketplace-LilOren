import React, { ChangeEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { ArrowUpFromLine, XCircle } from 'lucide-react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import styles from './SellerPortalProductCreate.module.scss';

const SellerPortalProductCreate = () => {
  const [productInformation, setProductInformation] = useState({
    product_images: [],
    product_name: '',
    product_desc: '',
    selected_category: [],
  });

  const [remainingPhotos, setRemainingPhotos] = useState<number>(6);
  const [tempProductPhotos, setTempProductPhotos] = useState<File[]>([]);

  const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = e.target.files as FileList;
    setTempProductPhotos([...tempProductPhotos, selectedFiles?.[0]]);
    setRemainingPhotos((prev) => prev - 1);
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setTempProductPhotos([
      ...tempProductPhotos.slice(0, indexToRemove),
      ...tempProductPhotos.slice(indexToRemove + 1),
    ]);
    setRemainingPhotos((prev) => prev + 1);
  };

  return (
    <div className={`${styles.sellerPortalProductCreate}`}>
      <div
        className={`flex flex-col w-[80vw] sm:w-[90vw] md:w-[47vw] lg:w-[70vw] bg-white`}
      >
        <section
          className={`product-information ${styles.add_product_section}`}
        >
          <p className={`${styles.section_title}`}>{'Product Information'}</p>
          <form>
            <div className={`flex flex-col`}>
              {/* Product Photos */}
              <Label
                htmlFor={'index'}
                className="font-light w-full text-[12px] md:text-base"
              >
                {'Product Photo'}
                <span className="text-primary">{' *'}</span>
              </Label>
              <div className={`input-photos flex flex-wrap`}>
                {tempProductPhotos.map(
                  (file, index) =>
                    file && (
                      <div
                        key={`key-${index.toString()}`}
                        className="relative p-3"
                      >
                        <Image
                          src={file && URL.createObjectURL(file)}
                          width={200}
                          height={200}
                          alt={'product'}
                          className="border-2 border-dashed flex flex-col justify-center items-center h-[75px] w-[75px] gap-2 hover:border-primary duration-500 before:ease-in-out after:ease-in-out hover:text-primary hover:bg-primary/5 lg:h-[100px] lg:w-[100px] rounded-lg"
                        />
                        <XCircle
                          className="text-white bg-destructive hover:bg-red-700 h-fit w-fit rounded-full absolute top-1 right-1"
                          onClick={() => handleRemovePhoto(index)}
                        />
                      </div>
                    ),
                )}
                {remainingPhotos !== 0 && (
                  <div className="p-3">
                    <label
                      className="border-2 border-dashed flex flex-col justify-center items-center h-[75px] w-[75px] gap-2 hover:border-primary duration-500 before:ease-in-out after:ease-in-out hover:text-primary hover:bg-primary/5 lg:h-[100px] lg:w-[100px] rounded-lg mr"
                      htmlFor={`key-image:${tempProductPhotos.length - 1}`}
                    >
                      <ArrowUpFromLine />
                      <p className="text-[10px] font-bold">{`${remainingPhotos} / 6`}</p>
                      <p className="text-[10px] md:text-[12px]">Upload Photo</p>
                    </label>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) =>
                        handleAddPhoto(e, tempProductPhotos.length - 1)
                      }
                      type="file"
                      id={`key-image:${tempProductPhotos.length - 1}`}
                      name="filename"
                      hidden
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

SellerPortalProductCreate.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Add Product">{page}</SellerLayout>;
};

export default SellerPortalProductCreate;
