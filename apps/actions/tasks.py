from sky_invest_trading.celery import app
from apps.copytrade.models import TradeGroup, Membership

from .models import Action


@app.task()
def action_trade_group(trade_group: TradeGroup) -> None:
    """action создания группы"""
    Action.objects.create(
        user=trade_group.trader.user,
        action_type=Action.ActionType.CREATE_GROUP,
        amount=trade_group.need_sum,
        group=trade_group,
        trader=trade_group.trader,
        status=Action.Status.SUCCESS,
    )


@app.task()
def action_join_trade_group(membership: Membership) -> None:
    """action присоединения к группе"""
    Action.objects.create(
        user=membership.investor,
        action_type=Action.ActionType.JOIN,
        amount=membership.invested_sum,
        group=membership.group,
        trader=membership.group.trader,
        status=Action.Status.SUCCESS
    )


