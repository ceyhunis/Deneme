from django.contrib.auth.models import AbstractUser
from django.db import models
from requestforproposalbackend.base_model import BaseModel
from project.models import BusinessCycle


class Organization(BaseModel):
    name = models.CharField(max_length=100)
    domain = models.CharField(max_length=100, default="none")
    business_cycles = models.ManyToManyField(
        BusinessCycle, related_name="organization_business_cycles"
    )


class Role(BaseModel):
    name = models.CharField(max_length=100)
    is_super_role = models.BooleanField(default=False)


class User(AbstractUser, BaseModel):
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)
    value_propositions = models.CharField(default="system", max_length=100)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, null=True, blank=True
    )


class PasswordResetToken(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
