import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function hash(h:string){
  location.hash = ""
  location.hash = h
}
export function Wrapper(func:Function,...args:string[]){
    return ()=>func(...args)
}