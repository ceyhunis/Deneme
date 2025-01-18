from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.models import Role, User
from project.models import *

from project.serializers import *
from requestforproposalbackend.api_response import api_response


class IndustryListCreateAPIView(ListCreateAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

    def get(self, request, *args, **kwargs):
        try:
            industries = Industry.objects.all()
            serializer = IndustrySerializer(industries, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Industries retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = IndustrySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Industry created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class IndustryDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

    def get(self, request, *args, **kwargs):
        try:
            industry = Industry.objects.get(pk=kwargs["pk"])
            serializer = IndustrySerializer(industry)
            response = api_response(
                [serializer.data],
                "success",
                message="Industry retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            industry = Industry.objects.get(pk=kwargs["pk"])
            serializer = IndustrySerializer(industry, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Industry updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            industry = Industry.objects.get(pk=kwargs["pk"])
            industry.delete()
            response = api_response(
                None,
                "success",
                message="Industry deleted successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class ServiceListCreateAPIView(ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get(self, request, *args, **kwargs):
        try:
            services = Service.objects.all()
            serializer = ServiceSerializer(services, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Services retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = ServiceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Service created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class ServiceDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get(self, request, *args, **kwargs):
        try:
            service = Service.objects.get(pk=kwargs["pk"])
            serializer = ServiceSerializer(service)
            response = api_response(
                [serializer.data],
                "success",
                message="Service retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            service = Service.objects.get(pk=kwargs["pk"])
            serializer = ServiceSerializer(service, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Service updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            service = Service.objects.get(pk=kwargs["pk"])
            service.delete()
            response = api_response(
                None, "success", message="Service deleted successfully", status_code=200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class CustomServiceListCreateAPIView(ListCreateAPIView):
    serializer_class = CustomServiceSerializer
    queryset = CustomService.objects.all()

    def get(self):
        return queryset.objects.filter(user=self.request.user)

    def post(self, serializer):
        serializer.save(user=self.request.user)


class BusinessCycleListCreateAPIView(ListCreateAPIView):
    queryset = BusinessCycle.objects.all()
    serializer_class = BusinessCycleSerializer

    def get(self, request, *args, **kwargs):
        try:
            business_cycles = BusinessCycle.objects.all().order_by("order")
            serializer = BusinessCycleSerializer(business_cycles, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Business cycles retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = BusinessCycleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Business cycle created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class CustomBusinessCycleListCreateAPIView(ListCreateAPIView):
    serializer_class = CustomBusinessCycleSerializer
    queryset = CustomBusinessCycle.objects.all()

    def get(self):
        return queryset.objects.filter(user=self.request.user)

    def post(self, serializer):
        serializer.save(user=self.request.user)


class BusinessCycleDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = BusinessCycle.objects.all()
    serializer_class = BusinessCycleSerializer

    def get(self, request, *args, **kwargs):
        try:
            business_cycle = BusinessCycle.objects.get(pk=kwargs["pk"])
            serializer = BusinessCycleSerializer(business_cycle)
            response = api_response(
                [serializer.data],
                "success",
                message="Business cycle retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            business_cycle = BusinessCycle.objects.get(pk=kwargs["pk"])
            serializer = BusinessCycleSerializer(business_cycle, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Business cycle updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            business_cycle = BusinessCycle.objects.get(pk=kwargs["pk"])
            business_cycle.delete()
            response = api_response(
                None,
                "success",
                message="Business cycle deleted successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class FunctionalAreaListCreateAPIView(ListCreateAPIView):
    queryset = FunctionalArea.objects.all().order_by("order")
    serializer_class = FunctionalAreaSerializer

    def get(self, request, *args, **kwargs):
        try:
            if request.query_params:
                quey = {k: v for k, v in request.query_params.items() if v}
                functional_areas = FunctionalArea.objects.filter(**quey).order_by(
                    "order"
                )
                serializer = FunctionalAreaSerializer(functional_areas, many=True)
                response = api_response(
                    serializer.data,
                    "success",
                    message="Functional areas retrieved successfully",
                    status_code=200,
                )
                return Response(response, status=200)

            functional_areas = FunctionalArea.objects.all().order_by("order")
            serializer = FunctionalAreaSerializer(functional_areas, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Functional areas retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            if request.data["business_cycle_id"]:
                business_cycle = BusinessCycle.objects.get(
                    pk=request.data["business_cycle_id"]
                )
                request.data["business_cycle"] = business_cycle.name
            else:
                response = api_response(
                    None, "error", "Business cycle is required", 500
                )
                return Response(response, status=500)

            serializer = FunctionalAreaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Functional area created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class FunctionalAreaDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = FunctionalArea.objects.all()
    serializer_class = FunctionalAreaSerializer

    def get(self, request, *args, **kwargs):
        try:
            functional_area = FunctionalArea.objects.get(pk=kwargs["pk"])
            serializer = FunctionalAreaSerializer(functional_area)
            response = api_response(
                [serializer.data],
                "success",
                message="Functional area retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            functional_area = FunctionalArea.objects.get(pk=kwargs["pk"])
            serializer = FunctionalAreaSerializer(functional_area, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Functional area updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            functional_area = FunctionalArea.objects.get(pk=kwargs["pk"])
            functional_area.delete()
            response = api_response(
                None,
                "success",
                message="Functional area deleted successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class BulkActionsAPIView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            table = request.data["table"]
            action = request.data["action"]
            ids = request.data["ids"]

            if action == "delete":
                if table == "business_cycle":
                    BusinessCycle.objects.filter(id__in=ids).delete()
                elif table == "industry":
                    Industry.objects.filter(id__in=ids).delete()
                elif table == "functional_area":
                    FunctionalArea.objects.filter(id__in=ids).delete()
                elif table == "role":
                    Role.objects.filter(id__in=ids).delete()
                elif table == "user":
                    User.objects.filter(id__in=ids).delete()
                elif table == "service":
                    Service.objects.filter(id__in=ids).delete()
                elif table == "organization":
                    Organization.objects.filter(id__in=ids).delete()
                elif table == "provider":
                    Provider.objects.filter(id__in=ids).delete()
                else:
                    raise Exception(f"Invalid table: {table}")

            response = api_response(
                None,
                "success",
                message=f"{str(action).upper()} action completed successfully",
                status_code=200,
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

class SaveWithMultiDataAPIView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            data_list = request.data["data"]
            table = request.data["table"]
            if not isinstance(data_list, list):
                raise Exception("Data must be a list of items.")
          
            with transaction.atomic():
                for data in data_list[1:]:  # Ignore the first row
                    if table == "business_cycle":
                        if not BusinessCycle.objects.filter(name=data[1]).exists():
                            model_instance = BusinessCycle(name=data[1], description=data[2],order=data[0])
                    elif table == "industry":
                        if not Industry.objects.filter(name=data[0]).exists():
                            model_instance = Industry(name=data[0], description=data[1])
                    elif table == "functional_area":
                        if not FunctionalArea.objects.filter(name=data[0], business_cycle_id=request.data["business_cycle_id"]).exists():
                            data_dict = {
                                "name": data[0],
                                "description": data[1],
                                "business_cycle_id": request.data["business_cycle_id"]
                            }
                            model_instance = FunctionalArea(**data_dict)
                    elif table == "service":
                        if not Service.objects.filter(name=data[0]).exists():
                            model_instance = Service(name=data[0], description=data[1])
                    else:
                        raise Exception("Invalid table")

                    if 'model_instance' in locals():
                        model_instance.full_clean()
                        model_instance.save()
                        del model_instance  # Remove the instance to avoid reuse in the next iteration

            response = api_response(
                None,
                "success",
                message=f"{str(table).upper()} saved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class GeneratedRFPCreateView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            if request.query_params:
                params = {
                    key: value
                    for key, value in request.query_params.items()
                    if value is not None
                }
                generated_rfps = GeneratedRFP.objects.filter(**params)
                serializer = GeneratedRFPSerializer(generated_rfps, many=True)
                response = api_response(
                    serializer.data,
                    "success",
                    message="Generated RFP retrieved successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            generated_rfps = GeneratedRFP.objects.all()
            serializer = GeneratedRFPSerializer(generated_rfps, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Generated RFP retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = GeneratedRFPSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Generated RFP created successfully",
                    status_code=200,
                )
                return Response(response, status=200)

            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)

        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


@api_view(["GET"])
def data_rfp(request):
    try:
        id = request.query_params.get("id")
        rfp = GeneratedRFP.objects.filter(id=id).first()

        if not rfp:
            return Response(
                api_response(None, "error", "RFP not found", 404), status=404
            )

        serializer = GeneratedRFPSerializer(rfp)
        data = serializer.data
        required_fields = [
            "services",
            "business_cycle",
            "functional_areas",
            "functional_areas_descriptions",
        ]
        for field in required_fields:
            if not data.get(field):
                data[field] = []

        return Response(
            api_response([data], "success", "Data retrieved successfully", 200),
            status=200,
        )

    except Exception as e:
        print(f"Data RFP Error: {str(e)}")
        return Response(
            api_response(None, "error", f"An error occurred: {str(e)}", 500), status=500
        )


class SubmittedRFPCreateView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            if request.query_params:
                params = {
                    key: value
                    for key, value in request.query_params.items()
                    if value is not None
                }
                generated_rfps = SubmittedRFP.objects.filter(**params)
                serializer = SubmittedRFPSerializer(generated_rfps, many=True)
                response = api_response(
                    serializer.data,
                    "success",
                    message="Generated RFP retrieved successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            generated_rfps = SubmittedRFP.objects.all()
            serializer = SubmittedRFPSerializer(generated_rfps, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Generated RFP retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = SubmittedRFPSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Generated RFP created successfully",
                    status_code=200,
                )
                return Response(response, status=200)

            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)

        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class SubmittedRFPListCreateAPIView(ListCreateAPIView):
    queryset = SubmittedRFP.objects.all()
    serializer_class = SubmittedRFPSerializer

    def get(self, request, *args, **kwargs):
        try:
            submitted_rfps = SubmittedRFP.objects.all()
            serializer = SubmittedRFPSerializer(submitted_rfps, many=True)
            response = api_response(
                serializer.data, "success", "Submitted RFPs retrieved successfully", 200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = SubmittedRFPSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    "Submitted RFP created successfully",
                    200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class SubmittedRFPDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = SubmittedRFP.objects.all()
    serializer_class = SubmittedRFPSerializer

    def get(self, request, *args, **kwargs):
        try:
            submitted_rfp = SubmittedRFP.objects.get(pk=kwargs["pk"])
            serializer = SubmittedRFPSerializer(submitted_rfp)
            response = api_response(
                [serializer.data],
                "success",
                "Submitted RFP retrieved successfully",
                200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            submitted_rfp = SubmittedRFP.objects.get(pk=kwargs["pk"])
            serializer = SubmittedRFPSerializer(submitted_rfp, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    "Submitted RFP updated successfully",
                    200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            submitted_rfp = SubmittedRFP.objects.get(pk=kwargs["pk"])
            submitted_rfp.delete()
            response = api_response(
                None, "success", "Submitted RFP deleted successfully", 200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)

            return Response(response, status=500)


@api_view(["POST"])
def accept_proposal(request):
    try:
        id = request.data["id"]
        data = SubmittedRFP.objects.get(rfp_id=id)
        data.status = "accepted"
        data.save()
        response = api_response(None, "success", "Proposal accepted successfully", 200)
        return Response(response, status=200)
    except Exception as e:
        response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
        return Response(response, status=500)


@api_view(["POST"])
def reject_proposal(request):
    try:
        id = request.data["id"]
        data = SubmittedRFP.objects.get(rfp_id=id)
        data.status = "rejected"
        data.save()
        response = api_response(None, "success", "Proposal rejected successfully", 200)
        return Response(response, status=200)
    except Exception as e:
        response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
        return Response(response, status=500)


class ProviderListCreateAPIView(ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    def get(self, request, *args, **kwargs):
        try:
            providers = Provider.objects.all()
            serializer = ProviderSerializer(providers, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Providers retrieved successfully",
                status_code=200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = ProviderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Provider created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:

                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


class ProviderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    def get(self, request, *args, **kwargs):
        try:
            provider = Provider.objects.get(pk=kwargs["pk"])
            serializer = ProviderSerializer(provider)
            response = api_response(
                [serializer.data],
                "success",
                message="Provider retrieved successfully",
                status_code=200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            provider = Provider.objects.get(pk=kwargs["pk"])
            serializer = ProviderSerializer(provider, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Provider updated successfully",
                    status_code=200
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            provider = Provider.objects.get(pk=kwargs["pk"])
            provider.delete()
            response = api_response(
                None,
                "success",
                message="Provider deleted successfully",
                status_code=200
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)



