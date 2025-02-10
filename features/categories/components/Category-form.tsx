import {z}from "zod"

import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"

import { insertCateSchema } from "@/db/schema";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";



const formSchema =insertCateSchema.pick({
    name: true,
  });

type FormValues = z.input<typeof formSchema>

type Props ={
    id?:string,
    defaultValues?:FormValues,
    onSubmit:(values: FormValues)=> void
    onDelete?:()=>void
    disabale?:boolean
}

export const CategoryForm =({id,onSubmit,defaultValues,disabale,onDelete }: Props )=>{

    const form = useForm<FormValues>({
      resolver:  zodResolver(formSchema),
      defaultValues:defaultValues

    })
    const handlerSubmit=(values:FormValues)=>{
    onSubmit(values)
    }
    const handDelet=()=>{
        console.log("delet")
        onDelete?.()
    }
        return(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handlerSubmit)} className="space-y-4 pt-4">
                <FormField name="name" control={form.control} render={({field})=>(
                    <FormItem>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input disabled={disabale} placeholder="e.g Food,Travel,etc" {...field}   />
                        
                    </FormControl>
                </FormItem>
                )
                }/>

                <Button className="w-full" disabled={disabale}>
                    {id? "save change" : "create category" }
                </Button>
             {!!id&&<Button type="button" disabled={disabale} onClick={handDelet} className="w-full" variant="outline">
             <Trash className="size-4 mr-2"/>
             Delete category
             </Button>}
            </form>
            </Form>
        )
}