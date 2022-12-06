from base.models import RentInvoice, Issue, PropertyItem, User
import datetime
import logging

logger = logging.getLogger("console_message")

def create_invoice():
    today = datetime.date.today()
    generate_invoice_for = PropertyItem.objects.exclude(tenant_id=None)
    
    if len(generate_invoice_for) > 0:
        for item in generate_invoice_for:
            due_date = today.replace(day=item.rent_due_day)
            tenant_email= User.object.get(id=item.tenant_id).tenant_email
            invoice_data = {
                'property_id': item.id, 'property_name': item.name, 'owner_id': item.owner_id, 'tenant_id': item.tenant_id, 'tenant_email': tenant_email,
                'price': item.price, 'currency': ('LEI' if item.currency==2 else 'EUR'), 'due_day': due_date}
            
            invoice = RentInvoice.objects.create(**invoice_data)
            logger.info("Generated invoice for "+item.name)
            invoice.save()

def create_issue(name, description, by_id):
    property_item = PropertyItem.objects.get(id=26)
    property_owner = User.objects.get(id=5)
    created_by = User.objects.get(id=by_id)
    issue_data = {
        'name': name, 'linked_to_property': property_item, 'description': description,
        'closed': False, 'property_owner': property_owner, 'created_by': created_by}
    issue = Issue.objects.create(**issue_data)
    issue.property_name = property_item.name
    issue.save()

    print('created new issue')

    return issue