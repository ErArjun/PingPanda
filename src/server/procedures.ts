import { j } from "./__internals/j"

const authMiddlware=j.middleware(({next})=>{
    const user = {name:"arjun"}
   return next({user})
})

export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure =publicProcedure.use(authMiddlware)