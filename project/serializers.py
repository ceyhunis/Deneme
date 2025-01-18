from rest_framework import serializers

from project.models import (
    Industry,
    Provider,
    Service,
    CustomService,
    BusinessCycle,
    CustomBusinessCycle,
    FunctionalArea,
    GeneratedRFP,
    SubmittedRFP,
)


class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class CustomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomService
        fields = "__all__"


class BusinessCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCycle
        fields = "__all__"


class CustomBusinessCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomBusinessCycle
        fields = "__all__"


class FunctionalAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunctionalArea
        fields = "__all__"


class GeneratedRFPSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedRFP
        fields = "__all__"

    def validate(self, data):
        required_fields = [
            "value_propositions",
            "user",
            "industry",
            "services",
            "business_cycles",
            "areas",
        ]
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError({field: "This field is required."})
        return data


class SubmittedRFPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedRFP
        fields = "__all__"


class ProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provider
        fields = "__all__"
