from django.conf import settings
from django.db import models
from requestforproposalbackend.base_model import BaseModel


class Industry(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    url = models.CharField(max_length=100, blank=True, null=True)


class Service(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField()


class CustomService(BaseModel):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()


class BusinessCycle(BaseModel):
    order = models.IntegerField(default=1)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)


class CustomBusinessCycle(BaseModel):
    order = models.IntegerField(default=1)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)


class FunctionalArea(BaseModel):
    business_cycle_id = models.ForeignKey(BusinessCycle, on_delete=models.CASCADE)
    order = models.IntegerField(default=1)
    name = models.CharField(max_length=180)
    description = models.TextField()


class GeneratedRFP(BaseModel):
    rfp_name = models.CharField(max_length=100)
    rfp_description = models.TextField()
    company_url = models.CharField(max_length=100, blank=True, null=True)
    value_propositions = models.CharField(max_length=260)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)
    services = models.ManyToManyField(Service)
    questionnaires = models.JSONField(default=list)
    business_cycles = models.ManyToManyField(BusinessCycle)
    areas = models.ManyToManyField(FunctionalArea)
    descriptions = models.JSONField(default=list)


class SubmittedRFP(BaseModel):
    rfp_id = models.IntegerField()
    user_id = models.IntegerField()
    status = models.CharField(
        max_length=100, default="in-progress", null=True, blank=True
    )
    last_login_to_rfp = models.DateField(auto_now_add=True, blank=True, null=True)
    last_login_ip_address = models.CharField(max_length=100, blank=True, null=True)
    pdf_link = models.CharField(max_length=10000, blank=True, null=True)
    is_opened = models.BooleanField(default=False)
    recived_person = models.CharField(max_length=100)
    recived_person_email = models.CharField(max_length=100)


class Provider(BaseModel):
    company_name = models.CharField(max_length=100)
    contact_name = models.CharField(max_length=100)
    contact_phone = models.CharField(max_length=100)
    contact_email = models.CharField(max_length=100)
