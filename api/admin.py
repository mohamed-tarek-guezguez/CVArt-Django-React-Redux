from django.contrib import admin
from .models import Product, Review, Profile, Skill, Education, Experience, Language

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'rating', 'numReviews', 'cv', 'createdAt']
    ordering = ['-createdAt']
    search_fields = ('name', 'rating', 'numReviews', 'cv', 'createdAt')

admin.site.register(Product, ProductAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'product', 'rating', 'comment', 'createdAt']
    ordering = ['-createdAt']
    search_fields = ('name', 'rating', 'product', 'comment', 'createdAt')

admin.site.register(Review, ReviewAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'firstName', 'lastName', 'professionalTitle', 'birthday', 'cv', 'createdAt']
    ordering = ['-createdAt']
    search_fields = ('user', 'firstName', 'lastName', 'professionalTitle', 'birthday', 'cv', 'createdAt')

admin.site.register(Profile, ProfileAdmin)

class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'skillName', 'skillValue', 'skill_connected']
    ordering = ['-id']
    search_fields = ('skillName', 'skillValue', 'skill_connected')

admin.site.register(Skill, SkillAdmin)

class EducationAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'dateFrom', 'dateTo', 'content', 'education_connected']
    ordering = ['-id']
    search_fields = ('title', 'dateFrom', 'dateTo', 'content', 'education_connected')

admin.site.register(Education, EducationAdmin)

class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'dateFrom', 'dateTo', 'content', 'experience_connected']
    ordering = ['-id']
    search_fields = ('title', 'dateFrom', 'dateTo', 'content', 'experience_connected')

admin.site.register(Experience, ExperienceAdmin)

class LanguageAdmin(admin.ModelAdmin):
    list_display = ['id', 'languageName', 'languageValue', 'language_connected']
    ordering = ['-id']
    search_fields = ('languageName', 'languageValue', 'language_connected')

admin.site.register(Language, LanguageAdmin)