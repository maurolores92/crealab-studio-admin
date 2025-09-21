import { ISelect } from 'src/types/apps/genericTypes'

export const setListSelect= (
    list: any[],
    fieldValue: string,
    fieldkey: string,
    fieldkeyTwo = ''
    ): ISelect[] => {

    if(!list || !list.length ) return [];
    
    return list.map((i :any) => {
        return {
            value: Number(i[fieldValue]),
            key: `${i[fieldkey]}${fieldkeyTwo ? ' - ' + i[fieldkeyTwo] : ''}`
        }
    })
}

export const insert = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
];

export const groupBy = (array: any[], key: string): any[] => {
    const values = array.reduce((acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
      {});
      
    return Object.values(values);
  };

  const majorkey = (array: number[]) => {
    const getMax = (a: number, b: number) => Math.max(a, b);

    return array.reduce(getMax);
  };

  export const createId = (array: any[], field= 'id') => {
    if (array.length) {
      const majorId = (majorkey(array.map((i: any) => i[field]))) + 1;

      return majorId;
    }
    
    return 1;
  };
