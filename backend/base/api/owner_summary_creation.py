from base.models import OwnerSummary

def create_summary(user_id):
    data = {'user_id': user_id}

    summary = OwnerSummary.objects.create(**data)
    summary.save()

    return summary