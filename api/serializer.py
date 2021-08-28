from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Review, Profile, Skill, Education, Experience, Language

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField(read_only=True)
    educations = serializers.SerializerMethodField(read_only=True)
    experiences = serializers.SerializerMethodField(read_only=True)
    languages = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'

    def get_skills(self, obj):
        skills = obj.skill_set.all()
        serializer = SkillSerializer(skills, many=True)
        return serializer.data

    def get_educations(self, obj):
        educations = obj.education_set.all()
        serializer = EducationSerializer(educations, many=True)
        return serializer.data

    def get_experiences(self, obj):
        experiences = obj.experience_set.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return serializer.data

    def get_languages(self, obj):
        languages = obj.language_set.all()
        serializer = LanguageSerializer(languages, many=True)
        return serializer.data