import uuid
from django.db import models
from django.utils.translation import gettext as _
# Create your models here.


class Vulnerability(models.Model):
    id = models.UUIDField(("id"), primary_key=True,
                          default=uuid.uuid4, editable=False)
    asset_hostname = models.CharField(
        _("ASSET HOSTNAME"), max_length=50, null=True, blank=True)
    asset_ip_address = models.CharField(
        _("ASSET IP ADDRESS"), max_length=50, null=True, blank=True)
    vulnerability_title = models.CharField(
        _("VULNERABILITY TITLE"), max_length=200, null=True, blank=True)
    vulnerability_severity = models.CharField(
        _("VULNERABILITY SEVERITY"), max_length=200, null=True, blank=True)
    vulnerability_cvss = models.FloatField(
        _("VULNERABILITY CVSS"), null=True, blank=True)
    vulnerability_publication_date = models.CharField(
        _("VULNERABILITY PUBLICATION DATE"), max_length=200, null=True, blank=True)
    is_fixed = models.BooleanField(_("IS FIXED"), default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.asset_hostname
