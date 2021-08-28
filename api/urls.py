from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),

    path('users/', views.getUsers, name='getUsers'),
    path('users/profile/', views.getUserProfile, name='getUserProfile'),
    path('users/profile/update/', views.updateUserProfile, name='updateUserProfile'),
    
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='registerUser'),
    
    path('products/', views.getProducts, name='getProducts'),
    path('products/<str:pk>/', views.getProduct, name='getProduct'),
    path('products/<str:pk>/reviews/', views.createProductReview, name='createProductReview'),

    path('users/info/', views.getUserInfo, name='getUserInfo'),
    path('user/info/upload/', views.uploadImage, name='uploadImage'),
    
    path('user/info/', views.getUserInfoDetails, name='getUserInfoDetails'),
    path('user/info/update/', views.updateUserInfo, name='updateUserInfo'),

    path('user/info/add-skill/', views.addSkill, name='addSkill'),
    path('user/info/delete-skill/<str:pk>/', views.deleteSkill, name='deleteSkill'),

    path('user/info/add-education/', views.addEducation, name='addEducation'),
    path('user/info/delete-education/<str:pk>/', views.deleteEducation, name='deleteEducation'),

    path('user/info/add-experience/', views.addExperience, name='addExperience'),
    path('user/info/delete-experience/<str:pk>/', views.deleteExperience, name='deleteExperience'),

    path('user/info/add-language/', views.addLanguage, name='addLanguage'),
    path('user/info/delete-language/<str:pk>/', views.deleteLanguage, name='deleteLanguage'),

    path('user/info/<str:pk>/', views.getUserInfoDetailsById, name='getUserInfoDetailsById'),
    path('user/info/update/cv/', views.updateCv, name='updateCv'),
]