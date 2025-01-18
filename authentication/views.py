from django.contrib.auth import authenticate as authentication_email
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView


from authentication.serializers import *
from requestforproposalbackend.api_response import api_response


class TestView(APIView):
    def get(self, request):
        data = {"message": "API works"}
        return Response(data=data, status=200)


@extend_schema(tags=["Authentication"])
class AuthenticateView(APIView):
    def post(self, request):
        try:
            print("Received data:", request.data)
            email = request.data["email"]
            password = request.data["password"]
            user = authentication_email(username=email, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                user = User.objects.get(pk=user.id)
                user.last_login = timezone.now()
                user.save()

                user_data = {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "role": user.role.name if user.role else None,
                    "role_id": user.role.id if user.role else None,
                    "super_admin": user.is_superuser,
                }
                response = api_response(
                    [user_data],
                    "success",
                    message="Successfully Login",
                    status_code=200,
                )
                return Response(response, status=200)

            else:
                response = api_response(
                    None, "error", "Invalid username or password", 401
                )
                return Response(response, status=401)

        except KeyError:
            response = api_response(
                None, "error", "Email and password are required", 400
            )
            return Response(response, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


@extend_schema(tags=["Authentication"])
class SignUpView(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
            first_name = request.data["first_name"]
            last_name = request.data["last_name"]

            if User.objects.filter(email=email).exists():
                response = api_response(None, "error", "Email already exists", 400)
                return Response(response, status=400)

            email_domain = email.split("@")[1]
            check_organization = Organization.objects.filter(
                domain=email_domain
            ).first()
            if not check_organization:
                new_organization = Organization.objects.create(
                    domain=email_domain, name=email_domain.upper()
                )

            get_organization = (
                check_organization if check_organization else new_organization
            )

            role = Role.objects.get(name="USER")

            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                is_superuser=False,
                organization=get_organization,
                role=role,
            )

            user_data = {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role.name,
                "role_id": user.role.id,
                "super_admin": False,
            }
            response = api_response(
                [user_data],
                "success",
                message="Successfully Registered",
                status_code=201,
            )
            return Response(response, status=201)

        except KeyError:
            response = api_response(None, "error", "All fields are required", 400)
            return Response(response, status=400)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)


@extend_schema(tags=["Authentication"])
class ResetPasswordView(APIView):
    def post(self, request):
        token = request.data.get("token")
        email = request.data.get("email")
        new_password = request.data.get("new_password")

        if not token or not email or not new_password:
            response = api_response(
                None, "error", "Missing required fields", status.HTTP_400_BAD_REQUEST
            )
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if not user:
            response = api_response(
                None, "error", "User not found", status.HTTP_404_NOT_FOUND
            )
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        reset_token = PasswordResetToken.objects.filter(
            token=token,
            user=user,
            expires_at__gt=timezone.now(),
            is_used=False,
        ).first()

        if not reset_token:
            response = api_response(
                None, "error", "Invalid or expired token", status.HTTP_400_BAD_REQUEST
            )
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(new_password)
        user.save()
        reset_token.is_used = True
        reset_token.save()

        response = api_response(
            None, "success", "Password updated successfully", status.HTTP_200_OK
        )
        return Response(response, status=status.HTTP_200_OK)


class UserListCreateAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        try:
            query_params = request.query_params
            if query_params:
                users = User.objects.filter(**query_params)
                serializer = UserSerializer(users, many=True)
                response = api_response(
                    serializer.data,
                    "success",
                    message="Users retrieved successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                users = User.objects.all()
                serializer = UserSerializer(users, many=True)
                response = api_response(
                    serializer.data,
                    "success",
                    message="All users retrieved successfully",
                    status_code=200,
                )
                return Response(response, status=200)

        except ValidationError as ve:
            response = api_response(None, "error", f"Validation error: {ve}", 400)
            return Response(response, status=400)
        except Exception as e:
            response = api_response(
                None,
                "error",
                f"Unexpected error: {str(e)}",
                status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        try:
            user_data = request.data.copy()

            if "role" in user_data and user_data["role"]:
                try:
                    user_data["role"] = int(user_data["role"])
                except (ValueError, TypeError):
                    return Response(
                        api_response(None, "error", "Invalid role ID format", 400),
                        status=400,
                    )
            role = Role.objects.get(id=user_data["role"])
            if role.is_super_role:
                user_data["is_superuser"] = True
            else:
                user_data["is_superuser"] = False

            user_data["username"] = user_data["email"]

            serializer = self.get_serializer(data=user_data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    "User created successfully",
                    status.HTTP_201_CREATED,
                )
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    api_response(None, "error", serializer.errors, 400), status=400
                )

        except Exception as e:
            print(f"Error creating user: {str(e)}")
            return Response(api_response(None, "error", str(e), 500), status=500)


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(pk=kwargs["pk"])
            serializer = UserSerializer(user)
            response = api_response(
                [serializer.data],
                "success",
                message="User retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)

        except User.DoesNotExist:
            response = api_response(None, "error", "User not found", 404)
            return Response(response, status=404)

        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            user = User.objects.get(pk=kwargs["pk"])
            user_data = request.data.copy()

            if "role" in user_data and user_data["role"]:
                try:
                    user_data["role"] = int(user_data["role"])
                except (ValueError, TypeError):
                    return Response(
                        api_response(None, "error", "Invalid role ID format", 400),
                        status=400,
                    )
            role = Role.objects.get(id=user_data["role"])
            if role.is_super_role:
                user_data["is_superuser"] = True
            else:
                user_data["is_superuser"] = False

            if "organization" in user_data and user_data["organization"]:
                try:
                    user_data["organization"] = int(user_data["organization"])
                except (ValueError, TypeError):
                    return Response(
                        api_response(
                            None, "error", "Invalid organization ID format", 400
                        ),
                        status=400,
                    )

            if "password" in user_data and not user_data["password"]:
                user_data.pop("password")

            serializer = UserSerializer(user, data=user_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="User updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 400)
                return Response(response, status=400)

        except User.DoesNotExist:
            response = api_response(None, "error", "User not found", 404)
            return Response(response, status=404)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            user = User.objects.get(pk=kwargs["pk"])
            user.delete()
            response = api_response(
                None, "success", message="User deleted successfully", status_code=200
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)
        pass

    @extend_schema(exclude=True)
    def patch(self, request, *args, **kwargs):
        pass


class RoleListCreateAPIView(ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def get(self, request, *args, **kwargs):
        try:
            roles = Role.objects.all()
            serializer = RoleSerializer(roles, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Roles retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = RoleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Role created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)


class RoleDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def get(self, request, *args, **kwargs):
        try:
            role = Role.objects.get(pk=kwargs["pk"])
            serializer = RoleSerializer(role)
            response = api_response(
                [serializer.data],
                "success",
                message="Role retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            role = Role.objects.get(pk=kwargs["pk"])
            serializer = RoleSerializer(role, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    message="Role updated successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)
        pass

    def delete(self, request, *args, **kwargs):
        try:
            role = Role.objects.get(pk=kwargs["pk"])
            role.delete()
            response = api_response(
                None, "success", message="Role deleted successfully", status_code=200
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)

    @extend_schema(exclude=True)
    def patch(self, request, *args, **kwargs):
        pass


class OrganizationListCreateAPIView(ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get(self, request, *args, **kwargs):
        try:
            # Prefetch related business cycles to optimize query
            organizations = Organization.objects.all().prefetch_related(
                "business_cycles"
            )
            serializer = OrganizationSerializer(organizations, many=True)
            response = api_response(
                serializer.data,
                "success",
                message="Organizations retrieved successfully",
                status_code=200,
            )
            return Response(response, status=200)
        except Exception as e:
            response = api_response(None, "error", f"An error occurred: {str(e)}", 500)
            return Response(response, status=500)

    def post(self, request, *args, **kwargs):
        try:
            serializer = OrganizationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    serializer.data,
                    "success",
                    message="Organization created successfully",
                    status_code=200,
                )
                return Response(response, status=200)
            else:
                response = api_response(None, "error", serializer.errors, 500)
                return Response(response, status=500)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)


class OrganizationDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get(self, request, *args, **kwargs):
        try:
            organization = Organization.objects.get(pk=kwargs["pk"])
            serializer = OrganizationSerializer(organization)
            response = api_response(
                [serializer.data], "success", "Organization retrieved successfully", 200
            )
            return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)

    def put(self, request, *args, **kwargs):
        try:
            organization = Organization.objects.get(pk=kwargs["pk"])
            serializer = OrganizationSerializer(organization, data=request.data)
            if serializer.is_valid():
                serializer.save()
                response = api_response(
                    [serializer.data],
                    "success",
                    "Organization updated successfully",
                    200,
                )
                return Response(response, status=200)

        except Exception as e:
            response = api_response(None, "error", f"An error occured:{str(e)}", 500)
            return Response(response, status=500)

    def delete(self, request, *args, **kwargs):
        try:
            organization = Organization.objects.get(pk=kwargs["pk"])
            if organization.user_set.exists():
                return Response(
                    api_response(
                        None,
                        "error",
                        "This organization has users. Please delete the users first.",
                        400,
                    ),
                    status=400,
                )
            organization.delete()
            return Response(
                api_response(None, "success", "Organization deleted successfully", 200),
                status=200,
            )
        except Organization.DoesNotExist:
            return Response(
                api_response(None, "error", "Organization not found", 404), status=404
            )
        except Exception as e:
            print(f"Organization deletion error: {str(e)}")
            return Response(
                api_response(None, "error", f"An error occurred: {str(e)}", 500),
                status=500,
            )
