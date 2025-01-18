from django.urls import path

from .views import (
    IndustryListCreateAPIView,
    IndustryDetailAPIView,
    ServiceListCreateAPIView,
    ServiceDetailAPIView,
    CustomServiceListCreateAPIView,
    BusinessCycleListCreateAPIView,
    BusinessCycleDetailAPIView,
    CustomBusinessCycleListCreateAPIView,
    FunctionalAreaListCreateAPIView,
    FunctionalAreaDetailAPIView,
    BulkActionsAPIView,
    SaveWithMultiDataAPIView,
    GeneratedRFPCreateView,
    data_rfp,
    SubmittedRFPCreateView,
    SubmittedRFPListCreateAPIView,
    SubmittedRFPDetailAPIView,
    accept_proposal,
    reject_proposal,
    ProviderListCreateAPIView,
    ProviderDetailAPIView,
)

urlpatterns = [
    path("industry/", IndustryListCreateAPIView.as_view(), name="industry-list-create"),
    path("industry/<int:pk>/", IndustryDetailAPIView.as_view(), name="industry-detail"),
    path("service/", ServiceListCreateAPIView.as_view(), name="service-list-create"),
    path("service/<int:pk>/", ServiceDetailAPIView.as_view(), name="service-detail"),
    path(
        "custom-service/",
        CustomServiceListCreateAPIView.as_view(),
        name="custom-service-list-create",
    ),
    path(
        "business-cycle/",
        BusinessCycleListCreateAPIView.as_view(),
        name="business-cycle-list-create",
    ),
    path(
        "business-cycle/<int:pk>/",
        BusinessCycleDetailAPIView.as_view(),
        name="business-cycle-detail",
    ),
    path(
        "custom-business-cycle/",
        CustomBusinessCycleListCreateAPIView.as_view(),
        name="custom-business-cycle-list-create",
    ),
    path(
        "functional-area/",
        FunctionalAreaListCreateAPIView.as_view(),
        name="functional-area-list-create",
    ),
    path(
        "functional-area/<int:pk>/",
        FunctionalAreaDetailAPIView.as_view(),
        name="functional-area-detail",
    ),
    path("bulk-actions/", BulkActionsAPIView.as_view(), name="bulk-actions"),
    path(
        "save-with-multi-data/",
        SaveWithMultiDataAPIView.as_view(),
        name="save-with-multi-data",
    ),
    path(
        "generated-rfp/", GeneratedRFPCreateView.as_view(), name="generatedrfp-create"
    ),
    path("data/", data_rfp, name="generatedrfp-create"),
    path(
        "submitted-rfp/", SubmittedRFPCreateView.as_view(), name="submittedrfp-create"
    ),
    path(
        "proposal/",
        SubmittedRFPListCreateAPIView.as_view(),
        name="submittedrfp-list-create",
    ),
    path(
        "proposal/<int:pk>/",
        SubmittedRFPDetailAPIView.as_view(),
        name="submittedrfp-detail",
    ),
    path("accept-proposal/", accept_proposal, name="accept-proposal"),
    path("reject-proposal/", reject_proposal, name="reject-proposal"),
    path("provider/", ProviderListCreateAPIView.as_view(), name="provider-list-create"),
    path("provider/<int:pk>/", ProviderDetailAPIView.as_view(), name="provider-detail"),
]
