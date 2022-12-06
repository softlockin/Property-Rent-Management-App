from base.api.generator import create_invoice
from base.api.overdue_invoice_check import check

def invoice_scheduled_task():
    create_invoice()

def overdue_check_task():
    check()