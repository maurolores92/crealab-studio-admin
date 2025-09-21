// ** Types
import { ReactNode, createContext, useContext, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export type NewProductContextType = {
  stages: any[] | null;
  mainImage?: any | null;
  files?: any[] | null;
  handleSubmit?: any;
  register?: any;
  control?: any;
  reset?: any;
  product?: any;
  watch?: (...args: any[]) => any;
  errors?: any;
  setValue?: any;
  setStages: (value: any[] | null) => void;
  setMainImage: (value: any | null) => void;
  setFiles?: (value: any[]) => void;
  setProduct: (value: any[]) => void;
  insumos?: any[];
  setInsumos?: (value: any[]) => void;
};

// ** Defaults
const defaultProvider: NewProductContextType = {
  stages: [],
  setStages: () => [],
  setMainImage: () => { return null },
  setProduct: () => { return null },
  insumos: [],
  setInsumos: () => [],
}

const NewProductContext = createContext(defaultProvider)

export const useNewProductContent = () => useContext(NewProductContext)

type Props = {
  children: ReactNode,
  defaultValues?: any;
  schema?: any;
};

const NewProductProvider = ({ children, defaultValues, schema }: Props) => {

  const [ stages, setStages ] = useState<any[] | null>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<any | null>();
  const [product, setProduct] = useState<any | null>(defaultValues);
  const [insumos, setInsumos] = useState<any[]>([]);

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: product || defaultValues,
    resolver: yupResolver(schema)
  });

  const values = {
  control,
  handleSubmit,
  register,
  watch,
  errors,
  reset,
  setValue,
  stages, setStages,
  files, setFiles,
  mainImage, setMainImage,
  product, setProduct,
  insumos, setInsumos,
  }

  return <NewProductContext.Provider value={values}>{children}</NewProductContext.Provider>
}

export { NewProductContext, NewProductProvider }
