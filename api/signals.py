from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User)

def updateProfile(sender, instance, **kwargs):
    profile = instance
    user = User.objects.get(email=profile.user)
    profile.slug = user.first_name
    profile.gmail = profile.name

pre_save.connect(updateProfile, sender=Profile)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, name=instance.username) 

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()