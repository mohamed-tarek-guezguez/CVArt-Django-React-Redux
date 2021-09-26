from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    image = models.ImageField(upload_to='Product', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(default=0, max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(default=0, blank=True, null=True)
    cv = models.CharField(max_length=250, unique=True, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    rating = models.IntegerField(default=0, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, unique=True, blank=True, null=True)

    firstName = models.CharField(default='First Name', max_length=250, blank=True, null=True)
    lastName = models.CharField(default='Last Name', max_length=250, blank=True, null=True)
    professionalTitle = models.CharField(default='Professional Title', max_length=250, blank=True, null=True)
    address = models.CharField(default='Address', max_length=250, blank=True, null=True)
    birthday = models.CharField(default='Birthday', max_length=250, blank=True, null=True)
    phone = models.CharField(default='Phone', max_length=250, blank=True, null=True)

    facebook = models.URLField(max_length=250, blank=True, null=True)
    instagram = models.URLField(max_length=250, blank=True, null=True)
    github = models.URLField(max_length=250, blank=True, null=True)
    linkedin = models.URLField(max_length=250, blank=True, null=True)
    gmail = models.CharField(max_length=250, blank=True, null=True)
    website = models.URLField(max_length=250, blank=True, null=True)

    about = models.TextField(blank=True, null=True)

    image = models.ImageField(default='default.jpg', upload_to='profile_pics', blank=True, null=True)

    cv = models.CharField(max_length=250, default='cv1', blank=True, null=True)

    def __str__(self):
        return f'{self.user.first_name} Profile'

class Skill(models.Model):
    skillName = models.CharField(max_length=250, blank=True, null=True)
    skillValue = models.CharField(max_length=200, blank=True, null=True)
    skill_connected = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.skillName

class Education(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    dateFrom = models.CharField(max_length=100, blank=True, null=True)
    dateTo = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True, null=True) 
    education_connected = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Experience(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    dateFrom = models.CharField(max_length=100, blank=True, null=True)
    dateTo = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True, null=True) 
    experience_connected = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Language(models.Model):
    languageName = models.CharField(max_length=250, blank=True, null=True)
    languageValue = models.CharField(max_length=200, blank=True, null=True)
    language_connected = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.languageName
