import { User } from "@prisma/client";
import { Sha256Generator } from "./sha-256-generator";


export const Esewa =  (user:User) => {
  const amount = 100
  const randomId=crypto.randomUUID().split('-').map(part => part).join('').slice(0,6)

 
  
  const formData: Record<string, string> = {
    amount: `${amount}`,
    failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature:`${Sha256Generator({amount,randomId})}`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    tax_amount: "0",
    total_amount:`${amount}`,
    transaction_uuid: `${randomId}`,
  }

  const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"

  submitForm(path,formData)
}


function submitForm(path:string, formData:Record<string,string>) {
  if (typeof path !== "string" || typeof formData !== "object") {
    throw new Error("Invalid arguments: path must be a string and formData must be an object.");
  }

  // Create a form element
  const form = document.createElement("form");
  form.method = "POST";
  form.action = path;

  // Add hidden input fields for each key-value pair in formData
  Object.entries(formData).forEach(([key, value]) => {
    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = key;
    hiddenField.value = value;
    form.appendChild(hiddenField);
  });

  // Append the form to the body, submit it, and then remove it
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}