from base.models import RentInvoice, Issue, PropertyItem, User

def create_invoice(property_id, owner_id, tenant_id, price, currency, due_day):
    invoice_data = {
        'property_id': property_id, 'owner_id': owner_id, 'tenant_id': tenant_id,
        'price': price, 'currency': currency, 'due_day': due_day}
    
    invoice = RentInvoice.objects.create(**invoice_data)
    invoice.property_name = PropertyItem.objects.get(id=property_id).name
    invoice.save()

    return invoice

def create_issue(name, description):
    property_item = PropertyItem.objects.get(id=19)
    property_owner = User.objects.get(id=5)
    issue_data = {
        'name': name, 'linked_to_property': property_item, 'description': description,
        'closed': False, 'property_owner': property_owner}
    issue = Issue.objects.create(**issue_data)
    issue.property_name = property_item.name
    issue.save()

    return issue