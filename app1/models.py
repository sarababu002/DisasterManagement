from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Transportation(models.Model):
    vehicle_id=models.AutoField(primary_key=True)
    license_plate=models.CharField(max_length=15)
    vehicle_type=models.CharField(max_length=20,choices=[
        ('bus', 'Bus'),
        ('truck', 'Truck'),
        ('van', 'Van'),
        ('car', 'Car'),
    ])
    current_status=models.CharField(max_length=20,choices=[
          ('available', 'Available'),
        ('in use', 'In Use'),
        ('maintenance', 'Under Maintenance'),
    ])
    location = models.CharField(max_length=100,default='xxx')
    contact_info = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.license_plate}"

class Shelters(models.Model):
    camp_id=models.AutoField(primary_key=True)
    camp_address=models.TextField()
    location=models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    contact=models.CharField(max_length=100)
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]
    
    status = models.CharField(max_length=6, choices=STATUS_CHOICES, default='open')

class NGO(models.Model):
    name=models.CharField(max_length=100)
    address=models.TextField()
    email=models.EmailField()
    phone=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name}"

class Responder(models.Model):
    name=models.CharField(max_length=100)
    address=models.TextField()
    email=models.EmailField()
    phone=models.CharField(max_length=10)


class User(AbstractUser):
    ROLE_CHOICES = [
        ('victim', 'Victim'),
        ('responder', 'Responder'),
        ('admin', 'Admin'),
    ]
    phone_no = models.CharField(max_length=20)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='victim')

    # Set related_name to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='app1_user_set',  # Custom related name for the reverse relationship
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='app1_user_permissions_set',  # Custom related name for the reverse relationship
        blank=True,
    )

    def __str__(self):
        return f"{self.username} ({self.role})"