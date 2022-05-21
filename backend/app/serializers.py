from rest_framework import serializers

from .models import Vulnerability


class VulnerabilitySerializer(serializers.ModelSerializer):
    """Serializador da classe 'Vulnerability'. Serializa todos os campos
    """
    class Meta:
        model = Vulnerability
        fields = "__all__"
