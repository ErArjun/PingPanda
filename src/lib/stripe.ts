import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "",{
    apiVersion:"2024-12-18.acacia",
    typescript:true
})

export const createCheckoutSession = async ({userEmail,userId}:{userEmail:string,userId:string}) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        customer_email: userEmail,
        line_items: [
            {
               price:"price_1QaLO4EDLH5hBnwmlWCtL6F2",
               quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        metadata:{
            userId
        }
    });

    return session
}