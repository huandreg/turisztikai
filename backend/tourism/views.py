from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Attraction, Country, City
from .serializers import AttractionSerializer,AttractionSerializerPOST, CitySerializer, CitySerializerPOST, CountrySerializer 

@api_view(["GET", "POST"])
def allData(request):
  if(request.method== "GET"):
    allAttraction = Attraction.objects.all()
    serializedAttractions = AttractionSerializer(allAttraction, many=True)
    return Response(serializedAttractions.data)
  if(request.method=="POST"):
    serialized = AttractionSerializerPOST(data=request.data)
    print(request.data)
    if serialized.is_valid():
      serialized.save()
      return Response(serialized.data)
    serialized.errors()
    print("ERROR")

@api_view(["GET", "POST"])
def allCountries(request):
  if(request.method == "GET"):
    allCountries = Country.objects.all().order_by('attractionCountry')
    serializedCountries = CountrySerializer(allCountries,many=True)
    return Response(serializedCountries.data)
  if(request.method == "POST"):
    serialized = CountrySerializer(data=request.data)
    if serialized.is_valid():
      serialized.save()
      return Response(serialized.data)

@api_view(["GET", "POST"])
def allCities(request):
  if(request.method == "GET"):
    allCities = City.objects.all().order_by('attractionCountry', 'attractionCity')
    serializedCities = CitySerializer(allCities, many=True)
    return Response(serializedCities.data)
  if(request.method == "POST"):
    serialized = CitySerializerPOST(data=request.data)
    if serialized.is_valid():
      serialized.save()
      return Response(serialized.data)

@api_view(["DELETE"])
def deleteAttraction(request,attractionId):
  if request.method == "DELETE":
    attractionDelete = Attraction.objects.get(pk=attractionId)
    attractionDelete.delete()

@api_view(["PATCH"])
def newRating(request,attractionId):
  if request.method == "PATCH": 
    attPartialUpdate = Attraction.objects.get(pk=attractionId)
    attPartialUpdate.save()
  



