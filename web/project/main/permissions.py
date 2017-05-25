from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAuthenticatedOrCreate(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return super(IsAuthenticatedOrCreate, self).has_permission(request, view)

class IsOwner(BasePermission):
    message = "You must be the owner of this object."
    def has_object_permission(self, request, view, obj):
        my_safe_methods = []
        if request.method in my_safe_methods:
            return True
        return obj.owner == request.user