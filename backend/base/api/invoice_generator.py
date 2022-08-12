from base.models import RentInvoice

def create_invoice(property_id, owner_id, tenant_id, price, currency, due_day):
    invoice_data = {
        'property_id': property_id, 'owner_id': owner_id, 'tenant_id': tenant_id,
        'price': price, 'currency': currency, 'due_day': due_day}
    
    invoice = RentInvoice.objects.create(**invoice_data)
    invoice.save()

    return invoice