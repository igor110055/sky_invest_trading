from sky_invest_trading.celery import app

from .models import Membership, TradeGroup


@app.task()
def withdraw_after_join_to_group(membership_id: int) -> None:
    """Списание денег после присоединения инвестора к группе"""
    membership = Membership.objects.get(id=membership_id)
    balance = membership.investor.balance.balance
    balance -= membership.invested_sum
    balance.save()


@app.task()
def start_group(group_id: int) -> None:
    """Start group"""
    group: TradeGroup = TradeGroup.objects.get(id=group_id)
    amount = 0
    for i in group.memberships.all():
        amount += i.invested_sum
    if group.need_sum == amount:
        group.status = TradeGroup.Status.STARTED
        group.save(update_fields=['status'])


@app.task()
def end_group(group_id: int) -> None:
    group: TradeGroup = TradeGroup.objects.get(id=group_id)
    group.status = TradeGroup.Status.COMPLETED
    group.save(update_fields=['status'])
