import {useCreateAccount}  from "@/features/accounts/api/use-create-account";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-account"
import { AccountForm } from "./account-form"
import { FormValue } from "hono/types"
import {z}from "zod"
import { insertAccountSchema } from "@/db/schema";
const formSchema = insertAccountSchema.pick({
    name: true,
  });
type FormValues = z.input<typeof formSchema>
export const NewAccountsSheet =()=>{
    const {isOpen , onClose} = useNewAccount()
        const mutation = useCreateAccount()
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
                    New Account
                </SheetTitle>
                <SheetDescription>
                    Create a New account to track your transections.
                </SheetDescription>
            </SheetHeader>
            <AccountForm onSubmit={onSubmit} disabale={mutation.isPending}  />
            </SheetContent>
        </Sheet>
    )
}