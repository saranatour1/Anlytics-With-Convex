'use client'

import { use } from "react"

export const useAsync = <T,>(fn: Promise<T>): T =>{
 const data = use(fn) 

 return data
}