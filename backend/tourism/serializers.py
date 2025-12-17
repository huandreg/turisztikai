from rest_framework import serializers
from .models import Country, City, Attraction

class CountrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Country
    fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
  class Meta:  
    model = City
    fields = '__all__'
    depth = 1

class CitySerializerPOST(serializers.ModelSerializer):
  class Meta:
    model = City
    fields = '__all__'

class AttractionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Attraction
    fields = '__all__'
    depth = 2
