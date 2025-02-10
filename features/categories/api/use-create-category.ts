import {InferRequestType , InferResponseType} from "hono"
import {toast}from "sonner"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]


export const useCreateCategory =()=>{
  const queryClient = useQueryClient()


 const mutation = useMutation<ResponseType,Error,RequestType>({
  mutationFn:async(json)=>{
    const response = await client.api.categories.$post({json})
    return await response.json()
  },
  onSuccess:()=>{
    toast.success("DONE CATEGORY !!!")
    queryClient.invalidateQueries({queryKey:["accounts"]})
  },
  onError:()=>{
toast.error("oops don create category")
  }
})
return mutation
}
