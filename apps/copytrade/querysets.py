from django.db import models


class GroupQuerySet(models.QuerySet):
    def with_amount_collected(self):
        amount = 0
        for investors in self.prefetch_related('memberships'):
            for i in investors.memberships.all():
                amount += i.invested_sum
        return self.annotate(amount_collected=models.Value(amount), first_name=models.F('trader__user__first_name'),
                             last_name=models.F('trader__user__last_name'), email=models.F('trader__user__email'))
