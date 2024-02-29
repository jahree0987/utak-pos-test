import { Food } from "@/app/food/types/Food";
import { AllMenuItems } from "@/app/menu/types/AllMenuItems";

export type Menu = {
  name: string;
  description: string;
  keys?: string | undefined | null; 
  items?: AllMenuItems[]
};


