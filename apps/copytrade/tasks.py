from sky_invest_trading.celery import app

from .models import Membership


@app.task()
def withdraw_after_join_to_group(membership: Membership) -> None:
    """Списание денег после присоединения инвестора к группе"""
    balance = membership.investor.balance.balance
    balance -= membership.invested_sum
    balance.save()



