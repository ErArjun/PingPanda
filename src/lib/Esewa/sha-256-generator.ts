   import { createHmac } from "crypto";
   export function Sha256Generator({ amount, randomId }: { amount: number; randomId: string}): string {
    const data = `total_amount=${amount},transaction_uuid=${randomId},product_code=EPAYTEST`;
    const hash = createHmac("sha256", "8gBm/:&EnhH.1/q")
    .update(data)
    .digest("base64");
    return hash
   }