from base.models import User, RentInvoice, OwnerSummary
import datetime

def check():
    today = datetime.date.today()

    users = User.objects.filter(user_type=1)

    for user in users:
        summary = OwnerSummary.objects.get(user=user)
        invoices = RentInvoice.objects.filter(owner_id=user.id).filter(paid=False)
        overdue = 0
        for invoice in invoices:
            if (invoice.due_day - today).days < 0:
                overdue+=1
        summary.overdue = overdue
        summary.save()

