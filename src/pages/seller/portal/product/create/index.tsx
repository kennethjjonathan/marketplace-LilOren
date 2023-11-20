import React, { ChangeEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { ArrowUpFromLine, Info, XCircle } from 'lucide-react';
import ProductVariant from '@/components/ProductVariant/ProductVariant';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import styles from './SellerPortalProductCreate.module.scss';
import {
  IProductVariant,
  IIsProductVariantValid,
  IVariantGroup,
  IVariantDefinition,
  INonVariant,
} from '@/interface/addProduct';

const maxOptLength: number = 3;

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

  // PRODUCT VARIANT -- START
  const [isVariantActive, setIsVariantActive] = useState<boolean>(false);
  const [noVarPrice, setNoVarPrice] = useState<number | ''>(0);
  const [noVarStock, setNoVarStock] = useState<number | ''>(0);
  const [isNoVarValid, setIsNoVarValid] = useState<{
    price: boolean;
    stock: boolean;
  }>({
    price: true,
    stock: true,
  });
  const [variants, setVariants] = useState<IProductVariant[]>([
    { variant_name: '', options: [undefined] },
  ]);
  const [isVariantsValid, setIsVariantsValid] = useState<
    IIsProductVariantValid[]
  >([{ variant_name: true, options: [true] }]);
  const [price, setPrice] = useState<(number | '')[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
  );
  const [stocks, setStocks] = useState<(number | '')[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
  );
  const [isPriceValid, setIsPriceValid] = useState<boolean[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
  );
  const [isStockValid, setIsStockValid] = useState<boolean[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
  );
  function checkIfOptDuplicate(
    index: number | undefined,
    biggerIndex: number,
  ): boolean {
    let isDuplicate = false;
    const duplicateArray: number[] = [];
    const options: (string | undefined)[] = [...variants[biggerIndex].options];
    const newIsVariantsValid = [...isVariantsValid];
    if (index !== undefined) {
      for (let i = 0; i < options.length; i++) {
        for (let j = i + 1; j < options.length; j++) {
          if (
            options[i] !== undefined &&
            options[j] !== undefined &&
            options[i] !== '' &&
            options[j] !== '' &&
            options[i]?.toLowerCase().trim() ===
              options[j]?.toLowerCase().trim()
          ) {
            isDuplicate = true;
            duplicateArray.push(i);
            duplicateArray.push(j);
          }
        }
      }
      if (isDuplicate && duplicateArray.length !== 0) {
        duplicateArray.forEach((item) => {
          newIsVariantsValid[biggerIndex].options[item] = false;
        });
      } else {
        options.forEach((item, itemIndex) => {
          if (itemIndex !== index && item !== '') {
            newIsVariantsValid[biggerIndex].options[itemIndex] = true;
          }
        });
      }
      setIsVariantsValid(newIsVariantsValid);
    } else {
      for (let i = 0; i < options.length; i++) {
        for (let j = i + 1; j < options.length; j++) {
          if (
            options[i] !== undefined &&
            options !== undefined &&
            options[i] !== '' &&
            options[j] !== '' &&
            options[i]?.toLowerCase().trim() ===
              options[j]?.toLowerCase().trim()
          ) {
            isDuplicate = true;
            duplicateArray.push(i);
            duplicateArray.push(j);
          }
        }
        if (isDuplicate && duplicateArray.length !== 0) {
          duplicateArray.forEach((item) => {
            newIsVariantsValid[biggerIndex].options[item] = false;
          });
        } else {
          options.forEach((item, itemIndex) => {
            if (item !== '') {
              newIsVariantsValid[biggerIndex].options[itemIndex] = true;
            }
          });
        }
        setIsVariantsValid(newIsVariantsValid);
      }
    }
    return isDuplicate;
  }
  function checkIfNameDuplicate(biggerIndex: number | undefined): boolean {
    let isDuplicate = false;
    if (variants.length === 1) {
      return isDuplicate;
    }
    const newIsVariantsValid = [...isVariantsValid];
    if (
      variants[0].variant_name !== '' &&
      variants[1].variant_name !== '' &&
      variants[0].variant_name.toLowerCase().trim() ===
        variants[1].variant_name.toLowerCase().trim()
    ) {
      isDuplicate = true;
      newIsVariantsValid[0].variant_name = false;
      newIsVariantsValid[1].variant_name = false;
      setIsVariantsValid(newIsVariantsValid);
    } else {
      if (biggerIndex !== undefined) {
        newIsVariantsValid.forEach((_, index) => {
          if (index !== biggerIndex) {
            newIsVariantsValid[index].variant_name = true;
          }
        });
      } else {
        newIsVariantsValid.forEach((_, index) => {
          newIsVariantsValid[index].variant_name = true;
        });
      }
      setIsVariantsValid(newIsVariantsValid);
    }
    return isDuplicate;
  }
  function validateNoVar(): boolean {
    let isContinue: boolean = true;
    if (noVarPrice === '' || noVarPrice < 99) {
      isContinue = false;
      setIsNoVarValid({ ...isNoVarValid, price: false });
    }
    if (noVarStock === '' || noVarStock < 0) {
      isContinue = false;
      setIsNoVarValid({ ...isNoVarValid, stock: false });
    }
    return isContinue;
  }
  function validateVar(): boolean {
    let isContinue: boolean = true;
    const newIsVariantsValid = [...isVariantsValid];
    if (checkIfNameDuplicate(undefined)) {
      isContinue = false;
    }
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].variant_name === '') {
        isContinue = false;
        newIsVariantsValid[i].variant_name = false;
      }
      if (checkIfOptDuplicate(undefined, i)) {
        isContinue = false;
      }
      for (let j = 0; j < variants[i].options.length; j++) {
        if (
          (variants[i].options.length === 1 &&
            variants[i].options[j] === undefined) ||
          variants[i].options[j] === ''
        ) {
          isContinue = false;
          newIsVariantsValid[i].options[j] = false;
        }
      }
    }
    setIsVariantsValid(newIsVariantsValid);
    if (variants.length === 1) {
      const newIsPriceValid = [...isPriceValid];
      const newIsStockValid = [...isStockValid];
      for (let i = 0; i < variants[0].options.length; i++) {
        if (
          variants[0].options[i] !== undefined &&
          (price[i][0] === '' || (price[i][0] as number) < 99)
        ) {
          isContinue = false;
          const newSmallArray = [...newIsPriceValid[i]];
          newSmallArray[0] = false;
          newIsPriceValid[i] = newSmallArray;
        }
        if (
          variants[0].options[i] !== undefined &&
          (stocks[i][0] === '' || (stocks[i][0] as number) < 0)
        ) {
          isContinue = false;
          const newSmallArray = [...newIsStockValid[i]];
          newSmallArray[0] = false;
          newIsStockValid[i] = newSmallArray;
        }
      }
      setIsPriceValid(newIsPriceValid);
      setIsStockValid(newIsStockValid);
    }
    if (variants.length === 2) {
      const newIsPriceValid = [...isPriceValid];
      const newIsStockValid = [...isStockValid];
      for (let i = 0; i < variants[0].options.length; i++) {
        for (let j = 0; j < variants[1].options.length; j++) {
          if (
            variants[0].options[i] !== undefined &&
            variants[1].options[j] !== undefined &&
            (price[i][j] === '' || (price[i][j] as number) < 99)
          ) {
            isContinue = false;
            const newSmallArray = [...newIsPriceValid[i]];
            newSmallArray[j] = false;
            newIsPriceValid[i] = newSmallArray;
          }
          if (
            variants[0].options[i] !== undefined &&
            variants[1].options[j] !== undefined &&
            (stocks[i][j] === '' || (stocks[i][j] as number) < 0)
          ) {
            isContinue = false;
            const newSmallArray = [...newIsStockValid[i]];
            newSmallArray[j] = false;
            newIsStockValid[i] = newSmallArray;
          }
        }
      }
      setIsPriceValid(newIsPriceValid);
      setIsStockValid(newIsStockValid);
    }
    return isContinue;
  }
  function validateAll(): boolean {
    let isContinue: boolean = true;
    if (!isVariantActive && !validateNoVar()) {
      isContinue = false;
    }
    if (isVariantActive && !validateVar()) {
      isContinue = false;
    }
    return isContinue;
  }
  function logEndProduct() {
    if (!validateAll()) {
      console.log('gagal');
      return;
    }

    if (!isVariantActive) {
      const payload: INonVariant[] = [
        {
          price: noVarPrice as number,
          stock: noVarStock as number,
        },
      ];
      console.log(payload);
      return;
    }

    if (variants.length === 2) {
      const variantTypes1: string[] = [];
      for (let i = 0; i < variants[0].options.length; i++) {
        if (variants[0].options[i] !== undefined) {
          variantTypes1.push(variants[0].options[i] as string);
        }
      }
      const variantTypes2: string[] = [];
      for (let i = 0; i < variants[1].options.length; i++) {
        if (variants[1].options[i] !== undefined) {
          variantTypes2.push(variants[1].options[i] as string);
        }
      }
      const variant_definition: IVariantDefinition = {
        variant_group_1: {
          name: variants[0].variant_name,
          variant_types: variantTypes1,
        },
        variant_group_2: {
          name: variants[1].variant_name,
          variant_types: variantTypes2,
        },
      };
      const variant_group: IVariantGroup[] = [];
      for (let i = 0; i < variants[0].options.length; i++) {
        for (let j = 0; j < variants[1].options.length; j++) {
          if (
            variants[0].options[i] !== undefined &&
            variants[1].options[j] !== undefined
          ) {
            const variantGroup: IVariantGroup = {
              variant_type_1: variants[0].options[i] as string,
              variant_type_2: variants[1].options[j] as string,
              price: price[i][j] as number,
              stock: stocks[i][j] as number,
            };
            variant_group.push(variantGroup);
          }
        }
      }
      console.log({
        variant_definition: variant_definition,
        variants: variant_group,
      });
      return;
    }

    if (variants.length === 1) {
      const variantTypes1: string[] = [];
      for (let i = 0; i < variants[0].options.length; i++) {
        if (variants[0].options[i] !== undefined) {
          variantTypes1.push(variants[0].options[i] as string);
        }
      }
      const variant_definition: IVariantDefinition = {
        variant_group_1: {
          name: variants[0].variant_name,
          variant_types: variantTypes1,
        },
      };
      const variant_group: IVariantGroup[] = [];
      for (let i = 0; i < variants[0].options.length; i++) {
        if (variants[0].options[i] !== undefined) {
          const variantGroup: IVariantGroup = {
            variant_type_1: variants[0].options[i] as string,
            price: price[i][0] as number,
            stock: stocks[i][0] as number,
          };
          variant_group.push(variantGroup);
        }
      }
      console.log({
        variant_definition: variant_definition,
        variants: variant_group,
      });
      return;
    }
  }
  // PRODUCT VARIANT -- END

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
      {/* Product Variants -- START */}
      <div
        className={`flex flex-col w-[80vw] sm:w-[90vw] md:w-[47vw] lg:w-[70vw] bg-white`}
      >
        <section className={`${styles.add_product_section}`}>
          <p className={`${styles.section_title}`}>{'Product Information'}</p>
          <div className="pb-3">
            <ProductVariant
              isVariantActive={isVariantActive}
              setIsVariantActive={setIsVariantActive}
              noVarPrice={noVarPrice}
              setNoVarPrice={setNoVarPrice}
              noVarStock={noVarStock}
              setNoVarStock={setNoVarStock}
              isNoVarValid={isNoVarValid}
              setIsNoVarValid={setIsNoVarValid}
              variants={variants}
              setVariants={setVariants}
              isVariantsValid={isVariantsValid}
              setIsVariantsValid={setIsVariantsValid}
              price={price}
              setPrice={setPrice}
              stocks={stocks}
              setStocks={setStocks}
              isPriceValid={isPriceValid}
              setIsPriceValid={setIsPriceValid}
              isStockValid={isStockValid}
              setIsStockValid={setIsStockValid}
              checkIfOptDuplicate={checkIfOptDuplicate}
              checkIfNameDuplicate={checkIfNameDuplicate}
              logEndProduct={logEndProduct}
            />
          </div>
        </section>
      </div>
      {/* Product Variants -- END */}
    </div>
  );
};

SellerPortalProductCreate.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Add Product">{page}</SellerLayout>;
};

export default SellerPortalProductCreate;
