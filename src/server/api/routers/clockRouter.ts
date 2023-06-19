import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const clockRouter = createTRPCRouter({
  clockIn: protectedProcedure
    .input(z.object({ clockInTime: z.date() }))
    .mutation(async ({ input: { clockInTime }, ctx }) => {
      const clockInEvent = await ctx.prisma.shift.create({
        data: { userId: ctx.session.user.id, clockIn: clockInTime },
      });

      return clockInEvent;
    }),

  clockOut: protectedProcedure
    .input(z.object({ clockOutTime: z.date() }))
    .mutation(async ({ input: { clockOutTime }, ctx }) => {
      const userId = ctx.session.user.id;

      const openShift = await ctx.prisma.shift.findFirst({
        where: {
          userId,
          clockOut: null,
        },
        orderBy: {
          clockIn: "desc",
        },
      });

      if (!openShift) {
        throw new Error("No open shift found for the user");
      }

      const clockOutEvent = await ctx.prisma.shift.update({
        where: { id: openShift.id },
        data: { clockOut: clockOutTime },
      });

      return clockOutEvent;
    }),
});
