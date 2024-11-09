from app1.models import *
from rest_framework import serializers


 
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
 
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'phone_no','role']
 
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            phone_no = validated_data['phone_no'],
            role=validated_data['role'],
        )
        return user




class TransportationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transportation
        fields='__all__'

class SheltersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Shelters
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = "__all__"
    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Ensure password is hashed
        user.save()
        return user

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model=NGO
        fields='__all__'

class ResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Responder
        fields='__all__'