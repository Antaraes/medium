import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {useForm,SubmitHandler} from 'react-hook-form'
interface FormInput{
    _id:string;
    name:string;
    email:string;
    comment:string;
}
const CommentBox = ({closeComment,post}:any) => {
    const [submitted,setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<FormInput>()
    const onSubmit:SubmitHandler<FormInput> = async(data)=>{
        await fetch('/api/createComments',{
          method:'POST',
          body:JSON.stringify(data),
        })
        .then((response) => {
          if (response.ok) {
            console.log(data)
            setSubmitted(true)
          } else {
            console.log('Error with response', response)
            setSubmitted(false)
          }
        })
        
    }
  return (
    <div className="fixed bottom-0 md:top-0 md:right-0 z-40 w-full md:w-80 h-80 md:h-screen transition-transform -translate-x-full  translate-x-0  delay-300 duration-500 ">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black text-white">
        <div className="flex justify-between">
            <h1>Response</h1>
            <FontAwesomeIcon icon={faClose} size="lg" onClick={()=> closeComment(false)} className="cursor-pointer" />
        </div>
        {
          submitted ? (<h1>Submitted</h1>) : (
            <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
        <h3 className="text-sm text-yellow-500">Enjoyed this article</h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
        <hr className="py-3 mt-3" />
        <input
            {...register("_id")}
            type='hidden'
            name='_id'
            value={post._id} 
        />
          <label htmlFor="" className="block mb-5"  >
            <span className="text-gray-300">Name</span>
            <input 
            {...register("name",{required:true})}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" placeholder="John" type="text" />
          </label >
          <label htmlFor="" className="block mb-5">
            <span className="text-gray-300">Email</span>
            <input 
            {...register("email",{required:true})}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" placeholder="John" type="text" />
          </label >
          <label htmlFor="" className="block mb-5">
            <span className="text-gray-300">Comment</span>
            <textarea 
            {...register("comment",{required:true})}
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring" placeholder="John" rows={8} />
          </label >
          {/* errors will return  */}
          <div className="flex flex-col p-5">
            {errors.name &&(
                <span className="text-red-500">Name is required</span>
            ) }
            {errors.email &&(
                <span className="text-red-500">Email is required</span>
            ) }
            {errors.comment &&(
                <span className="text-red-500">Comment is required</span>
            ) }
          </div>
          <input type="submit" className="shadow bg-yellow-400 hover:bg-white hover:text-black focus:shadow-outline text-white font-bold p-2 rounded" value="Submit" />
        </form>

          )
        }
              </div>
    </div>
  );
};

export default CommentBox;
