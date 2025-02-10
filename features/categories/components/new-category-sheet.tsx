import {useCreateCategory}  from "@/features/categories/api/use-create-category";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from "@/components/ui/sheet"
import { useNewCategory } from "../hooks/use-new-categories"
import { CategoryForm } from "./Category-form"
import { FormValue } from "hono/types"
import {z}from "zod"
import { insertCateSchema } from "@/db/schema";
const formSchema = insertCateSchema.pick({
    name: true,
  });
type FormValues = z.input<typeof formSchema>
export const NewCategorySheet =()=>{
    const {isOpen , onClose} = useNewCategory()
        const mutation = useCreateCategory()
    const onSubmit = (values:FormValues)=>{
    mutation.mutate(values,{
      onSuccess:()=>{
        onClose()
      }
    })
    }
    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4" >
            <SheetHeader>
                <SheetTitle>
                    New Category
                </SheetTitle>
                <SheetDescription>
                    Create a New Category.
                </SheetDescription>
            </SheetHeader>
            <CategoryForm onSubmit={onSubmit} disabale={mutation.isPending}  />
            </SheetContent>
        </Sheet>
    )
}