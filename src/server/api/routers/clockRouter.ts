// clockRouter
import { endOfMonth, startOfMonth } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const clockRouter = createTRPCRouter({
  clockIn: protectedProcedure
    .input(z.object({ clockInTime: z.date() }))
    .mutation(async ({ input: { clockInTime }, ctx }) => {
      const { session, prisma } = ctx;
      const userId = session.user.id;

      // Find the pay period based on the current date
      const currentDate = new Date();
      const existingPayPeriod = await prisma.payPeriod.findFirst({
        where: {
          startDate: { lte: currentDate },
          endDate: { gte: currentDate },
        },
      });

      const payPeriod =
        existingPayPeriod ||
        (await ctx.prisma.payPeriod.create({
          data: {
            startDate: startOfMonth(currentDate),
            endDate: endOfMonth(currentDate),
            employees: { connect: { id: userId } },
          },
        }));

      const clockInEvent = await prisma.shift.create({
        data: {
          userId: userId,
          clockIn: clockInTime,
          payPeriodId: payPeriod.id, // Assign the payPeriodId
        },
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
