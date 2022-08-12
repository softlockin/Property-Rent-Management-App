from rest_framework import permissions

class IsTenantPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.user_type == 1:
            return True
        elif user.user_type == 2 and request.method in permissions.SAFE_METHODS:
            return True
        else:
            return False
