import { Input } from "./index";
import React, { useRef, useState, useEffect } from "react";

function InputValueGetter() {
  
  function handleEvnt(){
    if(box.current.style.backgroundColor === "purple"){
      box.current.style.backgroundColor = "red";
    }else{
      box.current.style.backgroundColor = "purple";
    }
  }

  return(
    <>
      <Input name={input} className="size-16 bg-red-600" ref={input} />
      <button className="py-2 px-4 rounded-md bg-purple-900 hover:bg-blue-900 text-white shadow-md shadow-black" onClick={()=>handleEvnt()}>
        Change Color
      </button>


    </>
  )
}

export default InputValueGetter;