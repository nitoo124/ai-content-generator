"use client"
import Image from "next/image";
import { TEMPLATE } from "../../_component/TemplatesSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Activity, Loader2Icon } from "lucide-react";

interface Props {
  selectedTemplate?: TEMPLATE;
  useFormInput:any
  loading:boolean
}

function FormSection({ selectedTemplate,useFormInput,loading }: Props) {
  const [formData, setFormData] = useState<any>({});

  // onChange event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useFormInput(formData)
  }

  if (!selectedTemplate) {
    return <div className="p-5 text-gray-500">No template selected</div>;
  }

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <Image
        src={selectedTemplate.icon} 
        alt={selectedTemplate.name} 
        width={70}
        height={70}
      />
      <h2 className="font-bold text-2xl mb-2 text-[#7B19D8]">
        {selectedTemplate.name}
      </h2>
      <p className="text-gray-500 text-sm">
        {selectedTemplate.description}
      </p>

      {/* form */}
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate.form?.map((item) => {
          return(
            <div className="my-2 flex flex-col gap-2 mb-2" key={item.name}>
              <label className="font-bold">{item.label}</label>
              {item.field === "input" ? (
                <Input 
                  name={item.name} 
                  required={item.required}
                  onChange={handleInputChange}
                />
              ) : item.field === "textarea" ? (
                <Textarea 
                  name={item.name}
                  required={item.required}
                  onChange={handleInputChange}
                />
              ) : null}
            </div>
          )
        })}
        <Button type="submit" className="mt-6 p-6 w-full "
         disabled={loading}>
          {loading&&<Loader2Icon className=" animate-spin"/>}
          Generate Content
        </Button>
      </form>
    </div>
  );
}

export default FormSection;