import React, { ReactElement, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ProductVariant from '@/components/ProductVariant/ProductVariant';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import {
  IProductVariant,
  IIsProductVariantValid,
  IVariantGroup,
  IVariantDefinition,
  INonVariant,
  IProductInformation,
} from '@/interface/addProduct';
import PhotosArray from '@/components/PhotosArray/PhotosArray';
import { Textarea } from '@/components/ui/textarea';

const maxPhoto: number = 6;
const maxNameLength: number = 255;
const maxDescLength: number = 3000;
const minDescLength: number = 20;
const maxOptLength: number = 3;

const SellerPortalProductCreate = () => {
  const [productInformation, setProductInformation] =
    useState<IProductInformation>({
      product_name: '',
      product_desc: '',
      weight: '',
      selected_category: [],
    });
  const [isProductInformationValid, setIsProductInformationValid] = useState({
    product_name: true,
    product_desc: true,
    weight: true,
    selected_category: true,
  });

  function handleChangeProductInfoString(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof IProductInformation,
  ) {
    const { value } = e.target;
    if (key === 'product_name' && value.length > maxNameLength) return;
    if (key === 'product_desc' && value.length > maxDescLength) return;
    if (/^\s+$/.test(value) || value === '') {
      setProductInformation({ ...productInformation, [key]: '' });
      return;
    } else {
      setProductInformation({ ...productInformation, [key]: value });
    }
  }

  function handleChangeWeight(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setProductInformation({ ...productInformation, weight: e.target.value });
      return;
    }
    const inputValue = parseInt(e.target.value);
    if (isNaN(inputValue) || inputValue < 0) {
      setProductInformation({ ...productInformation, weight: 0 });
    } else {
      setProductInformation({ ...productInformation, weight: inputValue });
    }
  }

  function handleNumKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (['e', 'E', '+', '-', ' '].includes(e.key)) {
      e.preventDefault();
    }
  }

  function validateOnBlur(key: keyof IProductInformation) {
    if (key === 'product_name' && productInformation.product_name === '') {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: false,
      });
      return;
    } else if (
      key === 'product_name' &&
      productInformation.product_name !== ''
    ) {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: true,
      });
      return;
    }

    if (
      key === 'weight' &&
      (productInformation.weight === '' || productInformation.weight < 1)
    ) {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: false,
      });
      return;
    } else if (key === 'weight' && (productInformation.weight as number) >= 1) {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: true,
      });
      return;
    }

    if (
      key === 'product_desc' &&
      productInformation.product_desc.length < minDescLength
    ) {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: false,
      });
      return;
    } else if (
      key === 'product_desc' &&
      productInformation.product_desc.length >= minDescLength
    ) {
      setIsProductInformationValid({
        ...isProductInformationValid,
        [key]: true,
      });
      return;
    }
  }

  // ADD PHOTO
  const [remainingPhotos, setRemainingPhotos] = useState<number>(maxPhoto);
  const [tempProductPhotos, setTempProductPhotos] = useState<File[]>([]);

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
    <div className="w-[70vw] flex flex-col gap-8">
      <section className="bg-white w-full rounded-xl p-8 shadow-lg">
        <p className="font-bold text-[12px] lg:text-[16px] pb-4">
          {'Product Information'}
        </p>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-1 w-full">
            <p className="w-full font-light text-xs pl-40">{`${productInformation.product_name.length} / ${maxNameLength} characters`}</p>
            <div className="flex items-center gap-2 w-full">
              <Label
                className="min-w-fit w-40 text-right font-light text-xs lg:text-sm"
                htmlFor="product-name"
              >
                Product name
                <span className="text-primary">{'* '}</span>:
              </Label>
              <Input
                id="product-name"
                type="text"
                className="w-full"
                value={productInformation.product_name}
                onChange={(e) =>
                  handleChangeProductInfoString(e, 'product_name')
                }
                isValid={isProductInformationValid.product_name}
                onBlur={() => validateOnBlur('product_name')}
                required
              />
            </div>
            {!isProductInformationValid.product_name && (
              <p className="w-full text-destructive text-xs pl-40">
                Name cannot be empty
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="w-full font-light text-xs pl-40">{`(gram)`}</p>
            <div className="flex items-center gap-2 w-full">
              <Label
                className="min-w-fit w-40 text-right font-light text-xs lg:text-sm"
                htmlFor="product-weight"
              >
                Product weight
                <span className="text-primary">{'* '}</span>:
              </Label>
              <Input
                id="product-weight"
                type="number"
                className="w-full"
                value={productInformation.weight}
                onChange={(e) => handleChangeWeight(e)}
                isValid={isProductInformationValid.weight}
                onBlur={() => validateOnBlur('weight')}
                min={0}
                onKeyDown={(e) => handleNumKeyDown(e)}
                onWheel={(e) => e.currentTarget.blur()}
                required
              />
            </div>
            {!isProductInformationValid.weight && (
              <p className="w-full text-destructive text-xs pl-40">
                Weight cannot be empty or below 1
              </p>
            )}
          </div>
          <PhotosArray
            tempProductPhotos={tempProductPhotos}
            setTempProductPhotos={setTempProductPhotos}
            remainingPhotos={remainingPhotos}
            setRemainingPhotos={setRemainingPhotos}
          />
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-end w-full justify-between">
              <Label
                className="min-w-fit text-right font-light text-xs lg:text-sm"
                htmlFor="product-description"
              >
                Product description
                <span className="text-primary">{'* '}</span>:
              </Label>
              <p className="w-fit font-light text-xs">{`${productInformation.product_desc.length} / ${maxDescLength} characters`}</p>
            </div>
            <Textarea
              id="product-description"
              className="w-full h-60"
              value={productInformation.product_desc}
              onChange={(e) => handleChangeProductInfoString(e, 'product_desc')}
              isValid={isProductInformationValid.product_desc}
              onBlur={() => validateOnBlur('product_desc')}
              required
            />
            {!isProductInformationValid.product_desc && (
              <p className="w-full text-destructive text-xs">
                {`Description cannot be less than ${minDescLength} characters`}
              </p>
            )}
          </div>
        </div>
      </section>
      {/* Product Variants -- START */}
      <section className="bg-white w-full rounded-xl p-8 shadow-lg">
        <p className="font-bold text-[12px] lg:text-[16px] pb-4">
          {'Price & Stock'}
        </p>
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
      </section>
      {/* Product Variants -- END */}
    </div>
  );
};

SellerPortalProductCreate.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Add Product">{page}</SellerLayout>;
};

export default SellerPortalProductCreate;
