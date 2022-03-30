export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type DataContextType = {
  constructorData: IIngredient[];
  setСonstructorData: (value: IIngredient[]) => void;
};
