from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializer import ProductSerializer, UserSerializer, UserSerializerWithToken, ProfileSerializer, SkillSerializer, EducationSerializer, ExperienceSerializer, LanguageSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
from .models import Product, Review, Profile, Skill, Education, Experience, Language
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def handle404(request, exception):
    return render(request, '404.html')
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/                          => Get All Routes',
        '-------------------------------------------------------',
        '/api/users/login/              => Login',
        '/api/users/register/           => Register',
        '-------------------------------------------------------',
        '/api/users/                    => Get All Users (admin)',
        '/api/users/profile/            => Get User Profile',
        '-------------------------------------------------------',
        '/api/users/profile/update/     => Update User Profile',
        '-------------------------------------------------------',
        '/api/products/                 => Get All Product',
        '/api/products/<id>/            => Get Single Product',
        '-------------------------------------------------------',
        '/api/products/<id>/reviews/    => Update User Profile',
        '-------------------------------------------------------',
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # if User.objects.filter(first_name=data['name']).exists():
        #     message = {'detail': 'User Name already exists. Please try with another one.'}
        #     return Response(message, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('q')
    if(query == None):
        query=''
    
    words = query.split(" ")
    q_filters = Q()
    for word in words:
        q_filters |= Q(name__icontains=word)

    products = Product.objects.filter(q_filters)

    page = request.query_params.get('page')
    paginator = Paginator(products, 6)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    number = products.number

    page_rangeStart = products.paginator.page_range.start
    if (int(page_rangeStart) < int(number) - 3):
        page_rangeStart = number - 3

    page_rangeEnd = products.paginator.page_range.stop
    if (int(page_rangeEnd) > int(number) + 3):
        page_rangeEnd = number + 4

    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        "num_pages": paginator.num_pages,
        "has_previous": products.has_previous(),
        "has_next": products.has_next(),
        "page_rangeStart": page_rangeStart,
        "page_rangeEnd": page_rangeEnd,
        'page': number
    })

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        review = Review.objects.get(product=product, user=user)
        review.rating=data['rating']
        review.comment=data['comment']
        review.save()
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

    reviews = product.review_set.all()
    product.numReviews = len(reviews)

    total = 0
    for i in reviews:
        total += i.rating
    
    product.rating = total / len(reviews)
    product.save()

    return Response({'details': 'Review Submitted'})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserInfo(request):
    userInfo = Profile.objects.all().order_by('-id')
    serializer = ProfileSerializer(userInfo, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfoDetails(request):
    user = request.user
    userInfo = Profile.objects.get(user=user)
    serializer = ProfileSerializer(userInfo, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserInfo(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)

    if data['firstName'] != '':
        userInfo.firstName = data['firstName']
    if data['lastName'] != '':
        userInfo.lastName = data['lastName']
    if data['professionalTitle'] != '':
        userInfo.professionalTitle = data['professionalTitle']
    if data['address'] != '':
        userInfo.address = data['address']
    if data['birthday'] != '':
        userInfo.birthday = data['birthday']
    if data['phone'] != '':
        userInfo.phone = data['phone']

    if data['facebook'] != '':
        userInfo.facebook = data['facebook']
    if data['instagram'] != '':
        userInfo.instagram = data['instagram']
    if data['github'] != '':
        userInfo.github = data['github']
    if data['linkedin'] != '':
        userInfo.linkedin = data['linkedin']
    if data['gmail'] != '':
        userInfo.gmail = data['gmail']
    if data['website'] != '':
        userInfo.website = data['website']

    if data['about'] != '':
        userInfo.about = data['about']

    userInfo.save()
    serializer = ProfileSerializer(userInfo, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addSkill(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)
    
    item = Skill(skillName=data['skillName'], skillValue=data['skillValue'], skill_connected=userInfo)
    item.save()

    serializer = SkillSerializer(item, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSkill(request, pk):
    item = Skill.objects.get(id=pk)
    item.delete()
    return Response('Successfully deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addEducation(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)
    
    item = Education(title=data['title'], content=data['content'], dateFrom=data['dateFrom'], dateTo=data['dateTo'], education_connected=userInfo)
    item.save()

    serializer = EducationSerializer(item, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteEducation(request, pk):
    item = Education.objects.get(id=pk)
    item.delete()
    return Response('Successfully deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addExperience(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)
    
    item = Experience(title=data['title'], content=data['content'], dateFrom=data['dateFrom'], dateTo=data['dateTo'], experience_connected=userInfo)
    item.save()

    serializer = ExperienceSerializer(item, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteExperience(request, pk):
    item = Experience.objects.get(id=pk)
    item.delete()
    return Response('Successfully deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLanguage(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)
    
    item = Language(languageName=data['languageName'], languageValue=data['languageValue'], language_connected=userInfo)
    item.save()

    serializer = LanguageSerializer(item, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteLanguage(request, pk):
    item = Language.objects.get(id=pk)
    item.delete()
    return Response('Successfully deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    profile_id = data['profile_id']
    profile = Profile.objects.get(id=profile_id)

    profile.image = request.FILES.get('image')
    profile.save()

    return Response('Image was uploaded')

@api_view(['GET'])
def getUserInfoDetailsById(request, pk):
    userInfo = Profile.objects.get(slug=pk)
    serializer = ProfileSerializer(userInfo, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCv(request):
    user = request.user
    data = request.data
    userInfo = Profile.objects.get(user=user)

    userInfo.cv = data['cv']
    userInfo.save()
    
    serializer = ProfileSerializer(userInfo, many=False)
    return Response(serializer.data)