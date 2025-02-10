"use client"
import { usePathname,useRouter } from "next/navigation"
import { Menu } from "lucide-react"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {useMedia} from "react-use"
import NavButton from "./nav-button"
import { useState } from "react";
import { Button } from "./ui/button";

const routes =[
    {
    href :'/' , 
    label:"Overview"
    },
    {
    href :'/transactions' , 
    label:"transactions"
    },
    {
    href :'/accounts' , 
    label:"Accounts"
    },
    {
    href :'/categories' , 
    label:"Categories"
    },
    {
    href :'/settings' , 
    label:"Settings"
    }
    ,]



export const NavigationHeader=()=>{
    const [isOpen , setIsOpen] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const ismobile = useMedia("(max-width:1024px)", false)

    const onClick=(href:string)=>{
        router.push(href)
        setIsOpen(false)
    }
    if(ismobile){
        return(
 <Sheet open={isOpen} onOpenChange={setIsOpen}>
   <SheetTrigger>
     <Button variant="outline" size="sm" className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition">
         <Menu className="size-4"/>
    </Button>
   </SheetTrigger>
   <SheetContent side={"left"} className="px-2">
<nav className="flex flex-col gap-y-2 pt-6">
    {routes.map(rout=>{
        return <Button key={rout.href} variant={rout.href === pathname? "secondary": "ghost" } onClick={()=> onClick(rout.href)}>
            
            {rout.label}
        </Button>
    })}
</nav>
   </SheetContent>
 </Sheet>
        )
    }
    return(
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((rout)=>{
                return  <NavButton key={rout.href} href={rout.href}  label={rout.label} isActive={pathname===rout.href}  />
            })}
        </nav>
    )

}









               