import React, { ChangeEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { ArrowUpFromLine, Info, XCircle } from 'lucide-react';
import ProductVariant from '@/components/ProductVariant/ProductVariant';
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

  const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
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
            <div className={`flex flex-col w-fit`}>
              {/* Product Photos */}
              <div className="flex flex-row">
                <Label
                  htmlFor={'index'}
                  className="font-light w-full text-[10px] lg:text-[12px] md:text-base flex flex-row gap-2"
                >
                  <>
                    <p className="text-[12px] lg:text-[14px]">
                      {'Product Photos'}
                    </p>
                    <span className="text-primary">{' *'}</span>
                  </>
                  <div className={`${styles.product_icon} hidden lg:block`}>
                    <Info size={15} className="text-muted-foreground" />
                    <div
                      className={`${styles.product_info} bg-white sm:w-[350px] md:w-[400px] lg:w-[500px] text-[12px] absolute p-6 rounded-xl border-2 duration-500 before:ease-in-out after:ease-in-out `}
                    >
                      <span>
                        Image format .jpg .jpeg .png and minimum size 300 x
                        300px (For optimal images use a minimum size of 700 x
                        700 px)
                      </span>
                      <span>
                        {
                          "Select a product photo. Upload min. 3 photos that are interesting and different from each other to attract buyers' attention."
                        }
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
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
                      className="border-2 border-dashed flex flex-col justify-center items-center h-[75px] w-[75px] gap-2 hover:border-primary duration-500 before:ease-in-out after:ease-in-out text-primary hover:bg-primary/5 lg:h-[100px] lg:w-[100px] rounded-lg mr"
                      htmlFor={`key-image:${tempProductPhotos.length - 1}`}
                    >
                      <ArrowUpFromLine />
                      <p className="text-[10px] lg:text-[12px] font-bold">{`${remainingPhotos} / 6`}</p>
                      <p className="text-[10px] lg:text-[12px]">Upload Photo</p>
                    </label>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => handleAddPhoto(e)}
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
            <div className={``}></div>
          </form>
        </section>
      </div>
      {/* Product Variants */}
      <div
        className={`flex flex-col w-[80vw] sm:w-[90vw] md:w-[47vw] lg:w-[70vw] bg-white`}
      >
        <section className={`${styles.add_product_section}`}>
          <p className={`${styles.section_title}`}>{'Product Information'}</p>
          <div className="pb-3">
            <ProductVariant />
          </div>
        </section>
      </div>
    </div>
  );
};

SellerPortalProductCreate.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Add Product">{page}</SellerLayout>;
};

export default SellerPortalProductCreate;
