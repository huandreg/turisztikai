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

class AttractionSerializerPOST(serializers.ModelSerializer):
  attractionCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())   #„Amikor attractionCity érkezik POST-ban,egy ID-t várok,és abból megkeresem a City objektumot,majd azt teszem rá az Attraction.attractionCity FK mezőre.”
  class Meta:
    model = Attraction
    fields = '__all__'