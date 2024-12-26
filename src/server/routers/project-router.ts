
import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { addMonths, startOfMonth } from "date-fns";
import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const projectRouter = router({
    getUsage: privateProcedure.query(async({c,ctx})=>{

        const {user} = ctx

       const currentDate = startOfMonth(new Date())

       const quota = await db.quota.findFirst({
        where:{
            userId:user.id,
            month:currentDate.getMonth() + 1,
            year:currentDate.getFullYear()
        }
       })

       const eventCount = quota?.count ?? 0

       const categoryCount = await db.eventCategory.count({
        where:{
            userId:user.id
        }
       })

       const limits = user.plan == "PRO" ? PRO_QUOTA : FREE_QUOTA

       const resetDate = addMonths(currentDate, 1)
    
        return c.superjson({
            categoriesUsed: categoryCount,
            categoriesLimit: limits.maxEventCategories,
            eventsUsed: eventCount,
            eventsLimit: limits.maxEventsPerMonth,
            resetDate
        })
    }),

    setDiscordID: privateProcedure.input(z.object({discordId:z.string().max(20)}))
    .mutation(async({c,input,ctx})=>{
        const {discordId} = input
        const {user} = ctx

        await db.user.update({
            where:{id:user.id},
            data:{discordId}
        })

        return c.json({success:true})
    })
})